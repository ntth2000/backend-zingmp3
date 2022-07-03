import { createSlice } from "@reduxjs/toolkit";
const THEME = "UI";
const initialState = {
  showQueue: false,
  showMobileSidebar: false,
  theme:
    (JSON.parse(localStorage.getItem(THEME)) &&
      JSON.parse(localStorage.getItem(THEME)).theme) ||
    "zma",
  textMode:
    (JSON.parse(localStorage.getItem(THEME)) &&
      JSON.parse(localStorage.getItem(THEME)).textMode) ||
    "light-text",
  previewTheme: null,
  previewMode: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileSidebar: (state) => {
      state.showMobileSidebar = !state.showMobileSidebar;
    },
    hideMobileSidebar: (state) => {
      state.showMobileSidebar = false;
    },
    toggleQueue: (state) => {
      state.showQueue = !state.showQueue;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem(
        THEME,
        JSON.stringify({ theme: state.theme, textMode: state.textMode })
      );
    },
    setTextMode: (state, action) => {
      state.textMode = action.payload;
      localStorage.setItem(
        THEME,
        JSON.stringify({ theme: state.theme, textMode: state.textMode })
      );
    },
    setPreviewTheme: (state, action) => {
      state.previewTheme = action.payload;
    },
    setPreviewMode: (state, action) => {
      state.previewMode = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
