// src/redux/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';

export const signupUser = createAsyncThunk(
	'auth/signupUser',
	async (formData, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/registerUser', formData);
			toast.success('Signup successful');
			return res.data;
		} catch (err) {
			toast.error(err.response?.data?.errors || 'Signup failed');
			return rejectWithValue(err.response?.data);
		}
	}
);
export const verifyEmailOtp = createAsyncThunk(
	'auth/verifyEmailOtp',
	async ({ email, otp, role }, { rejectWithValue }) => {
		try {
			const res = await axios.post('user/verify-email', {
				email,
				otp,
				role,
			});
			toast.success('Email verified successfully!');
			return res.data;
		} catch (err) {
			toast.error(err?.response?.data?.message || 'OTP verification failed');
			return rejectWithValue(err.response?.data);
		}
	}
);

export const resendOtp = createAsyncThunk(
	'auth/resendOtp',
	async ({ email, role }, { rejectWithValue }) => {
		try {
			const res = await axios.post('user/resend-otp', {
				email,
				role,
				context: 'verify', // or 'reset' if you're doing password reset flow
			});
			toast.success('OTP resent to email');
			return res.data;
		} catch (err) {
			toast.error(err?.response?.data?.message || 'Failed to resend OTP');
			return rejectWithValue(err.response?.data);
		}
	}
);
export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (formData, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('/auth/login', formData); // ✅ your backend login route
			toast.success('Login successful');
			// localStorage.setItem('token', res.data.token); // optional if you're storing tokens
			return res.data;
		} catch (err) {
			toast.error(err.response?.data?.message || 'Login failed');
			return rejectWithValue(err.response?.data);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	async (email, { rejectWithValue }) => {
		try {
			await axiosInstance.post('/auth/forgot-password', { email });
			toast.success('Reset link sent');
		} catch (err) {
			toast.error(err.response?.data?.message || 'Request failed');
			return rejectWithValue(err.response?.data);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async ({ token, password }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('/auth/reset-password', {
				token,
				password,
			});
			toast.success('Password reset successfully');
			return res.data;
		} catch (err) {
			toast.error(err.response?.data?.message || 'Reset failed');
			return rejectWithValue(err.response?.data);
		}
	}
);
