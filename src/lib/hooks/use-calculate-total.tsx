import { useMemo } from "react";
import { CartItem } from "../store/features/cart/cart-slice";
import { getItemTotalPrice } from "../utils";

export function useCalculateItemTotal(item: CartItem) {
    const totalPrice = useMemo(() => {
        return getItemTotalPrice(item);
      }, [item]);
      return totalPrice;
}