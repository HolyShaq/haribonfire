from pydantic import BaseModel

class Message(BaseModel):
    user_id: str
    user_name: str
    text: str
    sent_at: str
