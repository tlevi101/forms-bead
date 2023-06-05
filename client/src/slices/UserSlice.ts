import { createSlice } from "@reduxjs/toolkit";
import {LoginResponse, User} from "../Types";
import {useSelector} from "react-redux";
interface State {
  accessToken: string | null | undefined;
  user: User | null | undefined;
}

const initialState :State = {
  accessToken: undefined,
  user: undefined
};

const authSlice = createSlice({
  name: "customTests",
  initialState,
  reducers: {
    login: (state, action:{payload: {response:LoginResponse}}) => {
      console.log("login", action.payload.response);
        state.accessToken = action.payload.response.accessToken;
        state.user = action.payload.response.user;
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    }
  },
});

export const {
  login,
  logout
} = authSlice.actions;
export const authReducer = authSlice.reducer;
export const getAuthState = (state : State) => state.accessToken !== null && state.user !== undefined;
export const getAccessToken = (state : State) => state.accessToken;
export const getUser = (state : State) => state.user;

export const getState = (state: State) => state;

