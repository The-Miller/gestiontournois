import React, { createContext, useState, useEffect } from 'react';

// Créer un contexte Auth
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Charger l'utilisateur du localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Charger l'utilisateur dans le state si trouvé
    }
  }, []);

  // Fonction pour mettre à jour l'utilisateur
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Sauvegarder dans localStorage
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
