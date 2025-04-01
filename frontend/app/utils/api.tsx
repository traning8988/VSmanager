import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
// リクエスト時にJWTを自動で設定
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt-token');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);
export default api;