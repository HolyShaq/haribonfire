import os
from pprint import pprint
import httpx
import urllib.parse
from jose import jwt, JWTError
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Request, status
from fastapi.exceptions import HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, Response

load_dotenv("./../.env")
STATE = "12345"
NONCE = "6789"


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


async def decrypt_id_token(id_token: str):
    """
    Validates and decrypts an ID token,
    and then returns a User from that token.
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

    return payload


router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
def login():
    client_id = os.getenv("CLIENT_ID")
    redirect_uri = "http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fv1%2Fauth%2Flogin%2Fcallback"
    params = {
        "client_id": client_id,
        "response_type": "id_token",
        "response_mode": "form_post",
        "scope": "openid profile email",
        "state": STATE,
        "nonce": NONCE,
    }
    auth_url = (
        f"{os.getenv("BASE_URL")}?"
        f"{urllib.parse.urlencode(params)}&"
        f"redirect_uri={redirect_uri}"
    )
    return RedirectResponse(url=auth_url)


@router.post("/login/callback")
async def login_callback(request: Request):
    form_data = await request.form()

    # Check validity
    state = form_data.get("state")
    if state != STATE:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid state"
        )

    id_token = form_data.get("id_token")
    payload = await decrypt_id_token(str(id_token))
    pprint(payload)

    return Response(status_code=status.HTTP_200_OK)
