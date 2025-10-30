import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isAuthenticated: user ? true : false,
  isLoading: false,
  isError: false,
  message: '',
};

// Login user
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
