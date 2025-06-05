import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
export const fetchLoggedInUser = createAsyncThunk(
	'user/fetchLoggedInUser',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('accessToken');
			const res = await axiosInstance.get('user/fetchuser', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.removeItem('accessToken');
				window.location.href = '/login';  
				return rejectWithValue('Session expired. Please log in again.');
			}
			return rejectWithValue(
				error.response?.data?.errors || 'Failed to fetch user'
			);
		}
	}
);