import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエスト時にトークンを付与
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  console.log('ローカルストレージ:', { accessToken, client, uid });
  
  if (accessToken && client && uid) {
    config.headers['access-token'] = accessToken;
    config.headers['client'] = client;
    config.headers['uid'] = uid;
  }
  console.log('リクエストヘッダー:', config.headers);
  return config;
});

export default api;