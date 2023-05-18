import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user'),
  // token: null,
  // isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.user = action.payload;
      // state.isAuthenticated = !!action.payload;
      state.user = action.payload;
    },
    // setToken: (state, action) => {
    //   state.token = action.payload;
    // },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
