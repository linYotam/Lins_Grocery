import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser, logout } from "../reducers/authSlice";
import Cookies from "js-cookie";

const API_URL = "https://localhost:7062/api/auth";

// Set the cookie options with HttpOnly and Secure attributes
const cookieOptions = {
  expires: 7, // Cookie expiration in days
  path: "/", // Cookie path
  secure: true, // Set the 'Secure' attribute
  sameSite: "strict", // Set the 'SameSite' attribute
};

// Async action creator for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      const { user } = response.data;

      dispatch(setUser(user));
      Cookies.set("user", JSON.stringify(user), cookieOptions);

      return user;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async action creator for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      const user = response.data;

      dispatch(setUser(user));
      Cookies.set("user", JSON.stringify(user), cookieOptions);

      return user;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async action creator for user logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    dispatch(logout());

    // Remove the user cookie
    Cookies.remove("user");
  }
);
