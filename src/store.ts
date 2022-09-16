import { configureStore } from "@reduxjs/toolkit";
import { controlsReducer } from "./features/controls/controlsSlice";
import { cartReducer } from "./features/cart/cartSlice";
import { productsReducer } from "./features/products/productsSlice";
import axios from "axios";
import * as api from "./api";

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: { client: axios, api } } }),
});

export type RootState = ReturnType<typeof store.getState>;
