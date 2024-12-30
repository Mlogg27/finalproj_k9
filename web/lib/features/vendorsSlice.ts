import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vendor {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const initialState: Vendor[] = [];

const VendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    input: (state, action: PayloadAction<Vendor>) => {
      const existingVendorIndex = state.findIndex(v => v.id === action.payload.id);
      if (existingVendorIndex !== -1) {
        state[existingVendorIndex] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    reset: (state, action: PayloadAction<{ id?: string }>) => {
      if (action.payload.id) {
        return state.filter(vendor => vendor.id !== action.payload.id);
      }
      return [];
    },
  },
});

export default VendorsSlice;
