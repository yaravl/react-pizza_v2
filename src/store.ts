import { configureStore } from "@reduxjs/toolkit";
import { controlsReducer } from "./features/controls/controlsSlice";
import { cartReducer } from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    cart: cartReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
