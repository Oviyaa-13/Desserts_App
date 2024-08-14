// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./cartSlice";

// const store = configureStore({
//   reducer:{
//     cart : cartSlice,
//   },
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    user:userSlice,
  },
});

export default store;
