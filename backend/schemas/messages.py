from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel

# Message
class MessageBase(BaseModel):
    user_id: str
    user_name: str
    text: str

class Message(MessageBase):
    sent_at: str

class MessageResponse(MessageBase):
    sent_at: datetime

# Random Chats
class RandomConnectRequest(BaseModel):
    chat_room_id: int

class RandomChatRequest(BaseModel):
    chat_room_id: int
    message: Message

class RandomChatResponse(BaseModel):
    response_type: Literal["message", "disconnect"]
    message: Optional[Message] = None

# Queue
class QueueRequest(BaseModel):
    user_id: str

class QueueResponse(BaseModel):
    chat_room_id: int
    partner_name: str
