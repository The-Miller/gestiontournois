import api from "./config";

export const login = async (email, password) => {
  const response = await api.post("/api/utilisateurs/login", { email, password });
  const data = response.data;
  if (data?.token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

export const register = async (userData) => {
  const response = await api.post("/api/utilisateurs/register", userData);
  return response.data;
};

export const logout = async () => {
  await api.post("/api/utilisateurs/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  delete api.defaults.headers.common["Authorization"];
  window.location.href = "/connexion";
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
