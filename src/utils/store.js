import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import appControlReducer from "./appControlsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    appControl: appControlReducer,
  },
});

export default store;
