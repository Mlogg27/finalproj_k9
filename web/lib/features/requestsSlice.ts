import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest } from "@/ulties/axios";

interface Request {
  id: string;
  name: string;
  phone: string;
  email: string;
  create_time: Date;
  vendor_id ?: string;
}

const initialState: Request[] = [];

const RequestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    input: (state, action: PayloadAction<Request>) => {
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

// export function fetchTodoById(todoId) {
//   return async function fetchTodoByIdThunk(dispatch, getState) {
//     const response = await getRequest();
//     dispatch(todosLoaded(response.todos))
//   }
// }

export default RequestsSlice;
