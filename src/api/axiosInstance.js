// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.8.184/cashtradeproApi/api/task/',
  withCredentials: true,
});

export default axiosInstance;
