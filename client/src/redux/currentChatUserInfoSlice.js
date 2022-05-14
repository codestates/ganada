import { createSlice } from '@reduxjs/toolkit';

const chatState = {};

const currentChatUserInfoSlice = createSlice({
  name: 'currentChatUserInfo',
  initialState: chatState,
  reducers: {
    setCurrentChatUserInfo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCurrentChatUserInfo } = currentChatUserInfoSlice.actions;
export default currentChatUserInfoSlice.reducer;
