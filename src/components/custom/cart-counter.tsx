'use client';
import React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CartCounter = () => {
    const {cartItems} = useAppSelector((state) => state.cart);
    const searchParams = useSearchParams();
  return (
    <>
        <div className="relative">
        <Link href={`/cart?tenantId=${searchParams.get('tenantId')}`}>
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
