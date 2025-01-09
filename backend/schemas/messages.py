from pydantic import BaseModel

class Message(BaseModel):
    user_id: int
    user_name: str
    text: str
    timestamp: str
