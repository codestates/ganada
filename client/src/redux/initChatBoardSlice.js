import { createSlice } from '@reduxjs/toolkit';

const initChatBoardState = {
  chatRoomId: '',
  boardId: '',
  boardtitle: '',
  status: '',
  title: '',
  image: '',
};

const initChatBoardSlice = createSlice({
  name: 'initChatBoard',
  initialState: initChatBoardState,
  reducers: {
    setInitChatBoard: (state, action) => {
      state.data = action.payload;
    },
    DeleteInitChatBoard: (state, action) => {
      state.data = undefined;
    },
  },
});

export const { setInitChatBoard, DeleteInitChatBoard } =
  initChatBoardSlice.actions;
export default initChatBoardSlice.reducer;
