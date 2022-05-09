import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.token = action.payload;
    },
    isLogout: (state, action) => {
      state.token = null;
    },
  },
});

export const { isLogin } = authSlice.actions;

export default authSlice.reducer;
