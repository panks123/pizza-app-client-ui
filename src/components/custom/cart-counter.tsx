'use client';
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartCounter = () => {
    const dispatch = useAppDispatch();
    const {cartItems} = useAppSelector((state) => state.cart)
  return (
    <>
        <div className="relative">
        <Link href="/cart">
            <ShoppingBasket className="hover:text-primary" />
        </Link>
        {
            cartItems.length > 0 &&
            <span className="absolute -top-2 -right-4 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white font-light font-mono">
                {cartItems.length}
            </span>
        }
        </div>
    </>
  );
};

export default CartCounter;
