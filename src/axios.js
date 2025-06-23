import axios from 'axios';
import { getToken } from './utils/auth';

const api = axios.create({
  baseURL: 'https://bodo.nerpai.space/api',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;