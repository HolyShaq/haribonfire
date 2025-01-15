import { Message } from "@/common/interfaces";
import axios from "axios";

const API_BASE_URL = "localhost:8000/api/v1/";
const HTTP_BASE_URL = `http://${API_BASE_URL}`;
const WEBSOCKET_BASE_URL = `ws://${API_BASE_URL}`;

// RESTs
export async function getGlobalMessages() {
  try {
    const response = await axios.get(HTTP_BASE_URL + "messages/global/");
    return response.data.map((message: Message) => ({
      ...message,
      sent_at: new Date(message.sent_at + "Z").toISOString(), // Convert to local timezone
    }));
  } catch (error) {
    console.log(error);
  }
}

// Websockets
export function getGlobalWebsocket(
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) {
  const ws = new WebSocket(WEBSOCKET_BASE_URL + "ws/global/");
  ws.onerror = (event) => {
    console.log(event);
  };
  ws.onopen = () => {
    console.log("Connected to global websocket");
  };
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data, typeof data);
    setMessages((prev) => [...prev, data]);
  };
  return ws;
}

export function getQueueWebsocket(user_id: string) {
  const ws = new WebSocket(WEBSOCKET_BASE_URL + "ws/queue/");
  ws.onerror = (event) => {
    console.log(event);
  };
  ws.onopen = () => {
    console.log("Connected to queue websocket");
    ws.send(
      JSON.stringify({
        user_id: user_id,
      }),
    );
  };
  return ws;
}
