from sqlalchemy import Column, Enum, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.orm.properties import ForeignKey

from ..core.enums import Status
from ..models import *
from ..db import Base


# Association tables
friends_association = Table(
    "friends",
    Base.metadata,
    Column("user_1_id", ForeignKey("users.id"), primary_key=True),
    Column("user_2_id", ForeignKey("users.id"), primary_key=True),
    Column(
        "status",
        Enum(Status, create_constraint=True, validate_strings=True),
        default=Status.PENDING,
    ),
)

blocked_users_association = Table(
    "blocked_users",
    Base.metadata,
    Column("blocker_id", ForeignKey("users.id"), primary_key=True),
    Column("blocked_id", ForeignKey("users.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str]
    course: Mapped[str]

    # Relationships
    friends: Mapped[list["User"]] = relationship(
        secondary=friends_association,
        primaryjoin=(id == friends_association.c.user_1_id),
        secondaryjoin=(id == friends_association.c.user_2_id),
    )
    blocked_users: Mapped[list["User"]] = relationship(
        secondary=blocked_users_association,
        primaryjoin=(id == blocked_users_association.c.blocker_id),
        secondaryjoin=(id == blocked_users_association.c.blocked_id),
    )

    def __repr__(self):
        return f"User(id={self.id}, name={self.name}, email={self.email}, course={self.course})"


class ReportedUser(Base):
    __tablename__ = "reported_users"

    reporter_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    reported_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    reported_message_id: Mapped[int] = mapped_column(ForeignKey("messages.id"), primary_key=True)
    reason: Mapped[str]
    status: Mapped[Status] = mapped_column(
        Enum(Status, create_constraint=True, validate_strings=True)
    )

    # Relationships
    reporter: Mapped[User] = relationship(foreign_keys=[reporter_id])
    reported: Mapped[User] = relationship(foreign_keys=[reported_id])
    message: Mapped["Message"] = relationship(foreign_keys=[reported_message_id])
