import api from "./config";

export const createPaiement = async (paiement) => {
  const response = await api.post("/api/paiements", paiement);
  return response.data;
};

export const updatePaiementStatus = async (id, statut) => {
  const response = await api.put(`/api/paiements/${id}/status`, null, {
    params: { statut },
  });
  return response.data;
};

export const generateQRCode = async (reservationId) => {
  const response = await api.get(`/api/paiements/${reservationId}/qrcode`);
  return response.data;
};
