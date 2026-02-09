import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type user = {
  name: string;
  email?: String;
  role: string;
  id?: string;
};
export type AuthState = {
  isAuthenticated: boolean;
  userInfo: null | user;
};
const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthInfo: function (state, action: PayloadAction<AuthState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const AuthReducer = authenticationSlice.reducer;
export const { setAuthInfo } = authenticationSlice.actions;
