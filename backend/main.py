import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db import initialize_database
from endpoints import auth, messages, users


# Define lifespan of the api
@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


# Initialize the api
app = FastAPI(lifespan=lifespan)


# Allow everything through CORS during dev
load_dotenv("./.env")
FRONTEND_URL = os.getenv("FRONTEND_URL")
FRONTEND_URL = (
    FRONTEND_URL
    if FRONTEND_URL and os.getenv("ENVIRONMENT") == "production" 
    else "http://localhost:3000"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_prefix = "/api/v1"
app.include_router(messages.router, prefix=api_prefix)
app.include_router(messages.ws_router, prefix=api_prefix)
app.include_router(auth.router, prefix=api_prefix)
app.include_router(users.router, prefix=api_prefix)
