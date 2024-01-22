import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import appControlReducer from "./appControlsSlice";
import userData from "./userDataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    appControl: appControlReducer,
    userData: userData,
  },
});

export default store;
