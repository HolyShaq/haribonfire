from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from database.db import get_database_session
from database.models.users import User
from database.models.messages import GlobalMessage

router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("/send/global/")
def send_global_message(
    user_id: int, message: str, session: Session = Depends(get_database_session)
):
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        return JSONResponse(content={"message": "User not found"}, status_code=404)

    message = GlobalMessage(sender_id=user_id, message=message)
    session.add(message)
    return JSONResponse(content={"message": "Message sent successfully"})
