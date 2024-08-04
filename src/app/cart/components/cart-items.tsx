'use client';
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import CartItem from './cart-item';
import { Button } from '@/components/ui/button';

const CartItems = () => {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = React.useState(false);
    useEffect(() => {
      setIsClient(true)
    }, []);

    const cart =  useAppSelector(state => state.cart.cartItems);
    if(!isClient) return null;

    if(!cart.length) {
        return <div className='flex items-center justify-center gap-2'>
            <ShoppingCart />
            <p>Your cart is empty! {' '}</p>
            <Link 
                className='text-primary'
                href={`/?tenantId=${searchParams.get('tenantId')}`}
            >
                Continue Shopping
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
        <span className='font-bold text-xl'>Total: ₹{4000}</span>
        <Button>
            Checkout
            <ArrowRight className='ml-2'/>
        </Button>
      </div>
    </div>
  )
}

export default CartItems;
