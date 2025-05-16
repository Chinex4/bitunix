// src/redux/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
	signupUser,
	loginUser,
	forgotPassword,
	resetPassword,
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
			});
	},
});

export const { logout, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
