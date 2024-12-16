import { createSlice } from '@reduxjs/toolkit';
import { signIn, register, logout, getUser, checkAuth } from './userOperations';

const initialState = {
  name: '',
  email: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        return (state = {
          name: action.payload.name,
          email: action.payload.email,
          isLoggedIn: true,
        });
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log('action.error', action.error);
      })
      .addCase(register.fulfilled, (state, action) => {
        state = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.name = '';
        state.email = '';
        state.isLoggedIn = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        return (state = {
          name: action.payload.name,
          email: action.payload.email,
          isLoggedIn: true,
        });
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      });
  },
});

export default userSlice.reducer;
