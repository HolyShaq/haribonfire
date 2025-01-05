from contextlib import asynccontextmanager
from typing import Union

from fastapi import FastAPI

from database.db import Session, initialize_database
from database.models.users import User


# Define lifespan of the api
@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


# Initialize the api
app = FastAPI(lifespan=lifespan)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
