import { createSlice } from "@reduxjs/toolkit";

export const dockSlice = createSlice({
  name: "dock",
  initialState: {
    show: false,
  },
  reducers: {
    showDock: (state) => {
      state.show = true;
    },
    hideDock: (state) => {
      state.show = false;
    },
  },
});

export const { showDock, hideDock } = dockSlice.actions;
