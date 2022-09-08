import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface controlsState {
  search: string;
  category: number;
  sort: { name: string; sort: string };
}

const initialState: controlsState = {
  search: "",
  category: 0,
  sort: { name: "популярности", sort: "rating" },
};

const controlsSlice = createSlice({
  name: "@@controls",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<{ name: string; sort: string }>) => {
      state.sort = action.payload;
    },
  },
});

export const { setSearch, setCategory, setSort } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

// Selectors

export const allControls = (state: RootState) => ({
  search: state.controls.search,
  category: state.controls.category,
  sort: state.controls.sort,
});
