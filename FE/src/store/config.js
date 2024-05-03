import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth";
import { cartReducer } from "./slice/cart";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
