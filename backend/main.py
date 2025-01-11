from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db import initialize_database
from endpoints import auth, messages


# Define lifespan of the api
@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


# Initialize the api
app = FastAPI(lifespan=lifespan)


# Allow everything through CORS during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_prefix = "/api/v1"
app.include_router(messages.router, prefix=api_prefix)
app.include_router(messages.ws_router, prefix=api_prefix)
app.include_router(auth.router, prefix=api_prefix)
