import { Message, QueueRequest } from "@/common/interfaces";
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

export async function updateUserInfo(
  id: string = "",
  new_name: string,
  new_avatar_seed: string,
  new_course: string = "",
) {
  try {
    await axios.post(HTTP_BASE_URL + `users/${id}/`, null, {
      params: {
        name: new_name,
        avatar_seed: new_avatar_seed,
        course: new_course,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// Websockets
export function getGlobalWebsocket() {
  const ws = new WebSocket(WEBSOCKET_BASE_URL + "ws/global/");
  ws.onerror = (event) => {
    console.log(event);
  };
  ws.onopen = () => {
    console.log("Connected to global websocket");
  };
  return ws;
}

export function getQueueWebsocket(user_id: string) {
  const ws = new WebSocket(
    WEBSOCKET_BASE_URL + "ws/queue/" + `?user_id=${user_id}`,
  );
  ws.onerror = (event) => {
    console.log(event);
  };
  ws.onopen = () => {
    console.log("Connected to queue websocket");
  };
  return ws;
}

export function getRandomChatWebsocket(chat_room_id: number) {
  const ws = new WebSocket(
    WEBSOCKET_BASE_URL + "ws/random/" + `?chat_room_id=${chat_room_id}`,
  );
  ws.onerror = (event) => {
    console.log(event);
  };
  ws.onopen = () => {
    console.log(`Connected to random chat room ${chat_room_id}`);
  };
  return ws;
}
