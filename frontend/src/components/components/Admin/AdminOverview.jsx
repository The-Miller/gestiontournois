import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { getAllTournaments } from '../../services/api/tournamentApi';
import { getAllEquipes } from '../../services/api/teamApi';
import { getAllUsers } from '../../services/api/userApi';
import { getAllReservations } from '../../services/api/reservationApi';
import './AdminOverview.css';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    tournaments: 0,
    teams: 0,
    users: 0,
    reservations: 0,
  });
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const [tournaments, teams, users, reservations] = await Promise.all([
        getAllTournaments(),
        getAllEquipes(),
        getAllUsers(),
        getAllReservations(),
      ]);

      setStats({
        tournaments: tournaments.length,
        teams: teams.length,
        users: users.length,
        reservations: reservations.length,
      });
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des statistiques :', err);
      setError('Impossible de charger les statistiques. Veuillez vérifier votre connexion ou réessayer plus tard.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-overview">
      <Sidebar />
      <main className="content">
        <h1>Vue d'ensemble</h1>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Tournois</h3>
              <p>{stats.tournaments}</p>
            </div>
            <div className="stat-card">
              <h3>Équipes</h3>
              <p>{stats.teams}</p>
            </div>
            <div className="stat-card">
              <h3>Utilisateurs</h3>
              <p>{stats.users}</p>
            </div>
            <div className="stat-card">
              <h3>Réservations</h3>
              <p>{stats.reservations}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOverview;