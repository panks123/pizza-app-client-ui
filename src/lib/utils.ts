import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJs from "crypto-js";
import { CartItem } from "./store/features/cart/cart-slice";
import { Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashCartItems(payload: CartItem): string {
  const jsonString = JSON.stringify({...payload, qty: undefined});
  const hash = CryptoJs.SHA256(jsonString).toString();
  return hash;
}

export function getFromDisplayPrice(product: Product) {
  const basePrice = Object.entries(product.priceConfiguration).filter(([key, value]) => {
    return value.priceType === "base"
  }).reduce((acc, [_, value]) => {
    const optionPriceValues = Object.values(value.availableOptions);
    return acc + Math.min(...optionPriceValues);
  }, 0);
  return basePrice;
}

export function getItemTotalPrice(item: CartItem) {
  const { priceConfiguration, chosenConfiguration} = item;
  const {selectedToppings} = chosenConfiguration;
  const toppingsTotal = selectedToppings.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  const configTotal = Object.entries(chosenConfiguration.priceConfiguration).reduce((acc, [key, value]) => {
    const price = priceConfiguration[key].availableOptions[value];
    return acc + price;
  }, 0);
  return toppingsTotal + configTotal;
}
