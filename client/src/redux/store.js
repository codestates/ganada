import { configureStore } from '@reduxjs/toolkit';
import searchCondition from './searchConditionSlice';
import userSlice from './userSlice';
import userInfo from './userInfoSlice';
import auth from './authSlice';

export const store = configureStore({
  reducer: {
    searchCondition,
    userSlice,
    userInfo,
    auth,
  },
});
