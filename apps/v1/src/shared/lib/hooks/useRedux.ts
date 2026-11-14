"use client";

import type { AppDispatch, RootState, Store } from "@/app/store";
import { useDispatch, useSelector, useStore } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => Store = useStore;
