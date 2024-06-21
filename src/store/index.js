import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "../Slice";

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});
