import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// thunks for login and logout, they are like actions, but actions are plain objects, while thunks can be functions, to handle api requests
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await client.login(email, password);
    // const response = await AuthService.login(email, password);
    return response;
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  // AuthService.logout();
  console.log("called logout");
  client.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.user;
        // localStorage.setItem("accessToken", action.payload.access);
        // localStorage.setItem("refreshToken", action.payload.refresh);
        // localStorage.setItem("user", action.payload.user);
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        // localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
