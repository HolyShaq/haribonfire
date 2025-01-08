from fastapi import APIRouter, WebSocketDisconnect, WebSocket

router = APIRouter()

@router.websocket("/ws/global/")
async def lab_socket(websocket: WebSocket):

    async def on_connect():
        print("Connected")
        await websocket.accept()

    async def on_receive(data):
        # websocket receive event
        print(f"Received: {data}")
        await websocket.send_text(f"Message text was: {data}")

    async def on_disconnect():
        # websocket diconnect event
        print("Disconnected")
        pass

    try:
        await on_connect()
        while True:
            data = await websocket.receive_text()
            await on_receive(data)
    except WebSocketDisconnect:
        await on_disconnect()
