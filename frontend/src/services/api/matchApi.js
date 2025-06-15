import api from "./config";

// Récupérer tous les matchs
export const getAllMatches = async () => {
  const response = await api.get(`/api/matches`);
  return response.data.map(match => ({
    id: match.id,
    tournoiId: match.tournoi_id,
    equipeaId: match.equipea_id,
    equipebId: match.equipeb_id,
    date: match.date,
    scorea: match.scorea,
    scoreb: match.scoreb,
    statut: match.statut,
  }));
};

// Récupérer un match par son id
export const getMatchById = async (id) => {
  const response = await api.get(`/api/matches/${id}`); // Correction de l'URL
  const match = response.data;
  return {
    id: match.id,
    tournoiId: match.tournoi_id,
    equipeaId: match.equipea_id,
    equipebId: match.equipeb_id,
    date: match.date,
    scorea: match.scorea,
    scoreb: match.scoreb,
    statut: match.statut,
  };
};

// Créer un match
export const createMatch = async (data) => {
  const response = await api.post(`/api/matches`, {
    tournoi_id: data.tournoiId,
    equipea_id: data.equipeaId,
    equipeb_id: data.equipebId,
    date: data.date.split('T')[0], // Extraire uniquement YYYY-MM-DD
    scorea: data.scorea || 0,
    scoreb: data.scoreb || 0,
    statut: data.statut || 'SCHEDULED',
  });
  return {
    id: response.data.id,
    tournoiId: response.data.tournoi_id,
    equipeaId: response.data.equipea_id,
    equipebId: response.data.equipeb_id,
    date: response.data.date,
    scorea: response.data.scorea,
    scoreb: response.data.scoreb,
    statut: response.data.statut,
  };
};

// Modifier un match
export const updateMatch = async (id, data) => {
  const response = await api.put(`/api/matches/${id}`, { // Correction de l'URL
    tournoi_id: data.tournoiId,
    equipea_id: data.equipeaId,
    equipeb_id: data.equipebId,
    date: data.date.split('T')[0], // Extraire uniquement YYYY-MM-DD
    scorea: data.scorea || 0,
    scoreb: data.scoreb || 0,
    statut: data.statut || 'SCHEDULED',
  });
  return {
    id: response.data.id,
    tournoiId: response.data.tournoi_id,
    equipeaId: response.data.equipea_id,
    equipebId: response.data.equipeb_id,
    date: response.data.date,
    scorea: response.data.scorea,
    scoreb: response.data.scoreb,
    statut: response.data.statut,
  };
};

// Supprimer un match
export const deleteMatch = async (id) => {
  await api.delete(`/api/matches/${id}`); // Correction de l'URL
};