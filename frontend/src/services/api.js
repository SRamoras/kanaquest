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

// **Interceptor para capturar 401 e redirecionar ao login**
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Remove o token expirado
      localStorage.removeItem('token');
      // Redireciona para a página de login
      // Usamos location para forçar um reload completo e resetar todos os estados
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
