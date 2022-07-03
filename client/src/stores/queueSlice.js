import { createSlice } from "@reduxjs/toolkit";
import { shuffleQueue } from "~/hooks/useShuffle";

export const QUEUE = "queue";

const initialState = JSON.parse(localStorage.getItem(QUEUE)) || {
  currentSongId: "",
  currentPlaylistId: "",
  clickPlaylistBtn: false,
  idList: [],
  originalIdList: [],
  currentIndex: 0,
  shuffle: false,
  repeatStatus: 0,
  items: [],
};
const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    updateClickPlaylistBtn: (state, action) => {
      state.clickPlaylistBtn = action.payload;
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    updateRepeatStatus: (state) => {
      state.repeatStatus = (state.repeatStatus + 1) % 3;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
      if (state.shuffle) {
        state.idList = shuffleQueue(state.originalIdList);
      } else {
        state.idList = [...state.originalIdList];
      }
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    updateCurrentSong: (state, action) => {
      state.currentSongId = action.payload;
      state.currentIndex = state.idList.indexOf(state.currentSongId);
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    updateCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    updatePlaylistId: (state, action) => {
      state.currentPlaylistId = action.payload;
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    updateOriginalList: (state, action) => {
      state.originalIdList = action.payload;
      if (state.shuffle) {
        state.idList = shuffleQueue(state.originalIdList);
      } else {
        state.idList = [...state.originalIdList];
      }
      if (state.clickPlaylistBtn) {
        state.currentSongId = state.idList[0];
      }
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    updateItems: function (state, action) {
      state.items = action.payload;
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    next: (state) => {
      if (state.currentIndex === state.idList.length - 1) {
        state.currentIndex = 0;
      } else {
        state.currentIndex++;
      }
      state.currentSongId = state.idList[state.currentIndex];
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
    prev: (state) => {
      if (state.currentIndex === 0) {
        state.currentIndex = state.idList.length - 1;
      } else {
        state.currentIndex--;
      }
      state.currentSongId = state.idList[state.currentIndex];
      localStorage.setItem(QUEUE, JSON.stringify(state));
    },
  },
});
export const queueActions = queueSlice.actions;
export default queueSlice.reducer;
