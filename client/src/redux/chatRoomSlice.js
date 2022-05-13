import { createSlice } from '@reduxjs/toolkit';

const chatRoomSate = {};

const chatRoomSilce = createSlice({
  name: 'chatRoom',
  initialState: chatRoomSate,
  reducers: {
    setChatRoom: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setChatRoom } = chatRoomSilce.actions;
export default chatRoomSilce.reducer;
