'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store/store'
import { setInitialCartItems } from '@/lib/store/features/cart/cart-slice'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // TODO: set initial cart data
    const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage !== undefined;
    if (isLocalStorageAvailable) {
      const cartItems = window.localStorage.getItem('cartItems');
      try {
        if(cartItems) {
          const parsedCartItems = JSON.parse(cartItems);
          storeRef.current.dispatch(setInitialCartItems(parsedCartItems));
        }
      }
      catch (e) {
        console.log('Error parsing cart items:', e);  
      } 
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}