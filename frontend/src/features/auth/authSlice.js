import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Safely read and parse user from localStorage
let storedUser = null;
try {
  const userData = localStorage.getItem("user");
  if (userData && userData !== "undefined" && userData !== "null") {
    storedUser = JSON.parse(userData);
  }
} catch (error) {
  console.warn("Error parsing stored user:", error);
  storedUser = null;
}

const storedToken = localStorage.getItem("token") || null;

//Initial state
const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
  isLoading: false,
  isError: false,
  message: "",
};

//Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Logout clears everything
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
      //Login pending
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })

      //Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        //Normalize response
        const user = action.payload.user || {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };

        state.user = user;
        state.token = action.payload.token || null;

        //Save to localStorage
        if (state.token) {
          localStorage.setItem("token", state.token);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })

      //Login failure
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Invalid credentials";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

//Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
