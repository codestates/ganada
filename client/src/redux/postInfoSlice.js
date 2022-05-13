import { createSlice } from '@reduxjs/toolkit';

const postState = {
  id: 0,
  category: 0,
  title: '',
  image: '',
  description: '',
  tags: '',
  latitude: '',
  longitude: '',
  mainAddress: '',
  detailAddress: '',
  status: 0,
  chatRoomId: '',
};

const postInfoSlice = createSlice({
  name: 'postInfo',
  initialState: postState,
  reducers: {
    setPostInfo: (state, action) => {
      state.postState = action.payload;
    },
    setChatBoard: (state, action) => {
      state.postState.chatRoomId = action.payload;
    },
  },
});

export const { setPostInfo, setChatBoard } = postInfoSlice.actions;
export default postInfoSlice.reducer;
