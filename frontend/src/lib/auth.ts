import { redirect, RedirectType } from "next/navigation"

const API_BASE_URL = `http://localhost:8000/api/v1/`

export function login() {
  redirect(`${API_BASE_URL}auth/login`, RedirectType.push)
}
