import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Sidebar from '../Sidebar/Sidebar';
import './CommunityManagerDashboard.css';

const CommunityManagerPosts = () => {
  // Vérification de l'utilisateur dans useEffect
  useEffect(() => {
    console.log('useEffect exécuté - User:', user);
    if (!user) {
      console.log('Redirection vers /connexion car aucun utilisateur');
      navigate('/connexion');
      return;
    }
    if (user.role !== 'COMMUNITY_MANAGER') {
      console.log('Redirection vers /dashboard car rôle invalide:', user.role);
      navigate('/dashboard');
      return;
    }
  }, [navigate, user]);

  // Ne rien afficher tant qu'on n'a pas confirmé le rôle
  if (!user || user.role !== 'COMMUNITY_MANAGER') return null;

  return (
    <div className="dashboard-community">
      <Sidebar />
      <p>Posts content</p>
    </div>
  );
};

export default CommunityManagerPosts;