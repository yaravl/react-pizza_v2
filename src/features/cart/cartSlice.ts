import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartPizzaItem } from "../../types/data";
import { RootState } from "../../store";

interface cartState {
  items: CartPizzaItem[];
  totalCount: number;
  totalPrice: number;
}

const initialState: cartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "@@cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartPizzaItem>) => {
      const newItem = state.items.some((item) => compare(item, action));

      if (state.items.length !== 0 && newItem) {
        state.items.filter((item) =>
          compare(item, action) ? item.count++ : item
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// Selectors

export const selectCartInfo = (state: RootState) => state.cart;

// Any functions

const compare = (item: CartPizzaItem, action: PayloadAction<CartPizzaItem>) => {
  return (
    item.id === action.payload.id &&
    item.type === action.payload.type &&
    item.size === action.payload.size
  );
};
