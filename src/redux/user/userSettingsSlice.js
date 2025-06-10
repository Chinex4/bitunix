import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// UPDATE NICKNAME THUNK
export const updateNickname = createAsyncThunk(
	'userSettings/updateNickname',
	async (nickname, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.patch('/user/updateNickname', {
				nickname,
			});
			return response;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Error updating nickname');
		}
	}
);

// UPDATE LANGUAGE THUNK
export const updateLanguage = createAsyncThunk(
	'userSettings/updateLanguage',
	async (language, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.patch('/user/updateLanguage', {
				language,
			});
			return response;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Error updating language');
		}
	}
);

const userSettingsSlice = createSlice({
	name: 'userSettings',
	initialState: {
		nickname: '',
		language: 'English',
		status: null,
		error: null,
	},
	reducers: {
		resetUserSettingsState: (state) => {
			state.status = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder

			// Nickname
			.addCase(updateNickname.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateNickname.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.nickname = action.payload.nickname;
			})
			.addCase(updateNickname.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			// Language
			.addCase(updateLanguage.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateLanguage.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.language = action.payload.language;
			})
			.addCase(updateLanguage.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { resetUserSettingsState } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
