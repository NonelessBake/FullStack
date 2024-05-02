import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth";
import { productReducer } from "./slice/products";
import { cartReducer } from "./slice/cart";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
