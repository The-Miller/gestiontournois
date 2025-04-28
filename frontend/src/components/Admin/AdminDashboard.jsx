import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'Administrateur') {
      navigate('/connexion');
      return;
    }

    // Simuler le chargement des tournois
    const fetchTournaments = async () => {
      try {
        // Ici vous feriez un appel API réel
        const mockTournaments = [
          { id: 1, nom: 'Tournoi Université', categorie: 'Football', date: '2023-10-15' },
          { id: 2, nom: 'Championnat Interne', categorie: 'Basketball', date: '2023-11-20' }
        ];
        setTournaments(mockTournaments);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [navigate, user]);

  const handleLogout = async () => {
    await logout();
    navigate('/connexion');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-container">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li><Link to="/admin/tournaments"><i className="fa fa-trophy"></i> Gestion des Tournois</Link></li>
            <li><Link to="/admin/teams"><i className="fa fa-users"></i> Gestion des Équipes</Link></li>
            <li><Link to="/admin/matches"><i className="fa fa-life-ring"></i> Matchs & Résultats</Link></li>
            <li><button onClick={handleLogout} className="logout-btn"><i className="fa fa-sign-out"></i> Déconnexion</button></li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <div className="tournaments-management">
          <h2>Gestion des Tournois</h2>
          
          {loading ? (
            <p>Chargement en cours...</p>
          ) : (
            <>
              <table className="tournaments-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nom Tournoi</th>
                    <th>Catégorie</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tournaments.map(tournament => (
                    <tr key={tournament.id}>
                      <td>{tournament.id}</td>
                      <td>{tournament.nom}</td>
                      <td>{tournament.categorie}</td>
                      <td>{tournament.date}</td>
                      <td>
                        <button className="btn btn-primary">Modifier</button>
                        <button className="btn btn-danger">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-primary" onClick={() => navigate('/admin/tournaments/new')}>
                Créer un nouveau Tournoi
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;