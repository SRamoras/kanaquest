// src/services/api.js
import axios from 'axios';

// Usa variável de ambiente VITE_API_URL, definida em .env para dev e em Vercel para prod
const api = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_API_URL        // → http://localhost:5000/api em dev
    : '/api'                              // → chama https://kanaquest-tau.vercel.app/api em prod
});

// Adiciona token de autorização, se existir
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Captura 401 e redireciona para login
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

