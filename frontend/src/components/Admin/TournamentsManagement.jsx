import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTournaments, deleteTournament } from '../../services/api/tournamentApi';
import Sidebar from '../Sidebar/Sidebar';
import './TournamentsManagement.css';

const TournamentsManagement = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getAllTournaments();
        if (Array.isArray(response)) {
          setTournaments(response);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau:', response);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des tournois:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTournament(id);
      setTournaments(tournaments.filter(tournament => tournament.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du tournoi:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Gestion des Tournois</h2>
        {loading ? (
          <p>Chargement des tournois...</p>
        ) : (
          <div className="tournaments-list">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map(tournament => (
                  <tr key={tournament.id}>
                    <td>{tournament.nom}</td>
                    <td>{tournament.categorie}</td>
                    <td>{tournament.date}</td>
                    <td>
                      <button onClick={() => navigate(`/admin/tournaments/edit/${tournament.id}`)}>Modifier</button>
                      <button onClick={() => handleDelete(tournament.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => navigate('/admin/tournaments/new')}>Créer un nouveau tournoi</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TournamentsManagement;
