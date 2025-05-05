import React, { useEffect, useState } from 'react';
import { getAllEquipes, createEquipe, updateEquipe, deleteEquipe, getTeamMembers, getAllTournaments, addMemberToTeam, updateTeamMember, deleteTeamMember } from '../../services/api/teamApi';
import Sidebar from '../Sidebar/Sidebar';
import './AdminTeams.css';

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nom: '', categorie: '', tournoiId: '' });
  const [editingId, setEditingId] = useState(null);
  const [members, setMembers] = useState({});
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [error, setError] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [memberForm, setMemberForm] = useState({ nom: '', prenom: '' });
  const [editingMemberId, setEditingMemberId] = useState(null);

  useEffect(() => {
    const fetchTeamsAndTournaments = async () => {
      try {
        const [teamsResponse, tournamentsResponse] = await Promise.all([
          getAllEquipes(),
          getAllTournaments()
        ]);
        setTeams(teamsResponse);
        setTournaments(tournamentsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Erreur lors du chargement des données. Vérifiez votre connexion ou réessayez.');
      } finally {
        setLoading(false);
      }
    };
    fetchTeamsAndTournaments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberInputChange = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamData = {
        nom: formData.nom,
        categorie: formData.categorie,
        tournoi: { id: formData.tournoiId },
      };
      if (editingId) {
        await updateEquipe(editingId, teamData);
        setTeams(teams.map(t => t.id === editingId ? { ...t, ...teamData } : t));
        setEditingId(null);
      } else {
        const newTeam = await createEquipe(teamData);
        setTeams([...teams, newTeam]);
      }
      setFormData({ nom: '', categorie: '', tournoiId: '' });
      setError(null);
    } catch (error) {
      console.error('Error saving team:', error);
      setError('Erreur lors de la sauvegarde. Vérifiez les champs ou réessayez.');
    }
  };

  const handleEdit = (team) => {
    setFormData({
      nom: team.nom,
      categorie: team.categorie,
      tournoiId: team.tournoi?.id || '',
    });
    setEditingId(team.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEquipe(id);
      setTeams(teams.filter(t => t.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting team:', error);
      setError('Erreur lors de la suppression. Réessayez.');
    }
  };

  const handleViewMembers = async (teamId) => {
    try {
      const response = await getTeamMembers(teamId);
      setMembers({ ...members, [teamId]: response });
      setSelectedTeamId(teamId);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Erreur lors du chargement des membres.');
    }
  };

  const handleAddOrUpdateMember = async (e) => {
    e.preventDefault();
    try {
      if (!selectedTeamId) {
        setError('Sélectionnez une équipe avant d’ajouter ou de modifier un membre.');
        return;
      }
      if (editingMemberId) {
        await updateTeamMember(selectedTeamId, editingMemberId, memberForm);
        setMembers({
          ...members,
          [selectedTeamId]: members[selectedTeamId].map(m =>
            m.id === editingMemberId ? { ...m, ...memberForm } : m
          ),
        });
        setEditingMemberId(null);
      } else {
        const newMember = await addMemberToTeam(selectedTeamId, memberForm);
        setMembers({
          ...members,
          [selectedTeamId]: [...(members[selectedTeamId] || []), newMember],
        });
      }
      setMemberForm({ nom: '', prenom: '' });
      setError(null);
    } catch (error) {
      console.error('Error saving member:', error);
      setError('Erreur lors de la sauvegarde du membre. Réessayez.');
    }
  };

  const handleEditMember = (member) => {
    setMemberForm({ nom: member.nom, prenom: member.prenom });
    setEditingMemberId(member.id);
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await deleteTeamMember(selectedTeamId, memberId);
      setMembers({
        ...members,
        [selectedTeamId]: members[selectedTeamId].filter(m => m.id !== memberId),
      });
      setError(null);
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Erreur lors de la suppression du membre. Réessayez.');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Gestion des Équipes</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="team-form">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            placeholder="Nom de l'équipe"
            required
          />
          <input
            type="text"
            name="categorie"
            value={formData.categorie}
            onChange={handleInputChange}
            placeholder="Catégorie"
            required
          />
          <select
            name="tournoiId"
            value={formData.tournoiId}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionner un tournoi</option>
            {tournaments.map(t => (
              <option key={t.id} value={t.id}>{t.nom}</option>
            ))}
          </select>
          <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ nom: '', categorie: '', tournoiId: '' }); }}>Annuler</button>}
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
                    <th>Catégorie</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(team => (
                    <tr key={team.id}>
                      <td>{team.nom}</td>
                      <td>{team.categorie}</td>
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
            {selectedTeamId && (
              <div className="members-section">
                <h3>Membres de l'équipe</h3>
                <form onSubmit={handleAddOrUpdateMember} className="member-form">
                  <input
                    type="text"
                    name="nom"
                    value={memberForm.nom}
                    onChange={handleMemberInputChange}
                    placeholder="Nom du membre"
                    required
                  />
                  <input
                    type="text"
                    name="prenom"
                    value={memberForm.prenom}
                    onChange={handleMemberInputChange}
                    placeholder="Prénom du membre"
                    required
                  />
                  <button type="submit">{editingMemberId ? 'Mettre à jour' : 'Ajouter Membre'}</button>
                  {editingMemberId && <button type="button" onClick={() => { setEditingMemberId(null); setMemberForm({ nom: '', prenom: '' }); }}>Annuler</button>}
                </form>
                {members[selectedTeamId] && members[selectedTeamId].length > 0 ? (
                  <ul>
                    {members[selectedTeamId].map(member => (
                      <li key={member.id}>
                        {member.nom} {member.prenom}
                        <button onClick={() => handleEditMember(member)}>Modifier</button>
                        <button onClick={() => handleDeleteMember(member.id)}>Supprimer</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Aucun membre trouvé.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminTeams;