import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, updateTask, deleteTask } from './tasksOperations';

const initialState = {
  items: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.items = state.items.map((task) =>
          task._id === payload._id ? payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((task) => task._id !== payload._id);
      });
  },
});

export default tasksSlice.reducer;
