from sqlalchemy.orm import Session
from database.models.users import User
from logs import logger

def get_user(user_id: str, session: Session):
    return session.query(User).filter_by(id=user_id).first()

def get_username(user_id: str, session: Session):
    if user := session.query(User).filter_by(id=user_id).first():
        return user.name
    return None

def create_user(user: User, session: Session):
    # Only create user if it doesn't already exist
    if session.query(User).filter_by(id=user.id).first() is None:
        session.add(user)
        logger.info(f"Created user: {user}")
