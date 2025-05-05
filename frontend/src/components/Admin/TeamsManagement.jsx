import React, { useEffect, useState } from 'react';
import { getAllTeams, deleteTeam } from '../../services/api/teamApi';
import Sidebar from '../Sidebar/Sidebar';
import './TeamsManagement.css';

const TeamsManagement = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllTeams();
        if (Array.isArray(response)) {
          setTeams(response);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau:', response);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTeam(id);
      setTeams(teams.filter(team => team.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'équipe:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Gestion des Équipes</h2>
        {loading ? (
          <p>Chargement des équipes...</p>
        ) : (
          <div className="teams-list">
            <table>
              <thead>
                <tr>
                  <th>Nom de l'équipe</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => (
                  <tr key={team.id}>
                    <td>{team.nom}</td>
                    <td>
                      <button>Modifier</button>
                      <button onClick={() => handleDelete(team.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button>Ajouter une nouvelle équipe</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamsManagement;
