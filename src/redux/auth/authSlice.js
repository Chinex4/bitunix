// src/redux/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
	signupUser,
	loginUser,
	forgotPassword,
	resetPassword,
	verifyEmailOtp,
	resendOtp,
} from './authThunk';
const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		// user: null,
		user: initialToken ? { token: initialToken } : null, // or fetch user info here
		loading: false,
		error: null,
		token: null,
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.loading = false;
			localStorage.removeItem('token');
		},
		setUserFromToken: (state, action) => {
			state.user = { token: action.payload };
			state.token = action.payload;
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
				state.user = action.payload;
				localStorage.setItem('token', action.payload.token);
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
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(resetPassword.rejected, (state) => {
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
