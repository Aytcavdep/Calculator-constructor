import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import calcItemSlice from "../redux/slices/calcItemSlice";

export const store = configureStore({
  reducer: {
    calcItem: calcItemSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
