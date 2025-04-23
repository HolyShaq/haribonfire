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

def update_user(id: str, new_name: str, new_avatar_seed: str, new_course: str, session: Session):
    user = session.query(User).filter_by(id=id).first()
    if user is None:
        logger.error(f"User {id} does not exist")
    else:
        user.name = new_name if new_name else user.name
        user.course = new_course if new_course else user.course
        user.avatar_seed = new_avatar_seed if new_avatar_seed else user.avatar_seed
        session.add(user)
        logger.info(f"Updated user with id: {user.id}")
