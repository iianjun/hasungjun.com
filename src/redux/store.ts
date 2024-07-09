import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { msgReducer } from "@/redux/reducer/msgReducer";

const reducer = combineReducers({
  msgReducer,
});
export const makeStore = () =>
  configureStore({
    reducer,
  });

export type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
