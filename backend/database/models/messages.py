from typing import Optional
from sqlalchemy import Column, DateTime, Enum, Table
from sqlalchemy import orm
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.orm.properties import ForeignKey
from sqlalchemy.types import DateTime as DateTimeType

from database.core.enums import ChatRoomStatus, ChatRoomType

from ..models import *

from ..db import Base


class ChatRoom(Base):
    __tablename__ = "chat_rooms"

    id: Mapped[int] = mapped_column(primary_key=True)
    participant_1_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    participant_2_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    room_type: Mapped[ChatRoomType] = mapped_column(
        Enum(ChatRoomType, create_constraint=True, validate_strings=True)
    )
    connection_status: Mapped[ChatRoomStatus] = mapped_column(
        Enum(ChatRoomStatus, create_constraint=True, validate_strings=True),
    )

    # Relationship
    messages: Mapped[list["Message"]] = relationship(back_populates="chat_room")


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    chat_room_id: Mapped[int] = mapped_column(ForeignKey("chat_rooms.id"))
    message: Mapped[str]
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    receiver_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    sent_at: Mapped[DateTimeType] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # Relationship
    chat_room: Mapped[ChatRoom] = relationship(back_populates="messages")

    def __repr__(self):
        return f"Message(id={self.id}, message={self.message}, sender_id={self.sender_id}, receiver_id={self.receiver_id}, sent_at={self.sent_at})"

class GlobalMessage(Base):
    __tablename__ = "global_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    message: Mapped[str]
    sent_at: Mapped[DateTimeType] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    def __repr__(self):
        return f"GlobalMessage(id={self.id}, message={self.message}, sender_id={self.sender_id}, sent_at={self.sent_at})"
