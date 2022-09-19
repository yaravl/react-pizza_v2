import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "./CartItem";
import { localStorageApi } from "../../api";

export interface ICartState {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
}

const initialState: ICartState = localStorageApi.getFromLS("cart");

const cartSlice = createSlice({
  name: "@@cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ICartItem>) => {
      const newItem = state.items.some((item) => condition(item, action));

      if (state.items.length !== 0 && newItem) {
        state.items = state.items.filter((item) =>
          condition(item, action) ? item.count++ : item
        );
      } else {
        state.items.push(action.payload);
      }

      state.totalCount++;
      state.totalPrice = state.items.reduce((acc, el) => {
        return acc + el.price * el.count;
      }, 0);

      localStorageApi.setToLS("cart", state);
    },
    minusProduct: (state, action) => {
      state.items = state.items.filter((item) => {
        if (condition(item, action)) {
          item.count--;
          state.totalCount--;
          state.totalPrice -= item.price;
          if (item.count === 0) {
            return false;
          }
        }
        return item;
      });
      localStorageApi.setToLS("cart", state);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => {
        if (condition(item, action)) {
          state.totalPrice -= item.count * item.price;
          state.totalCount -= item.count;

          return false;
        }
        return true;
      });
      localStorageApi.setToLS("cart", state);
    },
    clearCart: () => {
      localStorageApi.clearLS("cart");
      return initialState;
    },
  },
});

export const { addProduct, minusProduct, removeProduct, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// Sub functions

const condition = (item: ICartItem, action: PayloadAction<ICartItem>) => {
  return (
    item.id === action.payload.id &&
    item.type === action.payload.type &&
    item.size === action.payload.size
  );
};
