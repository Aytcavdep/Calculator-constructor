import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import calcLogicSlice from './slices/calcLogicSlice';

export const store = configureStore({
  reducer: {
    calcItem: calcLogicSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
