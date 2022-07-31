import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./RootReducer";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
const store = configureStore({
  reducer: { RootReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
