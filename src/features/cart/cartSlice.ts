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
      const newItem = state.items.some((item) => condition(item, action));

      if (state.items.length !== 0 && newItem) {
        state.items.filter((item) =>
          condition(item, action) ? item.count++ : item
        );
      } else {
        state.items.push(action.payload);
      }

      state.totalCount++;
      state.totalPrice = state.items.reduce((acc, el) => {
        return acc + el.price * el.count;
      }, 0);
    },
    plusProduct: (state, action) => {
      state.items.filter((item) => {
        if (condition(item, action)) {
          item.count++;
          state.totalCount++;
          state.totalPrice += item.price;
        }
        return item;
      });
    },
    minusProduct: (state, action) => {
      state.items = state.items.filter((item) => {
        if (condition(item, action)) {
          item.count--;
          state.totalCount--;
          state.totalPrice -= item.price;
          if (item.count === 0) return false;
        }
        return item;
      });
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
    },
    clearCart: () => initialState,
  },
});

export const {
  addProduct,
  plusProduct,
  minusProduct,
  removeProduct,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// Selectors

export const selectCartInfo = (state: RootState) => state.cart;

// Any functions

const condition = (
  item: CartPizzaItem,
  action: PayloadAction<CartPizzaItem>
) => {
  return (
    item.id === action.payload.id &&
    item.type === action.payload.type &&
    item.size === action.payload.size
  );
};

//TODO: объеденить два метода plusproduct и addItem
