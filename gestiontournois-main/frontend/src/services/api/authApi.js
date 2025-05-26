import api from './config';

export const login = async (email, password) => {
  try {
    console.log('Données envoyées au login :', { email, password });
    const response = await api.post('/api/utilisateurs/login', { email, password });
    console.log('Réponse du serveur :', response.data);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    throw new Error('Échec de l\'authentification');
  } catch (error) {
    console.error('Erreur de connexion :', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/api/utilisateurs/register', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur d\'inscription :', error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Erreur de récupération de l\'utilisateur :', error.message);
    return null;
  }
};

export const logout = async () => {
  try {
    await api.post('/api/utilisateurs/logout');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Erreur de déconnexion :', error.response?.data || error.message);
    throw error;
  }
};