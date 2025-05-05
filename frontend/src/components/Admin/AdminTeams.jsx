import React, { useEffect, useState } from 'react';
import { getAllEquipes, createEquipe, updateEquipe, deleteEquipe, getTeamMembers } from '../../services/api/teamApi';
import Sidebar from '../Sidebar/Sidebar';
import './AdminTeams.css';

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nom: '' });
  const [editingId, setEditingId] = useState(null);
  const [members, setMembers] = useState({});
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllEquipes();
        setTeams(response);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEquipe(editingId, formData);
        setTeams(teams.map(t => t.id === editingId ? { ...t, ...formData } : t));
        setEditingId(null);
      } else {
        const newTeam = await createEquipe(formData);
        setTeams([...teams, newTeam]);
      }
      setFormData({ nom: '' });
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  const handleEdit = (team) => {
    setFormData({ nom: team.nom });
    setEditingId(team.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEquipe(id);
      setTeams(teams.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const handleViewMembers = async (teamId) => {
    try {
      const response = await getTeamMembers(teamId);
      setMembers({ ...members, [teamId]: response });
      setSelectedTeamId(teamId);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Gestion des Équipes</h2>
        <form onSubmit={handleSubmit} className="team-form">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            placeholder="Nom de l'équipe"
            required
          />
          <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
        </form>
        {loading ? (
          <p>Chargement des équipes...</p>
        ) : (
          <div className="teams-list">
            {Array.isArray(teams) && teams.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(team => (
                    <tr key={team.id}>
                      <td>{team.nom}</td>
                      <td>
                        <button onClick={() => handleEdit(team)}>Modifier</button>
                        <button onClick={() => handleDelete(team.id)}>Supprimer</button>
                        <button onClick={() => handleViewMembers(team.id)}>Voir Membres</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucune équipe trouvée.</p>
            )}
            {selectedTeamId && members[selectedTeamId] && (
              <div className="members-list">
                <h3>Membres de l'équipe</h3>
                <ul>
                  {members[selectedTeamId].map(member => (
                    <li key={member.id}>{member.nom}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminTeams;