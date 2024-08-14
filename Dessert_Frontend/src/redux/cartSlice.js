// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name :"cart",
//   initialState:{
//     items:[]
//   },  
//   reducers:{
//     addItem : (state,action)=>{
//           state.items.push(action.payload);
//     }
//   }
// });

// export const {addItem } = cartSlice.actions;
// export default cartSlice.reducer
//9.8
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload || [];
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload || {};
      if (productId !== undefined && quantity !== undefined) {
        const item = state.items.find(item => item.productId === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    incrementItem: (state, action) => {
      const { productId } = action.payload || {};
      if (productId !== undefined) {
        const item = state.items.find(item => item.productId === productId);
        if (item) {
          item.quantity += 1;
        }
      }
    },
    decrementItem: (state, action) => {
      const { productId } = action.payload || {};
      if (productId !== undefined) {
        const item = state.items.find(item => item.productId === productId);
        if (item) {
          if (item.quantity <= 1) {
            state.items = state.items.filter(i => i.productId !== productId);
          } else {
            item.quantity -= 1;
          }
        }
      }
    },
    removeItem: (state, action) => {
      const { productId } = action.payload || {};
      if (productId !== undefined) {
        state.items = state.items.filter(item => item.productId !== productId);
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { setCart, addItem, updateItemQuantity, incrementItem, decrementItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
