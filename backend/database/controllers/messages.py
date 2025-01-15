from datetime import datetime
from database.core.enums import ChatRoomStatus, ChatRoomType
from database.db import Session
from schemas.messages import Message
from database.models.messages import ChatRoom, GlobalMessage
from logs import logger


def create_global_message(message: Message):
    with Session() as session:
        global_message = GlobalMessage(
            sender_id=message.user_id,
            text=message.text,
            sent_at=datetime.fromisoformat(message.sent_at),
        )
        session.add(global_message)
        session.commit()

        logger.info(f"Created global message: {message}")


def create_chat_room(userA_id: str, userB_id: str):
    with Session() as session:
        chat_room = ChatRoom(
            participant_1_id=userA_id,
            participant_2_id=userB_id,
            room_type=ChatRoomType.RANDOM,
            connection_status=ChatRoomStatus.ACTIVE,
        )
        session.add(chat_room)
        session.commit()
        session.refresh(chat_room)
        
        logger.info(f"Created chat room with id {chat_room.id}")
        return chat_room










