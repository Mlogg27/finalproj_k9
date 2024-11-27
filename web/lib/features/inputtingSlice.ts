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
    reset: (state, action: PayloadAction<{ name?: string }>) => {
      if(action.payload.name){
        state[action.payload.name] = '';
      } else{
        return initialState
      }
    }
  },
});

export default inputtingSlice;
