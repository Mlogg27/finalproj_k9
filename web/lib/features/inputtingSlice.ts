import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputtingState {
  [key: string]: string;
}

const initialState: InputtingState = {};

const inputtingSlice = createSlice({
  name: "inputting",
  initialState,
  reducers: {
    input: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state[action.payload.name] = action.payload.value;
    },
    reset: (state, action: PayloadAction<{ name: string }>) => {
      state[action.payload.name] = '';
    }
  },
});

export default inputtingSlice;
