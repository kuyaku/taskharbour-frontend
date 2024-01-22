import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  authStatus: {
    login: "",
    signup: {
      status: null,
      emailError: null,
      usernameError: null,
    },
  },
};

// thunks for login and logout, they are like actions, but actions are plain objects, while thunks can be functions, to handle api requests
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    console.log("Logging in using: ", email, password);
    const response = await client.login(email, password);
    // const response = await AuthService.login(email, password);
    return response;
  }
);

export const signupAsync = createAsyncThunk("auth/signup", async (data) => {
  const response = await client.register(data);
  return response;
});

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  // AuthService.logout();
  client.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignupStatus: (state) => {
      state.authStatus.signup = {
        status: null,
        emailError: null,
        usernameError: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.rejected, (state) => {
        state.authStatus.login = "Error";
        console.log("inside rejected login: error");
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.user;
        state.authStatus.login = "Success";
        console.log("inside fulfilled login: success");
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        if (action.payload.status === 400) {
          state.authStatus.signup = {
            status: "failed",
            emailError: action.payload?.email,
            usernameError: action.payload?.username,
          };
        } else {
          state.authStatus.signup = {
            status: "success",
            emailError: null,
            usernameError: null,
          };
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("accessToken", action.payload.access);
          localStorage.setItem("refreshToken", action.payload.refresh);
          state.accessToken = action.payload.access;
          state.refreshToken = action.payload.refresh;
          state.user = action.payload.user;
        }
      });
  },
});

export const { resetSignupStatus } = authSlice.actions;

export default authSlice.reducer;
