from typing import Type
from fastapi import APIRouter, WebSocket, WebSocketDisconnect


def websocket(router: APIRouter, path: str):
    def decorator(cls: Type[WebsocketBase]):

        @router.websocket(path)
        async def wrapper(websocket: WebSocket):
            instance = cls(websocket)
            await instance.handle()

        return wrapper

    return decorator


class WebsocketBase:
    def __init__(self, websocket: WebSocket):
        self.websocket = websocket

    async def on_connect(self):
        pass

    async def on_receive(self, data):
        pass

    async def on_disconnect(self):
        pass

    async def handle(self):
        # Handle connect event
        await self.on_connect()
        try:

            # Handle on receive events
            while True:
                data = await self.websocket.receive_text()
                await self.on_receive(data)

        # Handle disconnect event
        except WebSocketDisconnect:
            await self.on_disconnect()
