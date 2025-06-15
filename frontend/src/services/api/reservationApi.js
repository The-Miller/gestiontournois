import api from "./config";

export const getAllReservations = async () => {
  const response = await api.get("/api/reservations");
  return response.data;
};

export const getReservationById = async (id) => {
  const response = await api.get(`/api/reservations/${id}`);
  return response.data;
};

export const createReservation = async (data) => {
  const response = await api.post("/api/reservations", data);
  return response.data;
};

export const updateReservation = async (id, data) => {
  const response = await api.put(`/api/reservations/${id}`, data);
  return response.data;
};

export const deleteReservation = async (id) => {
  await api.delete(`/api/reservations/${id}`);
};
