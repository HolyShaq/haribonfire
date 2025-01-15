from datetime import datetime
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


# Queue
class QueueRequest(BaseModel):
    user_id: str

class QueueResponse(BaseModel):
    chat_room_id: int
