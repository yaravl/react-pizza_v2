import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { PizzaItem } from "../../types/data";
import { productsApi } from "../../api";

export const getProducts = createAsyncThunk<
  PizzaItem,
  string,
  { extra: { api: typeof productsApi } }
>("@@products/getProducts", async (params, { extra: { api } }) => {
  const resp = await api.getProduct();
  const data = await resp.data;

  await console.log(data);

  return data;
});

//TODO: разобраться с типизацией асинкСанка

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
