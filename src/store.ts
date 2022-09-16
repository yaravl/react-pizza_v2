import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { controlsReducer } from "./features/controls/controlsSlice";
import { cartReducer } from "./features/cart/cartSlice";
import { productsReducer } from "./features/products/productsSlice";
import { productsApi } from "./api";

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { api: productsApi } },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
