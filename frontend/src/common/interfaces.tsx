import { JwtPayload } from "jwt-decode";

export interface User {
  id?: string;
  name: string;
  email: string;
  course?: string;
}

export interface IDToken extends User, JwtPayload {}

export interface Message {
  user_id: string;
  user_name: string;
  text: string;
  sent_at: string;
}

export interface QueueRequest {
  user_id: string;
}

export interface QueueResponse {
  chat_room_id: number;
  partner_name: string;
}
