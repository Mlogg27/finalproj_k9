import { configureStore } from "@reduxjs/toolkit";
import { requestsSlice, inputtingSlice } from "./features";

const store = configureStore({
  reducer: {
    inputting: inputtingSlice.reducer,
    requests: requestsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;