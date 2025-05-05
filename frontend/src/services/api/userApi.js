import api from './config';

// Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  try {
    console.log('Récupération de tous les utilisateurs...');
    const response = await api.get('/api/utilisateurs');
    console.log('Réponse des utilisateurs :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error.response?.data || error.message);
    throw error;
  }
};

// Récupérer un utilisateur par ID

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/api/utilisateurs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message);
    throw error;
  }
};


// Créer un utilisateur
export const createUser = async (userData) => {
  try {
    const response = await api.post('/api/users', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    throw error;
  }
};

// Modifier un utilisateur
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur ${id} :`, error);
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    await api.delete(`/api/users/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur ${id} :`, error);
    throw error;
  }
};