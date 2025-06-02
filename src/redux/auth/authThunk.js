// src/reduxuseruserThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { showSuccess, showError } from "../../utils/toast";
import { Navigate } from "react-router-dom";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("user/registerUser", formData);
      showSuccess("Signup successful");
      return res.data;
    } catch (err) {
      showError(err.response?.data?.errors || "Signup failed");
      return rejectWithValue(err.response?.data?.errors);
    }
  }
);
 export const verifyEmailOtp = createAsyncThunk(
  "auth/verifyEmailOtp",
  async ({ email, otp, createdAt, navigate }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("user/verify-email", {
        email,
        otp,
        createdAt,
      });

      if (res.status === 200) {
        showSuccess("Email has been verified successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      showError(err?.response?.data?.errors || "OTP verification failed");
      return rejectWithValue(err?.response?.data?.errors);
    }
  }
);
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email,createdAt}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("user/resend-otp", { email, createdAt });
      showSuccess("OTP resent to email");
      return res.data;
    } catch (err) {
      showError(err?.response?.data?.errors || "Failed to resend OTP");
      return rejectWithValue(err.response?.data?.errors);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("user/login", formData); 
	  if (res.status === 201) {
		
		  showSuccess("Login successful"); 
		  return res.data;
	  }
    } catch (err) {
      showError(err.response?.data?.errors || "Login failed");
      return rejectWithValue(err.response?.data?.errors);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      await axiosInstance.post("user/forgot-password", { email });
      showSuccess("Reset link sent");
    } catch (err) {
      showError(err.response?.data?.errors || "Request failed");
      return rejectWithValue(err.response?.data?.errors);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("user/reset-password", {
        token,
        password,
      });
      showSuccess("Password reset successfully");
      return res.data;
    } catch (err) {
      showError(err.response?.data?.errors || "Reset failed");
      return rejectWithValue(err.response?.data?.errors);
    }
  }
);
