import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// Gestion du token d'authentification
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// Intercepteur pour gérer les erreurs 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = '/connexion?session=expired';
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/utilisateurs/login", { email, password });
    
    if (response.data) {
      setAuthToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
    throw new Error("Authentication failed");
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/api/utilisateurs/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = async () => {
  try {
    await api.post("/api/utilisateurs/logout");
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
  } finally {
    setAuthToken(null);
    localStorage.removeItem("user");
    window.location.href = '/connexion'; // Redirection immédiate
  }
};

// ==================== Équipes ====================

export const getAllEquipes = async () => {
  const response = await api.get("/api/teams");
  return response.data;
};

export const getEquipeById = async (id) => {
  const response = await api.get(`/api/teams/${id}`);
  return response.data;
};

export const createEquipe = async (equipeData) => {
  const response = await api.post("/api/teams", equipeData);
  return response.data;
};

export const updateEquipe = async (id, equipeData) => {
  const response = await api.put(`/api/teams/${id}`, equipeData);
  return response.data;
};

export const deleteEquipe = async (id) => {
  await api.delete(`/api/teams/${id}`);
};

// ==================== Membres ====================

export const getTeamMembers = async (teamId) => {
  const response = await api.get(`/api/teams/${teamId}/members`);
  return response.data;
};

export const addMemberToTeam = async (teamId, memberData) => {
  const response = await api.post(`/api/teams/${teamId}/members`, memberData);
  return response.data;
};

export const updateTeamMember = async (teamId, memberId, memberData) => {
  const response = await api.put(`/api/teams/${teamId}/members/${memberId}`, memberData);
  return response.data;
};

export const deleteTeamMember = async (teamId, memberId) => {
  await api.delete(`/api/teams/${teamId}/members/${memberId}`);
};

// ==================== Matchs ====================

export const getAllMatches = async () => {
  const response = await api.get("/api/matches");
  return response.data;
};

export const getMatchById = async (id) => {
  const response = await api.get(`/api/matches/${id}`);
  return response.data;
};

export const createMatch = async (matchData) => {
  const response = await api.post("/api/matches", matchData);
  return response.data;
};

export const updateMatch = async (id, matchData) => {
  const response = await api.put(`/api/matches/${id}`, matchData);
  return response.data;
};

export const deleteMatch = async (id) => {
  await api.delete(`/api/matches/${id}`);
};

// ==================== Membres (indépendants) ====================

export const getMembresByEquipe = async (equipeId) => {
  const response = await api.get(`/api/membres/equipe/${equipeId}`);
  return response.data;
};

export const createMembre = async (membreData) => {
  const response = await api.post("/api/membres", membreData);
  return response.data;
};

export const updateMembre = async (id, membreData) => {
  const response = await api.put(`/api/membres/${id}`, membreData);
  return response.data;
};

export const deleteMembre = async (id) => {
  await api.delete(`/api/membres/${id}`);
};

// ==================== Paiements ====================

export const createPaiement = async (paiementData) => {
  const response = await api.post("/api/paiements", paiementData);
  return response.data;
};

export const updatePaiementStatus = async (id, statut) => {
  const response = await api.put(`/api/paiements/${id}/status?statut=${encodeURIComponent(statut)}`);
  return response.data;
};

export const getQRCodeForReservation = async (reservationId) => {
  const response = await api.get(`/api/paiements/${reservationId}/qrcode`);
  return response.data;
};

// ==================== Posts ====================

export const createPost = async (formData) => {
  const response = await api.post("/api/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updatePost = async (id, formData) => {
  const response = await api.put(`/api/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getAllPosts = async () => {
  const response = await api.get("/api/posts");
  return response.data;
};

export const likePost = async (id) => {
  const response = await api.post(`/api/posts/${id}/like`);
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/api/posts/${id}`);
};

// ==================== Commentaires ====================

export const addComment = async (postId, commentData) => {
  const response = await api.post(`/api/posts/${postId}/comments`, commentData);
  return response.data;
};

export const getCommentsByPostId = async (postId) => {
  const response = await api.get(`/api/posts/${postId}/comments`);
  return response.data;
};

// ==================== Prédictions ====================

export const createPrediction = async (predictionData) => {
  const response = await api.post("/api/predictions", predictionData);
  return response.data;
};

export const getAllPredictions = async () => {
  const response = await api.get("/api/predictions");
  return response.data;
};

// ==================== Pronostics ====================

export const createPronostic = async (pronosticData) => {
  const response = await api.post("/api/pronostics", pronosticData);
  return response.data;
};

export const getAllPronostics = async () => {
  const response = await api.get("/api/pronostics");
  return response.data;
};

export const getPronosticById = async (id) => {
  const response = await api.get(`/api/pronostics/${id}`);
  return response.data;
};

export const updatePronostic = async (id, pronosticData) => {
  const response = await api.put(`/api/pronostics/${id}`, pronosticData);
  return response.data;
};

export const deletePronostic = async (id) => {
  await api.delete(`/api/pronostics/${id}`);
};

// ==================== Réservations ====================

export const createReservation = async (reservationData) => {
  const response = await api.post("/api/reservations", reservationData);
  return response.data;
};

export const getAllReservations = async () => {
  const response = await api.get("/api/reservations");
  return response.data;
};

export const getReservationById = async (id) => {
  const response = await api.get(`/api/reservations/${id}`);
  return response.data;
};

export const updateReservation = async (id, reservationData) => {
  const response = await api.put(`/api/reservations/${id}`, reservationData);
  return response.data;
};

export const deleteReservation = async (id) => {
  await api.delete(`/api/reservations/${id}`);
};

// ==================== Réseau Social ====================

export const createSocialPost = async (postData) => {
  const response = await api.post("/api/social/posts", postData);
  return response.data;
};

export const getAllSocialPosts = async () => {
  const response = await api.get("/api/social/posts");
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await api.post("/api/social/comments", commentData);
  return response.data;
};

export const addLike = async (likeData) => {
  const response = await api.post("/api/social/likes", likeData);
  return response.data;
};

// ==================== Tournaments ====================

export const getAllTournaments = async () => {
  const response = await api.get("/api/tournaments");
  return response.data;
};

export const getTournamentById = async (id) => {
  const response = await api.get(`/api/tournaments/${id}`);
  return response.data;
};

export const createTournament = async (tournamentData) => {
  const response = await api.post("/api/tournaments", tournamentData);
  return response.data;
};

export const updateTournament = async (id, tournamentData) => {
  const response = await api.put(`/api/tournaments/${id}`, tournamentData);
  return response.data;
};

export const deleteTournament = async (id) => {
  await api.delete(`/api/tournaments/${id}`);
};

// ==================== Utilisateurs ====================

export const fetchAllUtilisateurs = async () => {
  const response = await api.get("/api/utilisateurs");
  return response.data;
};

export const fetchUtilisateurById = async (id) => {
  const response = await api.get(`/api/utilisateurs/${id}`);
  return response.data;
};

export const updateUtilisateur = async (id, utilisateurData) => {
  const response = await api.put(`/api/utilisateurs/${id}`, utilisateurData);
  return response.data;
};

export const deleteUtilisateur = async (id) => {
  await api.delete(`/api/utilisateurs/${id}`);
};

export const createUtilisateurWithRole = async (userData) => {
  const response = await api.post("/api/utilisateurs/create-with-role", userData);
  return response.data;
};

// ==================== Users ====================

export const getAllUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/api/users", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/api/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/api/users/${id}`);
};

// Initialisation
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export default api;