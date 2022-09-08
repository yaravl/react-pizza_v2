import { configureStore } from "@reduxjs/toolkit";
import { controlsReducer } from "./features/controls/controlsSlice";

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
