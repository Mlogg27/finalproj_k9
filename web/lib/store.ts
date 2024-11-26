import { configureStore } from "@reduxjs/toolkit";
import inputtingSlice from "@/lib/features/inputtingSlice";

const store = configureStore({
  reducer: {
    inputting: inputtingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;