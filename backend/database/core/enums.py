from enum import Enum


class Status(Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    DECLINED = "declined"

class ChatRoomType(Enum):
    PRIVATE = "private"
    RANDOM = "random"

class ChatRoomStatus(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
