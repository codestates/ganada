import { createSlice } from '@reduxjs/toolkit';

const initialUserInfo = {
  email: '',
  name: '',
  phoneNumber: '',
  image: '',
}; // 유저 정보

const userSlice = createSlice({
  name: 'user',
  initialState: { accessToken: null, userInfo: initialUserInfo },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userInfo = initialUserInfo;
    },
  },
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
