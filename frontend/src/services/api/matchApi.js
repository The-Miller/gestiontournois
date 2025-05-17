import api from './config'; // Assure-toi que le chemin est correct selon ton projet


// Récupérer tous les matchs
export const getAllMatches = async () => {
  const response = await api.get('/api/matches');
  return response.data;
};

// Récupérer un match par son id
export const getMatchById = async (id) => {
  const response = await api.get(`/api/matches/${id}`);
  return response.data;
};

// Créer un match
export const createMatch = async (data) => {
  const response = await api.post('/api/matches', data);
  return response.data;
};

// Modifier un match
export const updateMatch = async (id, data) => {
  const response = await api.put(`/api/matches/${id}`, data);
  return response.data;
};

// Supprimer un match
export const deleteMatch = async (id) => {
  const response = await api.delete(`/api/matches/${id}`);
  return response.data;
};;