import api from "./config";

export const createPrediction = async (prediction) => {
  const response = await api.post("/api/predictions", prediction);
  return response.data;
};

export const getAllPredictions = async () => {
  const response = await api.get("/api/predictions");
  return response.data;
};
