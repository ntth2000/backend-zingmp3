import { createSlice } from "@reduxjs/toolkit";

export const USER_SETTING = "user-setting";

const initialState = JSON.parse(localStorage.getItem(USER_SETTING)) || {
  theme: "zma",
};

const userSettingSlice = createSlice({
  name: "userSetting",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem(USER_SETTING, JSON.stringify(state));
    },
  },
});
export const userSettingActions = userSettingSlice.actions;
export default userSettingSlice.reducer;
