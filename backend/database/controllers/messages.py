from datetime import datetime
from database.db import Session
from schemas.messages import Message
from database.models.messages import GlobalMessage 
from logs import logger


def create_global_message(message: Message):
    with Session() as session:
        global_message = GlobalMessage(
            sender_id=message.user_id,
            message=message.text,
            sent_at=datetime.fromisoformat(message.timestamp)
        )
        session.add(global_message)
        session.commit()

        logger.info(f"Created global message: {message}")
