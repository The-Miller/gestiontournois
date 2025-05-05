import React, { useEffect, useState } from 'react';
import { getAllMatches, createMatch, updateMatch, deleteMatch } from '../../services/api/matchApi';
import Sidebar from '../Sidebar/Sidebar';
import './AdminMatches.css';

const AdminMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ equipe1: '', equipe2: '', resultat: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getAllMatches();
        setMatches(response);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMatch(editingId, formData);
        setMatches(matches.map(m => m.id === editingId ? { ...m, ...formData } : m));
        setEditingId(null);
      } else {
        const newMatch = await createMatch(formData);
        setMatches([...matches, newMatch]);
      }
      setFormData({ equipe1: '', equipe2: '', resultat: '' });
    } catch (error) {
      console.error('Error saving match:', error);
    }
  };

  const handleEdit = (match) => {
    setFormData({ equipe1: match.equipe1, equipe2: match.equipe2, resultat: match.resultat });
    setEditingId(match.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMatch(id);
      setMatches(matches.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Matchs & Résultats</h2>
        <form onSubmit={handleSubmit} className="match-form">
          <input
            type="text"
            name="equipe1"
            value={formData.equipe1}
            onChange={handleInputChange}
            placeholder="Équipe 1"
            required
          />
          <input
            type="text"
            name="equipe2"
            value={formData.equipe2}
            onChange={handleInputChange}
            placeholder="Équipe 2"
            required
          />
          <input
            type="text"
            name="resultat"
            value={formData.resultat}
            onChange={handleInputChange}
            placeholder="Résultat"
          />
          <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
        </form>
        {loading ? (
          <p>Chargement des matchs...</p>
        ) : (
          <div className="matches-list">
            {Array.isArray(matches) && matches.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Équipe 1</th>
                    <th>Équipe 2</th>
                    <th>Résultat</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map(match => (
                    <tr key={match.id}>
                      <td>{match.equipe1}</td>
                      <td>{match.equipe2}</td>
                      <td>{match.resultat || 'N/A'}</td>
                      <td>
                        <button onClick={() => handleEdit(match)}>Modifier</button>
                        <button onClick={() => handleDelete(match.id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun match trouvé.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminMatches;