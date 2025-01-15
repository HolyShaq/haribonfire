from dataclasses import dataclass
import json
from pydantic import ValidationError, WebsocketUrl
from fastapi import APIRouter, Depends, WebSocket
from fastapi_utils.tasks import repeat_every
from sqlalchemy.orm import Session

from database.controllers.messages import create_chat_room, create_global_message
from database.db import get_database_session
from database.models.messages import GlobalMessage
from database.models.users import User
from logs import logger
from pprint import pprint

from endpoints.ws import WebsocketBase, websocket

from schemas.messages import Message, MessageResponse, QueueRequest, QueueResponse


# RESTs
router = APIRouter(prefix="/messages", tags=["messages"])


@router.get("/global/", response_model=list[MessageResponse])
def get_global_messages(session: Session = Depends(get_database_session)):
    messages = session.query(GlobalMessage).all()

    return [
        MessageResponse(
            user_id=message.sender_id,
            user_name=message.user.name,
            text=message.text,
            sent_at=message.sent_at,
        ).model_dump()
        for message in messages
    ]


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
        logger.info(f"Successfully broadcasted to {broadcasted} connections")


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


@dataclass
class ChatQueueUser:
    user_id: str
    websocket: WebSocket


class ChatQueue:
    def __init__(self) -> None:
        self.queue: list[ChatQueueUser] = []

    async def add_user(self, user_id: str, websocket: WebSocket):
        self.queue.append(ChatQueueUser(user_id, websocket))
        await self.check_match()

    async def check_match(self):
        if len(self.queue) >= 2:
            userA = self.queue.pop(0)
            userB = self.queue.pop(0)
            chat_room = create_chat_room(userA.user_id, userB.user_id)
            await self.match(userA, userB, chat_room.id)

    async def match(
        self, userA: ChatQueueUser, userB: ChatQueueUser, chat_room_id: int
    ):
        response = QueueResponse(chat_room_id=chat_room_id)
        payload = json.dumps(response.model_dump())

        await userA.websocket.send_text(payload)
        await userB.websocket.send_text(payload)


chat_queue = ChatQueue()


@websocket(ws_router, "/queue/")
class QueueWebsocket(WebsocketBase):
    async def on_connect(self):
        await self.websocket.accept()

    async def on_receive(self, data: str):
        try:
            queue_request = QueueRequest(**json.loads(data))
            await chat_queue.add_user(queue_request.user_id, self.websocket)
        except ValidationError as e:
            logger.error(e)
