import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("dark_mode") === "true",
  modal: {
    showModal: false,
    children: "",
    data: "",
  },
  showSideNav: false,
  kanbanNav: {
    selected: "board",
  },
  current_page: null,
  device_size: "sm",
};

const appControls = createSlice({
  name: "appControls",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = !state.mode;
      localStorage.setItem("dark_mode", JSON.stringify(state.mode));
    },
    changeDeviceSize(state, action) {
      const windowWidth = action.payload;
      if (windowWidth > 1536) {
        state.device_size = "2xl";
      } else if (windowWidth > 1280) {
        state.device_size = "xl";
      } else if (windowWidth > 1024) {
        state.device_size = "lg";
        state.showSideNav = true;
      } else if (windowWidth > 768) {
        state.device_size = "md";
        state.showSideNav = false;
      } else {
        state.device_size = "sm";
      }
    },

    showModal(state, action) {
      state.modal.showModal = true;
      state.modal.children = action.payload.children;
      state.modal.data = action.payload.data;
    },

    hideModal(state) {
      state.modal.showModal = false;
      state.modal.children = "";
      state.modal.data = "";
    },
    toggleSideNav(state) {
      state.showSideNav = !state.showSideNav;
    },
    change_current_page(state, action) {
      state.current_page = action.payload;
    },
  },
});

export const {
  toggleMode,
  showModal,
  hideModal,
  toggleSideNav,
  change_current_page,
  changeDeviceSize,
} = appControls.actions;
export default appControls.reducer;
