import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  isLoading: false,
  isError: false,
  message: "",
};


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        state.user = action.payload.user || null;
        state.token = action.payload.token || null;

        
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
     
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
