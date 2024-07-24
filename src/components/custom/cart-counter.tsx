'use client';
import { increment } from "@/lib/store/features/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartCounter = () => {
    const dispatch = useAppDispatch();
    const {value} = useAppSelector((state) => state.cart)
    const handleIncrement = () => {
        dispatch(increment());
    }
  return (
    <>
        <div className="relative">
        <Link href="/cart">
            <ShoppingBasket className="hover:text-primary" />
        </Link>
        <span className="absolute -top-2 -right-4 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white font-light font-mono">
            {value}
        </span>
        </div>
        <button onClick={handleIncrement}>Increment</button>
    </>
  );
};

export default CartCounter;
