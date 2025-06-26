// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: 'http://172.20.10.2/cashtradeproApi/api/task/',
<<<<<<< HEAD
	// baseURL: 'http://192.168.8.189/cashtradeproApi/api/task/',
	baseURL: 'http://192.168.1.117/backend/api/task/',
=======
	baseURL: 'http://192.168.8.189/cashtradeproApi/api/task/',
	// baseURL: 'http://192.168.43.134/backend/api/task/',
>>>>>>> bac2ce21253099c6b974c5753b1c33a0c174d09b
	// baseURL: 'https://api.cashtradepro.com/api/task/',
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
