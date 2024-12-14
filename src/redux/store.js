import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import tasksReducer from './task/taskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});
