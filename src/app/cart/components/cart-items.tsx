'use client';
import React, { useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import CartItem from './cart-item';
import { Button } from '@/components/ui/button';
import { getItemTotalPrice } from '@/lib/utils';

const CartItems = () => {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = React.useState(false);
    const router = useRouter();
    useEffect(() => {
      setIsClient(true)
    }, []);

    const cart =  useAppSelector(state => state.cart.cartItems);

    const finalCartTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotalPrice(curr);
        }, 0)
    }, [cart]);
    if(!isClient) return null;

    if(!cart.length) {
        return <div className='flex items-center justify-center gap-2'>
            <ShoppingCart />
            <p>Your cart is empty! {' '}</p>
            <Link 
                className='text-primary font-semibold'
                href={`/?tenantId=${searchParams.get('tenantId')}`}
            >
                Continue PizzoMotiiing
            </Link>
        </div>
    }
  return (
    <div className='flex flex-col gap-8'>
      {
        cart.map((cartItem) => (
          <CartItem key={cartItem.hash} item={cartItem}/> 
        ))
      }
      <div className='flex items-center justify-between gap-2'>
        <span className='font-bold text-xl'>Total: ₹{finalCartTotal}</span>
        <Button onClick={() => router.push(`/checkout?tenantId=${searchParams.get('tenantId')}`)}>
            Checkout
            <ArrowRight className='ml-2'/>
        </Button>
      </div>
    </div>
  )
}

export default CartItems;
