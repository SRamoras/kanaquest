// src/services/api.js
import axios from 'axios';

// Cria instância do Axios usando variável de ambiente:
// - VITE_API_URL é definida em frontend/.env.local ou no painel Vercel
// - Em fallback (por exemplo, se não estiver definida), usa '/api' (bom se usar proxy)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  // withCredentials: true, // use se precisar enviar cookies
});

// Interceptor para adicionar token (se usar autenticação via Bearer token)
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

// Interceptor para capturar 401 e redirecionar ao login
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
