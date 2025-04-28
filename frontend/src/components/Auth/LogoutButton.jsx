import React from 'react';
import { logout } from '../../services/api';

const LogoutButton = ({ className = "", onLogout = () => {} }) => {
  const handleClick = async () => {
    try {
      await logout();
      onLogout(); // Callback optionnel
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className={`btn-logout ${className}`}
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;