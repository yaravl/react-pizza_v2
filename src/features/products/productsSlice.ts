import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../../api";
import type { IProductItem } from "./ProductItem";

export const getProducts = createAsyncThunk<
  IProductItem[],
  string,
  { rejectValue: string }
>("@@products/getProducts", async (params, { rejectWithValue }) => {
  try {
    const response = await productsApi.getProducts(params);
    return response.data;
  } catch {
    return rejectWithValue("Products fetch error!");
  }
});

interface InitialState {
  items: IProductItem[];
  status: string;
  error: undefined | string;
}

const initialState: InitialState = {
  items: [],
  status: "idle",
  error: undefined,
};

const productsSlice = createSlice({
  name: "@@products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.items = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      if (action) {
        state.status = "rejected";
        state.error = action.payload;
      }
    });
  },
});

export const productsReducer = productsSlice.reducer;
