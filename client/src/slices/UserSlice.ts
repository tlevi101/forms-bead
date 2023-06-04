import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const customTestsSlice = createSlice({
  name: "customTests",
  initialState,
  reducers: {
    login: (state) => {
      state = true;
    },
    logout: (state) => {
      state = false;
    }
  },
});

export const {
  login,
  logout
} = customTestsSlice.actions;
export const customTestsReducer = customTestsSlice.reducer;
export const getAuthState = (state : boolean) => state;

