import { createSlice } from "@reduxjs/toolkit";

interface controlsState {
  search: string;
  category: string;
  sort: string;
}

const initialState: controlsState = {
  search: "",
  category: "all",
  sort: "rating",
};

const controlsSlice = createSlice({
  name: "@@controls",
  initialState,
  reducers: {
    setSearch: (state, action) => {},
    setCategory: (state, action) => {},
    setSort: (state, action) => {},
  },
});

export const { setSearch, setCategory, setSort } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

// Selectors
