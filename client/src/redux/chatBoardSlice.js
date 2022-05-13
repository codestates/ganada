import { createSlice } from '@reduxjs/toolkit';

const chatBoardState = {
  chatRoomId: '',
  boardId: '',
  boardtitle: '',
  status: '',
  title: '',
  image: '',
};

const chatBoardSlice = createSlice({
  name: 'chatBoard',
  initialState: chatBoardState,
  reducers: {
    setChatRoom: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setChatRoom } = chatBoardSlice.actions;
export default chatBoardSlice.reducer;
