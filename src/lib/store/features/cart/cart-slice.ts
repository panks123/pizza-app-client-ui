import { hashCartItems } from '@/lib/utils';
import { Product, Topping } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react';

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
  // product: Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'>; 
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string; 
    };
    selectedToppings: Topping[];
  };
  qty: number;
  hash?: string;
}
export interface CartState {
  cartItems: CartItem[]
}

const initialState: CartState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashCartItems(action.payload);
      const newCartItems = [...state.cartItems, {...action.payload, hash}];
      window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return {
        cartItems: newCartItems
          // ...state.cartItems,
          // {
          //   product: action.payload.product,
          //   chosenConfiguration: action.payload.chosenConfiguration,
          // }
        // ]
      }
    },

    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      return {
        cartItems: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems } = cartSlice.actions

export default cartSlice.reducer