import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import CommunityManager from '../CommunityManager/CommunityManagerDashboard';
import GerantDashboard from '../Gerant/GerantDashboard';

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
    case 'GERANT':
        return <GerantDashboard />;
    default:
      return <div>Ce role n'esxite pas</div>;
  }
};

export default Dashboard;