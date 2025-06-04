// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: 'http://192.168.8.184/cashtradeproApi/api/task/',
	baseURL: 'http://192.168.217.134/backend/api/task/',
	// withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token'); // or 'refresh_token'
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
