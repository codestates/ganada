import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  id: null,
  image: null,
  name: null,
  password: null,
  phoneNumber: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUpdateUserInfo: (state, action) => {
      const res = action.payload;
      const result = {
        id: res.id,
        image: res.image,
        name: res.name,
        password: res.password,
        phoneNumber: res.phoneNumber,
        email: res.email,
      };
      return result;
    },
  },
});

export const { setUpdateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
