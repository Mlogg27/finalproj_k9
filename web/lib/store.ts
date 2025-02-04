import { configureStore } from "@reduxjs/toolkit";
import { inputtingSlice } from "./features";

const store = configureStore({
  reducer: {
    inputting: inputtingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
