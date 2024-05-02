import { createSlice } from "@reduxjs/toolkit";
import { APP_CONFIG } from "../../../config/appConfig";

const initialState = {
  isLogin: false,
  accessToken: null,
  userInfo: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userInfo = { ...action.payload.userInfo };
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = undefined;
      state.accessToken = null;
      localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN);

    },
  },
});
export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
