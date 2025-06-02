import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './GerantDashboard.css';

const GerantDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/gerant/overview', { replace: true });
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Tableau de bord</h1>
            <p className="header-description">Redirection vers l'aperçu...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GerantDashboard;
