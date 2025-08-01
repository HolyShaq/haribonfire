import os
import random
import string
import httpx
import urllib.parse
from jose import jwt, JWTError
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Request, status
from fastapi.exceptions import HTTPException
from fastapi.responses import RedirectResponse, Response
from sqlalchemy.engine import create
from sqlalchemy.orm import Session

from database.db import get_database_session
from database.models.users import User
from database.controllers.users import create_user

load_dotenv("./.env")
STATE = "12345"
NONCE = "6789"
FRONTEND_URL = "http://localhost:3000"


async def get_jwks():
    """
    Dependency for getting Microsoft's publick keys
    """
    authority = os.getenv("AUTHORITY")
    metadata_url = f"{authority}/v2.0/.well-known/openid-configuration"
    async with httpx.AsyncClient() as client:
        metadata = (await client.get(metadata_url)).json()
        jwks_url = metadata["jwks_uri"]
        return (await client.get(jwks_url)).json()


async def decrypt_id_token(id_token: str) -> User:
    """
    Validates and decrypts an ID token,
    and then returns a User object from that token.
    """

    client_id = os.getenv("CLIENT_ID")
    authority = os.getenv("AUTHORITY")
    jwks = await get_jwks()

    try:
        payload = jwt.decode(
            id_token,
            jwks,
            algorithms=["RS256"],
            audience=client_id,
            issuer=f"{authority}/v2.0",
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    return User(
        id=payload["sub"],
        name=payload["name"],
        email=payload["email"],
    )


def generate_avatar_seed():
    """
    Generates a random 10-character string.
    """
    return "".join(random.choices(string.ascii_letters + string.digits, k=10))


router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
def login():
    client_id = os.getenv("CLIENT_ID")

    # This points to /login/callback
    redirect_uri = urllib.parse.quote("https://haribonfire.onrender.com/api/v1/auth/login/callback", safe="")
    params = {
        "client_id": client_id,
        "response_type": "id_token",
        "response_mode": "form_post",
        "scope": "openid profile email",
        "state": STATE,
        "nonce": NONCE,
    }
    auth_url = (
        f"{os.getenv("BASE_URL")}/authorize?"
        f"{urllib.parse.urlencode(params)}&"
        f"redirect_uri={redirect_uri}"
    )
    return RedirectResponse(url=auth_url)


@router.post("/login/callback")
async def login_callback(
    request: Request, session: Session = Depends(get_database_session)
):
    form_data = await request.form()

    # Check validity
    state = form_data.get("state")
    if state != STATE:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid state"
        )

    # Decrypt token
    id_token = form_data.get("id_token")
    payload = await decrypt_id_token(str(id_token))

    # Random avatar seed
    payload.avatar_seed = generate_avatar_seed()

    # Create user record
    create_user(payload, session)

    # Construct response
    response = RedirectResponse(url=f"{FRONTEND_URL}/home")
    response.set_cookie(
        key="id_token", value=str(id_token), httponly=True, samesite="none", secure=True
    )

    return response


@router.get("/logout")
async def logout():
    # This points to /logout/callback
    redirect_uri = "http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fv1%2Fauth%2Flogout%2Fcallback"
    logout_url = (
        f"{os.getenv('BASE_URL')}/logout?" f"post_logout_redirect_uri={redirect_uri}"
    )
    return RedirectResponse(url=logout_url)


@router.get("/logout/callback")
async def logout_callback():
    response = Response(
        status_code=status.HTTP_200_OK, content="Successfully logged out"
    )
    response.delete_cookie("id_token")
    return response


@router.get("/fakelogin/")
async def fake_login(
    id: str, name: str, email: str, session: Session = Depends(get_database_session)
):
    response = RedirectResponse(url=f"{FRONTEND_URL}/home")

    user = session.query(User).filter_by(id=id).first()
    if user is None:
        avatar_seed = generate_avatar_seed()
        payload = {
            "sub": id,
            "name": name,
            "email": email,
            "avatar_seed": avatar_seed,
        }
        create_user(
            User(id=id, name=name, email=email, avatar_seed=avatar_seed), session
        )
    else:
        payload = {
            "sub": user.id,
            "name": user.name,
            "email": user.email,
            "avatar_seed": user.avatar_seed,
        }

    id_token = jwt.encode(payload, "test", algorithm="HS256")
    response.set_cookie(
        key="id_token", value=id_token, httponly=True, samesite="none", secure=True
    )

    return response


@router.get("/fakelogout/")
async def fake_logout():
    response = RedirectResponse(url=f"{FRONTEND_URL}")
    response.delete_cookie("id_token")
    return response
