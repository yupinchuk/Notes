import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        return rejectWithValue(`Error: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      return response.json();
    } catch (error) {
      return rejectWithValue('Error:', error);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      return rejectWithValue('Error:', error);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(`${BASE_URL}/api/users/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error:', error);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/check`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error:', error);
    }
  }
);
