import { createSlice } from '@reduxjs/toolkit';

const chatState = {};

const chatSlice = createSlice({
  name: 'chatMessage',
  initialState: chatState,
  reducers: {
    setChatMessage: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
