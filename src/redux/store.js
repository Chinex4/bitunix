// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import userSettingsReducer from './user/userSettingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    userSettings: userSettingsReducer,
  },
});

export default store;
