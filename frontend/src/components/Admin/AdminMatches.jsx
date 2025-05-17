import React, { useEffect, useState } from 'react';
import { getAllMatches, createMatch, updateMatch, deleteMatch } from '../../services/api/matchApi';
import { getAllEquipes } from '../../services/api/teamApi';
import { getAllTournaments } from '../../services/api/tournamentApi';
import Sidebar from '../Sidebar/Sidebar';

const AdminMatches = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    equipeAId: '',
    equipeBId: '',
    scoreA: '',
    scoreB: '',
    date: '',
    tournoiId: '',
    statut: 'Planifié',
    lieu: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const [matchesRes, teamsRes, tournamentsRes] = await Promise.all([
          getAllMatches(),
          getAllEquipes(),
          getAllTournaments(),
        ]);
        matchesRes.forEach(match => console.log('Match lieu:', match.lieu));
        console.log('Matches received:', JSON.stringify(matchesRes, null, 2));
        console.log('Teams:', JSON.stringify(teamsRes, null, 2));
        console.log('Tournaments:', JSON.stringify(tournamentsRes, null, 2));
        setMatches(matchesRes || []);
        setTeams(teamsRes || []);
        setTournaments(tournamentsRes || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors du chargement des données: ' + error.message);
      } finally {
        setLoading(false);
        console.log('Loading set to false');
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'equipeAId' || name === 'equipeBId') {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.equipeAId === formData.equipeBId) {
      setError('Les deux équipes doivent être différentes.');
      return;
    }
    try {
      const matchData = {
        equipeA: { id: parseInt(formData.equipeAId) },
        equipeB: { id: parseInt(formData.equipeBId) },
        scoreA: formData.scoreA ? parseInt(formData.scoreA) : null,
        scoreB: formData.scoreB ? parseInt(formData.scoreB) : null,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        tournoi: { id: parseInt(formData.tournoiId) },
        statut: formData.statut,
        lieu: formData.lieu || null,
      };
      if (editingId) {
        await updateMatch(editingId, matchData);
        setMatches(matches.map((m) => (m.id === editingId ? { ...m, ...matchData } : m)));
        setEditingId(null);
      } else {
        const newMatch = await createMatch(matchData);
        setMatches([...matches, newMatch]);
      }
      setFormData({
        equipeAId: '',
        equipeBId: '',
        scoreA: '',
        scoreB: '',
        date: '',
        tournoiId: '',
        statut: 'Planifié',
        lieu: '',
      });
      setError('');
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du match:', error);
      setError('Erreur lors de l’enregistrement du match: ' + error.message);
    }
  };

  const handleEdit = (match) => {
    setFormData({
      equipeAId: match.equipeA.id.toString(),
      equipeBId: match.equipeB.id.toString(),
      scoreA: match.scoreA !== null ? match.scoreA.toString() : '',
      scoreB: match.scoreB !== null ? match.scoreB.toString() : '',
      date: match.date ? new Date(match.date).toISOString().slice(0, 16) : '',
      tournoiId: match.tournoi.id.toString(),
      statut: match.statut,
      lieu: match.lieu || '',
    });
    setEditingId(match.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMatch(id);
      setMatches(matches.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du match:', error);
      setError('Erreur lors de la suppression du match: ' + error.message);
    }
  };

  console.log('Rendering with matches:', matches);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Matchs & Résultats</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="match-form">
          <div>
            <label>Équipe A</label>
            <select
              name="equipeAId"
              value={formData.equipeAId}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner une équipe</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Équipe B</label>
            <select
              name="equipeBId"
              value={formData.equipeBId}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner une équipe</option>
              {teams
                .filter((team) => team.id !== parseInt(formData.equipeAId))
                .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.nom}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>Score A</label>
            <input
              type="number"
              name="scoreA"
              value={formData.scoreA}
              onChange={handleInputChange}
              placeholder="Score Équipe A"
              min="0"
            />
          </div>
          <div>
            <label>Score B</label>
            <input
              type="number"
              name="scoreB"
              value={formData.scoreB}
              onChange={handleInputChange}
              placeholder="Score Équipe B"
              min="0"
            />
          </div>
          <div>
            <label>Date et Heure</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Tournoi</label>
            <select
              name="tournoiId"
              value={formData.tournoiId}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner un tournoi</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Statut</label>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleInputChange}
            >
              <option value="Planifié">Planifié</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
          <div>
            <label>Lieu</label>
            <input
              type="text"
              name="lieu"
              value={formData.lieu}
              onChange={handleInputChange}
              placeholder="Lieu du match"
            />
          </div>
          <button type="submit">
            {editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </form>
        {loading ? (
          <p className="loading-message">Chargement des matchs...</p>
        ) : (
          <div className="matches-list">
            {matches.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Équipe A</th>
                    <th>Équipe B</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Tournoi</th>
                    <th>Statut</th>
                    <th>Lieu</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr key={match.id}>
                      <td>{match.equipeA ? match.equipeA.nom : match.equipeA_id || 'N/A'}</td>
                      <td>{match.equipeB ? match.equipeB.nom : match.equipeB_id || 'N/A'}</td>
                      <td>
                        {match.scoreA !== null && match.scoreB !== null
                          ? `${match.scoreA} - ${match.scoreB}`
                          : 'N/A'}
                      </td>
                      <td>
                        {match.date ? new Date(match.date).toLocaleString() : 'N/A'}
                      </td>
                      <td>{match.tournoi ? match.tournoi.nom : match.tournoi_id || 'N/A'}</td>
                      <td>{match.statut || 'N/A'}</td>
                      <td>{match.lieu || 'N/A'}</td>
                      <td>
                        <button onClick={() => handleEdit(match)}>
                          Modifier
                        </button>
                        <button onClick={() => handleDelete(match.id)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-matches">Aucun match disponible.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminMatches;