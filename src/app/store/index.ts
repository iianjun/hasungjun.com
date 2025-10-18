import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { dockSlice } from "@/features/dock-toggle";
import { messageSlice } from "@/features/message/model/message.slice";

const reducer = combineReducers({
  dock: dockSlice.reducer,
  message: messageSlice.reducer,
});
export const makeStore = () =>
  configureStore({
    reducer,
  });

export type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
