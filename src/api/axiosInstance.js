// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
<<<<<<< HEAD
	// baseURL: 'http://172.20.10.2/cashtradeproApi/api/task/',
	baseURL: 'http://192.168.8.189/cashtradeproApi/api/task/',
	// baseURL: 'http://192.168.163.134/backend/api/task/',
=======
	// baseURL: 'http://192.168.8.189/cashtradeproApi/api/task/',
	baseURL: 'http://192.168.211.134/backend/api/task/',
>>>>>>> 865177c5e7af4b5c3e0677905388028b616f4b9f
	// withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken'); // or 'refresh_token'
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
