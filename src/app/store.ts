import { configureStore } from "@reduxjs/toolkit";
import { controlsReducer } from "../features/controls/controlsSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { productsReducer } from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
