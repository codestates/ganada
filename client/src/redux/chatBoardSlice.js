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
    setChatBoard: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setChatBoard } = chatBoardSlice.actions;
export default chatBoardSlice.reducer;
