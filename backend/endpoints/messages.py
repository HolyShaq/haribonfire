import json
from pydantic import ValidationError
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.controllers.messages import create_global_message
from database.db import get_database_session
from database.models.messages import GlobalMessage
from database.models.users import User
from logs import logger
from pprint import pprint

from endpoints.ws import WebsocketBase, websocket
from endpoints import singletons

from schemas.messages import (
    Message,
    MessageResponse,
    QueueRequest,
    RandomChatRequest,
    RandomConnectRequest,
)


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


@websocket(ws_router, "/global/")
class GlobalMessagesWebsocket(WebsocketBase):
    async def on_connect(self):
        await self.websocket.accept()
        singletons.global_pool.connect(self.websocket)

    async def on_receive(self, data: str):
        try:
            message = Message(**json.loads(data))
            await singletons.global_pool.broadcast(message, self.websocket)
            create_global_message(message)
        except ValidationError as e:
            logger.error(e)

    async def on_disconnect(self):
        singletons.global_pool.disconnect(self.websocket)


@websocket(ws_router, "/queue/")
class QueueWebsocket(WebsocketBase):
    async def on_connect(self):
        await self.websocket.accept()
        try:
            data = self.websocket.query_params
            queue_request = QueueRequest(**data)
            await singletons.chat_queue.add_user(queue_request.user_id, self.websocket)
        except ValidationError as e:
            logger.error(e)


@websocket(ws_router, "/random/")
class RandomMessagesWebsocket(WebsocketBase):
    async def on_connect(self):
        await self.websocket.accept()
        try:
            data = self.websocket.query_params
            request = RandomConnectRequest(chat_room_id=int(data["chat_room_id"]))
            singletons.random_chats.add_user(request.chat_room_id, self.websocket)
        except ValidationError as e:
            logger.error(e)
            data = self.websocket.query_params

    async def on_receive(self, data: str):
        try:
            request = RandomChatRequest(**json.loads(data))
            await singletons.random_chats.send_message(request.chat_room_id, request.message, self.websocket)
        except ValidationError as e:
            logger.error(e)
