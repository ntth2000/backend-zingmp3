import { createSlice } from "@reduxjs/toolkit";

export const AUTH = "auth";

const initialState = JSON.parse(localStorage.getItem(AUTH)) || {
  user: null,
  isFetching: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
