import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string) {
  if (address.length < 9) return address; // If address is too short, return as is
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
};