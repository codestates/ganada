import { configureStore } from '@reduxjs/toolkit';
import searchCondition from './searchConditionSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    searchCondition,
    userSlice,
  },
});
