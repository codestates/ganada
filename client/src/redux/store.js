import { configureStore } from '@reduxjs/toolkit';
import searchCondition from './searchConditionSlice';
import userSlice from './userSlice';
import userInfo from './userInfoSlice';
import auth from './authSlice';
import postInfo from './postInfoSlice';
import myPosts from './myPostsSlice';

export const store = configureStore({
  reducer: {
    searchCondition,
    postInfo,
    userSlice,
    userInfo,
    auth,
    myPosts,
  },
});
