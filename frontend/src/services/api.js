// // services/api.js
// import axios from "axios";

// const API_URL = "http://localhost:8080";

// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         "Content-Type": "application/json"
//     },
//     withCredentials: true // Add this if using cookies/sessions
// });

// // Fonction pour enregistrer le token dans le localStorage
// const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     localStorage.setItem("token", token);
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//     localStorage.removeItem("token");
//   }
// };

// export const login = async (email, password) => {
//     try {
//       const response = await api.post("/api/utilisateurs/login", {
//         email,
//         password
//       });
      
//       if (response.data) {
//         setAuthToken(response.data.token); // Si vous implémentez JWT plus tard
//         localStorage.setItem("user", JSON.stringify(response.data));
//         return response.data;
//       }
//       throw new Error("Authentication failed");
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       throw error;
//     }
//   };

  

// export const register = async (userData) => {
//   try {
//     const response = await api.post("/api/utilisateurs/register", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Registration error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const getCurrentUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };

// export const logout = () => {
//   setAuthToken(null);
//   localStorage.removeItem("user");
// };

// // Initialiser l'authentification si un token existe
// const token = localStorage.getItem("token");
// if (token) {
//   setAuthToken(token);
// }

// export default api;

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
      // Auto-déconnexion si non autorisé
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

// Initialisation
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export default api;