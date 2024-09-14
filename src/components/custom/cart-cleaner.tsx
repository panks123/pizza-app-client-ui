'use client';
import { clearCart } from '@/lib/store/features/cart/cart-slice';
import { useAppDispatch } from '@/lib/store/hooks';
import React from 'react'

const CartCleaner = () => {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(clearCart());
        /* eslint-disable-next-line */
    }, []);
  return null;
}

export default CartCleaner;
