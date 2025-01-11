import { JwtPayload } from "jwt-decode";

export interface User {
  id: string;
  name: string;
  email: string;
  course?: string;
}

export interface IDToken extends User, JwtPayload {}

export interface Message {
  user_id: number;
  user_name: string;
  text: string;
  timestamp: string;
}
