import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks/myTasks`, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        return rejectWithValue(`Error: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/tasks`, task, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        return rejectWithValue(`Error: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/tasks/${task.id}`,
        task,
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

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        return rejectWithValue(`Error: ${response.status}`);
      }
      return taskId;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);
