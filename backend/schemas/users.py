from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    user_id: str
    name: str
    avatar_seed: str
    course: Optional[str] = None
