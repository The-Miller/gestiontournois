import api from "./config";

export const getAllUtilisateurs = async () => {
  const response = await api.get("/api/utilisateurs");
  return response.data;
};

export const getUtilisateurById = async (id) => {
  const response = await api.get(`/api/utilisateurs/${id}`);
  return response.data;
};

export const updateUtilisateur = async (id, data) => {
  const response = await api.put(`/api/utilisateurs/${id}`, data);
  return response.data;
};

export const deleteUtilisateur = async (id) => {
  await api.delete(`/api/utilisateurs/${id}`);
};

export const createUtilisateurWithRole = async (data) => {
  const response = await api.post("/api/utilisateurs/create-with-role", data);
  return response.data;
};
