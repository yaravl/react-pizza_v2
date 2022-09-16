import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { PizzaItem } from "../../types/data";

export const getProducts = createAsyncThunk(
  "@@products/getProducts",
  async (_, { extra: { client, api } }) => {
    console.log(api, client);
  }
);

interface InitialState {
  products: PizzaItem[];
  status: string;
  error: null | string;
}

const initialState: InitialState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "@@products",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const productsReducer = productsSlice.reducer;
