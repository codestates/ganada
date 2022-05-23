import { createSlice } from '@reduxjs/toolkit';

const chatState = {};

const currentChatUserInfoSlice = createSlice({
  name: 'currentChatUserInfo',
  initialState: chatState,
  reducers: {
    setCurrentChatUserInfo: (state, action) => {
      state.data = action.payload;
    },
    setStatus: (state, action) => {
      state.data.status = action.payload;
    },
  },
});

export const { setCurrentChatUserInfo, setStatus } =
  currentChatUserInfoSlice.actions;
export default currentChatUserInfoSlice.reducer;
