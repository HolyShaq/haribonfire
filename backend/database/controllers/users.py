

from fastapi import Depends
from sqlalchemy.orm import Session
from database.db import get_database_session
from database.models.users import User


def create_user(user: User, session: Session):
    # Only create user if it doesn't already exist
    if session.query(User).filter_by(id=user.id).first() is None:
        session.add(user)
