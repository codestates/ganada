import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  tags: [],
  type: 'model',
};

const searchConditionSlice = createSlice({
  name: 'searchCondition',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },

    resetKeyword: (state) => {
      state.keyword = '';
    },

    setTags: (state, action) => {
      state.tags = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setKeyword } = searchConditionSlice.actions;
export const { resetKeyword } = searchConditionSlice.actions;
export const { setType } = searchConditionSlice.actions;
export const { setTags } = searchConditionSlice.actions;
export default searchConditionSlice.reducer;
