import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchLoggedInUser = createAsyncThunk(
	'user/fetchLoggedInUser',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.get('user/fetchuser'); // Adjust endpoint to your API's user info route
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to fetch user'
			);
		}
	}
);
