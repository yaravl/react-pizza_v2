import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface controlsState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sortType: { name: string; sort: string };
}

const initialState: controlsState = {
  searchValue: "",
  currentPage: 1,
  categoryId: 0,
  sortType: { name: "популярности (DESC)", sort: "rating" },
};

const controlsSlice = createSlice({
  name: "@@controls",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<typeof initialState.sortType>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setControls: (state, action) => {
      state.categoryId = +action.payload.categoryId;
      state.currentPage = +action.payload.currentPage;
      state.sortType = action.payload.sortType;
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const { setSearch, setCategory, setSort, setCurrentPage, setControls } =
  controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;
