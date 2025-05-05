// src/services/api/tournamentApi.js
import api from './config'; // Assure-toi que le chemin est correct selon ton projet

// Récupérer tous les tournois
export const getAllTournaments = async () => {
  const response = await api.get('/api/tournaments');
  return response.data;
};

// Récupérer un tournoi par ID
export const getTournamentById = async (id) => {
  const response = await api.get(`/api/tournaments/${id}`);
  return response.data;
};

// Créer un nouveau tournoi
export const createTournament = async (tournamentData) => {
  const response = await api.post('/api/tournaments', tournamentData);
  return response.data;
};

// Modifier un nouveau tournoi
export const updateTournament = async (id, tournamentData) => {
  const response = await api.put(`/api/tournaments/${id}`, tournamentData);
  return response.data;
};

// Supprimer un tournoi
export const deleteTournament = async (id) => {
  await api.delete(`/api/tournaments/${id}`);
};
