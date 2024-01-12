import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("dark_mode") === "true",
};

const appControls = createSlice({
  name: "appControls",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = !state.mode;
      localStorage.setItem("dark_mode", JSON.stringify(state.mode));
    },
  },
});

export const { toggleMode } = appControls.actions;
export default appControls.reducer;
