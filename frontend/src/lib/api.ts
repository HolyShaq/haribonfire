import { Message } from '@/common/interfaces';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'localhost:8000/api/v1/'
const HTTP_BASE_URL = `http://${API_BASE_URL}`
const WEBSOCKET_BASE_URL = `ws://${API_BASE_URL}`

// RESTs
export async function getGlobalMessages() {
  try {
    const response = await axios.get(HTTP_BASE_URL + 'messages/global/')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Websockets
export function getGlobalWebsocket(setMessages: React.Dispatch<React.SetStateAction<Message[]>>) {
  const ws = new WebSocket(WEBSOCKET_BASE_URL + 'ws/global/')
  ws.onerror = (event) => {
    console.log(event)
  }
  ws.onopen = () => {
    console.log('Connected to global websocket')
  }
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log(data, typeof data)
    setMessages((prev) => [...prev, data])
  }
  return ws
}
