import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function avatar(value: number | string, set: number = 4) {
  return `https://robohash.org/${value}?set=set${set}`
}

export function randomName() {
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: " ",
    length: 2,
  })
  return name
}

export function generateAvatarSeed(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
