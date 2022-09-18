import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PizzaItem } from "../../types/data";
import { productsApi } from "../../api";

export const getProducts = createAsyncThunk<
  PizzaItem[],
  string,
  { rejectValue: string }
>("@@products/getProducts", async (params, { rejectWithValue }) => {
  const response = await productsApi.getProduct(params);
  if (response.status === 400) {
    return rejectWithValue("Products fetch error!");
  }
  return response.data;
});

interface InitialState {
  items: PizzaItem[];
  status: string;
  error: null | string;
}

const initialState: InitialState = {
  items: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "@@products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      if (action.payload) {
        state.status = "rejected";
        state.error = action.payload;
      }
    });
  },
});

export const productsReducer = productsSlice.reducer;
