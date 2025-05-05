// src/services/api/config.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // ou '/api' si proxy Vite
});

// Ajoute automatiquement le token JWT dans les headers
api.interceptors.request.use((config) => {
  // Ne pas ajouter de token pour l'URL de login
  if (config.url.includes('/utilisateurs/login')) {
    return config;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
