import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJs from "crypto-js";
import { CartItem } from "./store/features/cart/cart-slice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashCartItems(payload: CartItem): string {
  const jsonString = JSON.stringify({...payload, qty: undefined});
  const hash = CryptoJs.SHA256(jsonString).toString();
  return hash;
}
