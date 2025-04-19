import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatKey = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
