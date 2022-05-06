import { configureStore } from '@reduxjs/toolkit';
import searchCondition from './searchConditionSlice';

export const store = configureStore({
  reducer: {
    searchCondition,
  },
});
