import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function avatar(value: number | string, set: number = 4) {
  return `https://robohash.org/${value}?set=set${set}`
}
