import { Product, Topping } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  product: Product;
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string; 
    };
    selectedToppings: Topping[];
  };
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

      const newCartItems = [...state.cartItems, {
          product: action.payload.product,
          chosenConfiguration: action.payload.chosenConfiguration,
      }];
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