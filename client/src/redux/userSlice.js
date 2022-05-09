import { createSlice } from '@reduxjs/tooklit';
import { GiStarSattelites } from 'react-icons/gi';

const initialState = {
  email: '',
  name: '',
  phoneNumber: '',
  image: '',
};
// kind time agin ?

const userSlice = createSlice({
  name: 'user',
  initialState: { accessToken: null, userInfo: initialState },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      // state.userInfo.name
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.userInfo = initialState;
    },
  },
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
