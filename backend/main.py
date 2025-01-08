from contextlib import asynccontextmanager

from fastapi import FastAPI

from database.db import initialize_database
from endpoints import messages, ws


# Define lifespan of the api
@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


# Initialize the api
app = FastAPI(lifespan=lifespan)

api_prefix = "/api/v1"
app.include_router(messages.router, prefix=api_prefix)
app.include_router(ws.router, prefix=api_prefix)
