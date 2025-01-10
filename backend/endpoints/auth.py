import os
import urllib.parse
from dotenv import load_dotenv
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, Response

from logs import logger

load_dotenv("./../.env")

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
def login():
    client_id = os.getenv("CLIENT_ID")
    redirect_uri = "http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fv1%2Fauth%2Flogin%2Fcallback"
    params = {
        "client_id": client_id,
        "response_type": "id_token",
        "response_mode": "form_post",
        "scope": "openid",
        "state": "1234",
        "nonce": "6789",
    }
    auth_url = (
        f"{os.getenv("BASE_URL")}?"
        f"{urllib.parse.urlencode(params)}&"
        f"redirect_uri={redirect_uri}"
    )
    print(auth_url)
    return RedirectResponse(url=auth_url)

@router.post("/login/callback")
async def login_callback(request: Request):
    form_data = await request.form()
    print(form_data)
    return Response(content="Success", status_code=200)
