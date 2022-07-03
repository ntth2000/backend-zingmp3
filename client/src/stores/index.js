import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./uiSlice.js";
import playerReducer from "./playerSlice.js";
import userSettingReducer from "./userSettingSlice.js";
import queueReducer from "./queueSlice.js";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    userSetting: userSettingReducer,
    player: playerReducer,
    queue: queueReducer,
    auth: authReducer,
  },
});

export default store;
