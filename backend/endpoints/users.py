from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database.db import get_database_session
from database.models.users import User
from database.controllers.users import update_user


router = APIRouter(prefix="/users", tags=["users"])


@router.post("/{id}")
def update_user_info(
    id: str,
    name: str,
    avatar_seed: str,
    course: str = "",
    session: Session = Depends(get_database_session),
):
    user = session.query(User).filter_by(id=id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User does not exist")
    else:
        update_user(id, name, avatar_seed, course, session)
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "User updated successfully"})
