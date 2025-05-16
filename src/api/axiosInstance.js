// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com/api', // replace with your actual backend
  withCredentials: true,
});

export default axiosInstance;
