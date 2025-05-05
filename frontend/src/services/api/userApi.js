import axios from 'axios';

const API_URL = '/api/users';

// Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

// Récupérer utilisateur par Id
export const getUserById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Créer un utilisateur
export const createUser = async (userData) => {
  const response = await api.post(API_URL, userData);
  return response.data;
};

// Modifier un utilisateur
export const updateUser = async (id, userData) => {
  const response = await api.put(`${API_URL}/${id}`, userData);
  return response.data;
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  };
  


