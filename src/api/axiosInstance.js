// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://192.168.8.184/cashtradeproApi/api/task/',
	// baseURL: 'http://192.168.89.134/backend/api/task/',
	// withCredentials: true,
});

export default axiosInstance;
