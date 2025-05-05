import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTournaments, deleteTournament } from '../../services/api/tournamentApi';
import Sidebar from '../Sidebar/Sidebar';
import './AdminTournaments.css';

const AdminTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getAllTournaments(); // Appel API
        setTournaments(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des tournois', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTournament(id); // Appel API
      setTournaments(tournaments.filter(tournament => tournament.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du tournoi', error);
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
                      <button className="btn btn-primary" onClick={() => navigate(`/admin/tournaments/edit/${tournament.id}`)}>Modifier</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(tournament.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={() => navigate('/admin/tournaments/new')}>
              Créer un Nouveau Tournoi
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminTournaments;
