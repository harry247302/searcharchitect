import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Define base URL from env
const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === "DEV"
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

// -------------------------------
// 🔹 Async Thunks
// -------------------------------

export const architectSignUp = createAsyncThunk(
  "architect/signUp",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/architech/sign-up`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const architectLogin = createAsyncThunk(
  "architect/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/architech/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// -------------------------------
// 🔹 Slice
// -------------------------------

const architectSlice = createSlice({
  name: "architect",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logoutArchitect: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 SignUp
      .addCase(architectSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(architectSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(architectSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Login
      .addCase(architectLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(architectLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;
      })
      .addCase(architectLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutArchitect } = architectSlice.actions;

export default architectSlice.reducer;
