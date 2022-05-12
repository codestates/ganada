import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const myPostsSlice = createSlice({
  name: 'myPosts',
  initialState,
  reducers: {
    setPostsList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPostsList } = myPostsSlice.actions;
export default myPostsSlice.reducer;
