import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Eommerce Features/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

export default store;