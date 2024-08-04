import { hashCartItems } from '@/lib/utils';
import { Product, Topping } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
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
    },

    changeItemQty: (state, action: PayloadAction<{hash: string, changer: number}>) => {
      const itemIndex = state.cartItems.findIndex(item => item.hash === action.payload.hash);
      if(itemIndex === -1) return state;
      if(action.payload.changer === 0) {
        state.cartItems.splice(itemIndex, 1);
        window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        return;
      }
      state.cartItems[itemIndex].qty = Math.max(1, state.cartItems[itemIndex].qty += action.payload.changer);
      window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems, changeItemQty } = cartSlice.actions

export default cartSlice.reducer