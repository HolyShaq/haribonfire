import json
from pydantic import ValidationError
from fastapi import APIRouter, Depends, WebSocket
from sqlalchemy.orm import Session

from database.controllers.messages import create_global_message
from database.db import get_database_session
from database.models.messages import GlobalMessage
from logs import logger

from endpoints.ws import WebsocketBase, websocket

from schemas.messages import Message


# RESTs
router = APIRouter(prefix="/messages", tags=["messages"])

@router.get("/global/")
def get_global_messages(session: Session = Depends(get_database_session)):
    return session.query(GlobalMessage).all()

# Websockets
ws_router = APIRouter(prefix="/ws", tags=["messages"])

class GlobalPool:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.socket_user_dict: dict[WebSocket, int] = {}

    def connect(self, websocket: WebSocket):
        self.active_connections.append(websocket)
        logger.info(f"Client {websocket.client} connected")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"Client {websocket.client} disconnected")

    async def broadcast(self, data: Message, sender: WebSocket | None = None):
        broadcasted = 0
        if sender:
            logger.info(f"{sender.client} broadcasted a message.")
        for connection in self.active_connections:
            # Skip sending message to the sender
            if sender and connection == sender:
                continue
            payload = json.dumps(data.model_dump())
            await connection.send_text(payload)
            broadcasted += 1
        logger.info(
            f"Successfully broadcasted to {broadcasted} connections"
        )
global_pool = GlobalPool()


@websocket(ws_router, "/global/")
class GlobalMessagesWebsocket(WebsocketBase):
    async def on_connect(self):
        await self.websocket.accept()
        global_pool.connect(self.websocket)

    async def on_receive(self, data: str):
        try:
            message = Message(**json.loads(data))
            await global_pool.broadcast(message, self.websocket)
            create_global_message(message)
        except ValidationError as e:
            logger.error(e)

    async def on_disconnect(self):
        global_pool.disconnect(self.websocket)
