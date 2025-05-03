// src/services/api.js
import axios from 'axios';

// Ajuste a porta conforme seu backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor para adicionar token (se usar autenticação)
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default api;
