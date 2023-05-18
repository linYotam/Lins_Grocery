import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser, logout } from '../reducers/authSlice';
import Cookies from 'js-cookie';

const API_URL = 'https://localhost:7062/api/auth';

// Set the cookie options with HttpOnly and Secure attributes
const cookieOptions = {
  expires: 7, // Cookie expiration in days
  path: '/', // Cookie path
  secure: true, // Set the 'Secure' attribute
  sameSite: 'strict', // Set the 'SameSite' attribute
  //httpOnly: true, // Set the 'HttpOnly' attribute
};

// Async action creator for user registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { dispatch }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { user } = response.data;
    dispatch(setUser(user));
    // dispatch(setToken(token));
    // Save token to localStorage if needed
    //sessionStorage.setItem('user', JSON.stringify(user));

    // Save the user in a cookie with the specified options
    Cookies.set('user', JSON.stringify(user), cookieOptions);

    return user;
  } catch (error) {
    throw error.response.data;
  }
});

// Async action creator for user login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { dispatch }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    //const { user, token } = response.data;
    const user = response.data;
    dispatch(setUser(user));
    // dispatch(setToken(token));
    // Save token to localStorage if needed
    //sessionStorage.setItem('user', JSON.stringify(user));

    // Save the user in a cookie with the specified options
    Cookies.set('user', JSON.stringify(user), cookieOptions);

    // localStorage.setItem('token', user.JwtToken);
    // localStorage.setItem('role', user.Type);
    return user;
  } catch (error) {
    throw error.response.data;
  }
});

// Async action creator for user logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  dispatch(logout());
  // Remove token from localStorage if needed
  // sessionStorage.removeItem('user');
  Cookies.remove('user'); // Remove the user cookie
});
