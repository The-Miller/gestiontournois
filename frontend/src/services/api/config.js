import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Nécessaire pour envoyer les cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur lors de la requête :', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.error('Erreur 401 : Session invalide ou expirée');
    }
    return Promise.reject(error);
  }
);

export default api;