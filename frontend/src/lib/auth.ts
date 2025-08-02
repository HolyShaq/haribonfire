import { IDToken, User } from "@/common/interfaces";
import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import { redirect, RedirectType } from "next/navigation";
import { randomName } from "./utils";

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const API_BASE_URL =
  ENVIRONMENT === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : "http://localhost:8000/api/v1";

export function login() {
  redirect(`${API_BASE_URL}/auth/login`, RedirectType.push);
}

export function loggedInUser(): User | null {
  const id_token = getCookie("id_token");
  if (id_token) {
    const payload = jwtDecode<IDToken>(id_token);
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      avatar_seed: payload.avatar_seed,
    };
  } else {
    return null;
  }
}

export function fakelogin(id: string) {
  const name = randomName();
  const email = `${name}@haribonfire.com`;
  const url = `${API_BASE_URL}/auth/fakelogin?id=${id}&name=${name}&email=${email}`;
  redirect(url.replaceAll(" ", "%20"), RedirectType.push);
}
