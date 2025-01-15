import json
from dataclasses import dataclass
from logs import logger
from fastapi import WebSocket

from database.controllers.messages import create_chat_room
from schemas.messages import Message, QueueResponse


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


# Instances
global_pool = GlobalPool()
chat_queue = ChatQueue()
