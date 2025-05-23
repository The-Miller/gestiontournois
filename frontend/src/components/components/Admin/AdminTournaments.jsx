import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { getAllTournaments, createTournament, updateTournament, deleteTournament } from '../../services/api/tournamentApi';
import './AdminTournaments.css';

const AdminTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [newTournament, setNewTournament] = useState({
    nom: '',
    date: '',
    categorie: '',
    status: 'UPCOMING',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchTournaments = async () => {
    try {
      const data = await getAllTournaments();
      setTournaments(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des tournois :', err);
      setError('Impossible de charger les tournois. Veuillez vérifier votre connexion ou réessayer plus tard.');
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tournamentData = {
        nom: newTournament.nom,
        date: newTournament.date,
        categorie: newTournament.categorie,
      };
      if (editingId) {
        await updateTournament(editingId, tournamentData);
        setTournaments(tournaments.map(t => t.id === editingId ? { ...t, ...tournamentData } : t));
        setEditingId(null);
      } else {
        const createdTournament = await createTournament(tournamentData);
        setTournaments([...tournaments, createdTournament]);
      }
      setNewTournament({ nom: '', date: '', categorie: '', status: 'UPCOMING' });
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la création/mise à jour du tournoi :', err);
      setError('Erreur lors de la création/mise à jour du tournoi. Veuillez vérifier votre connexion ou réessayer plus tard.');
    }
  };

  const handleEdit = (tournament) => {
    setNewTournament({
      nom: tournament.nom,
      date: tournament.date,
      categorie: tournament.categorie,
      status: tournament.status || 'UPCOMING',
    });
    setEditingId(tournament.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTournament(id);
      setTournaments(tournaments.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la suppression du tournoi :', err);
      setError('Erreur lors de la suppression du tournoi. Veuillez vérifier votre connexion ou réessayer plus tard.');
    }
  };

  return (
    <div className="admin-tournaments">
      <Sidebar />
      <main className="content">
        <h1>Gestion des Tournois</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="tournament-form">
          <div>
            <label>Nom du tournoi</label>
            <input
              type="text"
              value={newTournament.nom}
              onChange={(e) => setNewTournament({ ...newTournament, nom: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={newTournament.date}
              onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Catégorie</label>
            <input
              type="text"
              value={newTournament.categorie}
              onChange={(e) => setNewTournament({ ...newTournament, categorie: e.target.value })}
              required
            />
          </div>
          <button type="submit">{editingId ? 'Mettre à jour' : 'Créer Tournoi'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setNewTournament({ nom: '', date: '', categorie: '', status: 'UPCOMING' }); }}>Annuler</button>}
        </form>
        <h2>Liste des Tournois</h2>
        <ul className="tournament-list">
          {tournaments.map((tournament) => (
            <li key={tournament.id}>
              {tournament.nom} - {tournament.date} - {tournament.categorie} ({tournament.status || 'N/A'})
              <button onClick={() => handleEdit(tournament)}>Modifier</button>
              <button onClick={() => handleDelete(tournament.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminTournaments;