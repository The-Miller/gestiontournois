import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import CommunityManager from '../CommunityManager/CommunityManagerDashboard';
import SuperAdminDashboard from '../SuperAdmin/SuperAdminDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  switch (user.role) {
    case 'ADMINISTRATEUR':
      return <AdminDashboard />;
    case 'COMMUNITY_MANAGER':
      return <CommunityManager />;
    case 'UTILISATEUR':
        return <SuperAdminDashboard />;
    default:
      return <div>Tableau de bord Utilisateur (à implémenter)</div>;
  }
};

export default Dashboard;