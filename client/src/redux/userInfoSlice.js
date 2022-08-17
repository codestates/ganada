import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    email: null,
    id: null,
    image: null,
    name: null,
    password: null,
    phoneNumber: null,
  },
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUpdateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUpdateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
