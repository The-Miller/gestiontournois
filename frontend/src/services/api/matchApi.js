import axios from 'axios';

const API_URL = '/api/matches';

// Récupérer tous les matchs
export const getAllMatches = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

// Récupérer un match par son id
export const getMatchById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Créer un match
export const createMatch = async (data) => {
  const response = await api.post(API_URL, data);
  return response.data;
};

// Modifier un match
export const updateMatch = async (id, data) => {
  const response = await api.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Supprimer un match
export const deleteMatch = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  };;