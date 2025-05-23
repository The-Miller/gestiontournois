import api from "./config";

export const getAllPronostics = async () => {
  const response = await api.get("/api/pronostics");
  return response.data;
};

export const getPronosticById = async (id) => {
  const response = await api.get(`/api/pronostics/${id}`);
  return response.data;
};

export const createPronostic = async (data) => {
  const response = await api.post("/api/pronostics", data);
  return response.data;
};

export const updatePronostic = async (id, data) => {
  const response = await api.put(`/api/pronostics/${id}`, data);
  return response.data;
};

export const deletePronostic = async (id) => {
  await api.delete(`/api/pronostics/${id}`);
};
