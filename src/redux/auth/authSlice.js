// src/redux/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  forgotPassword,
  verifyAndResetPassword,
  verifyEmailOtp,
  resendOtp,
} from "./authThunk";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: accessToken ? { accessToken } : null,
    loading: false,
    error: null,
    // token: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
    },

    setUserFromToken: (state, action) => {
      const { accessToken } = action.payload;
      state.user = { accessToken };
    //   state.token = accessToken; // optional: keep this only if your app still uses `token` elsewhere
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          accessToken: action.payload.accessToken,
        };
        // state.tempToken = action.payload.accessToken
        // state.token = action.payload.accessToken; // optional if needed
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      })
      // reset password
      .addCase(verifyAndResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAndResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyAndResetPassword.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      })

      // verify email OTP
      .addCase(verifyEmailOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
