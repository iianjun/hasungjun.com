import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    lastMessage: null,
  },
  reducers: {
    setLastMessage: (state, action) => {
      state.lastMessage = action.payload;
    },
    deleteLastMessage: (state) => {
      state.lastMessage = null;
    },
  },
});

export const { setLastMessage, deleteLastMessage } = messageSlice.actions;
