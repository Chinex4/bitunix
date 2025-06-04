// src/redux/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser } from './userThunk';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLoggedInUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(fetchLoggedInUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default userSlice.reducer;
