import json
from pydantic import ValidationError
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, WebSocket
from fastapi.responses import JSONResponse

from endpoints.ws import WebsocketBase, websocket

from database.db import get_database_session
from database.models.users import User
from database.models.messages import GlobalMessage

from schemas.messages import Message

class GlobalPool:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    def connect(self, websocket: WebSocket):
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, data: Message):
        for connection in self.active_connections:
            await connection.send_json(data.model_dump_json())


global_pool = GlobalPool()
router = APIRouter(prefix="/ws", tags=["messages"])


@websocket(router, "/global/")
class GlobalMessagesWebsocket(WebsocketBase):
    async def on_connect(self):
        await self.websocket.accept()
        global_pool.connect(self.websocket)

    async def on_receive(self, data: str):
        try:
            message = Message(**json.loads(data))
            await global_pool.broadcast(message)
        except ValidationError as e:
            print(e)

    async def on_disconnect(self):
        print("disconnected")
        global_pool.disconnect(self.websocket)

