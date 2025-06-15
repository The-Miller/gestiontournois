import React, { useState, useEffect } from 'react';
import { Trophy, CalendarDays, Users, PlusCircle, Edit, Trash2, X, AlertCircle, CheckCircle, Loader, Search } from 'lucide-react';
import { getAllTournaments, createTournament, updateTournament, deleteTournament, fetchAllUtilisateurs, createUtilisateurWithRole } from '../../services/api';
import Sidebar from '../Sidebar/Sidebar';
import TournamentModal from './TournamentModal';
import './GerantTournaments.css';

// Composant de carte statistique
const StatCard = ({ icon, title, value, iconClass }) => (
  <div className="stat-card">
    <div className={`stat-icon ${iconClass}`}>{icon}</div>
    <div>
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  </div>
);

// Composant pour notification toast
const Toast = ({ message, type, onClose }) => (
  <div className={`toast ${type}`}>
    {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    <p>{message}</p>
    <button onClick={onClose} className="toast-close">
      <X size={16} />
    </button>
  </div>
);

// Composant pour le modal de confirmation
const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <h3 className="modal-title">Confirmation</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onCancel}>Annuler</button>
          <button className="confirm-button" onClick={onConfirm}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

const GerantTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [communityManagers, setCommunityManagers] = useState([]);
  const [newTournament, setNewTournament] = useState({
    nom: '',
    date: '',
    categorie: '',
    status: 'UPCOMING',
    communityManagerId: '',
    createCommunityManager: false,
    communityManager: { nom: '', prenom: '', email: '', password: '' }
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: '',
    tournamentId: null
  });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const data = await getAllTournaments();
      setTournaments(data);
      showToast('Tournois chargés avec succès', 'success');
    } catch (err) {
      console.error('Erreur lors de la récupération des tournois :', err);
      showToast('Impossible de charger les tournois', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityManagers = async () => {
    try {
      const users = await fetchAllUtilisateurs();
      const communityManagers = users.filter(user => user.role === 'COMMUNITY_MANAGER');
      setCommunityManagers(communityManagers);
    } catch (err) {
      console.error('Erreur lors de la récupération des Community Managers :', err);
      showToast('Impossible de charger les Community Managers', 'error');
    }
  };

  useEffect(() => {
    fetchTournaments();
    fetchCommunityManagers();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let communityManagerId = newTournament.communityManagerId;

      // Si un nouveau Community Manager est créé
      if (newTournament.createCommunityManager && !editingId) {
        const cmData = {
          nom: newTournament.communityManager.nom,
          prenom: newTournament.communityManager.prenom,
          email: newTournament.communityManager.email,
          password: newTournament.communityManager.password,
          role: 'COMMUNITY_MANAGER'
        };
        const cmResponse = await createUtilisateurWithRole(cmData);
        communityManagerId = cmResponse.id;
      }

      const tournamentData = {
        nom: newTournament.nom,
        date: newTournament.date,
        categorie: newTournament.categorie,
        status: newTournament.status,
        communityManagerId
      };

      if (editingId) {
        await updateTournament(editingId, tournamentData);
        setTournaments(tournaments.map(t => t.id === editingId ? { ...t, ...tournamentData } : t));
        showToast('Tournoi mis à jour avec succès', 'success');
      } else {
        const created = await createTournament(tournamentData);
        setTournaments([...tournaments, created]);
        showToast('Tournoi créé avec succès', 'success');
      }

      resetForm();
    } catch (err) {
      console.error('Erreur lors de la création/mise à jour :', err);
      const errorMessage = err.response?.data?.nom || err.response?.data?.message || 'Erreur lors de la sauvegarde du tournoi';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewTournament({
      nom: '',
      date: '',
      categorie: '',
      status: 'UPCOMING',
      communityManagerId: '',
      createCommunityManager: false,
      communityManager: { nom: '', prenom: '', email: '', password: '' }
    });
    setEditingId(null);
    setFormVisible(false);
  };

  const handleEdit = (tournament) => {
    setNewTournament({
      nom: tournament.nom,
      date: tournament.date,
      categorie: tournament.categorie,
      status: tournament.status || 'UPCOMING',
      communityManagerId: tournament.communityManagerId || '',
      createCommunityManager: false,
      communityManager: { nom: '', prenom: '', email: '', password: '' }
    });
    setEditingId(tournament.id);
    setFormVisible(true);
  };

  const confirmDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      message: 'Êtes-vous sûr de vouloir supprimer ce tournoi ? Cette action est irréversible.',
      tournamentId: id
    });
  };

  const handleDelete = async () => {
    const id = confirmModal.tournamentId;
    if (!id) return;

    setConfirmModal({ isOpen: false, message: '', tournamentId: null });

    try {
      setLoading(true);
      await deleteTournament(id);
      setTournaments(tournaments.filter(t => t.id !== id));
      showToast('Tournoi supprimé avec succès', 'success');
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
      const errorMessage = err.response?.data?.nom || err.response?.data?.message || 'Erreur lors de la suppression du tournoi';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTournaments = [...tournaments]
    .filter(tournament =>
      tournament.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.categorie.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const totalTournaments = tournaments.length;
  const totalTeams = tournaments.reduce((sum, t) => sum + (t.teams?.length || 0), 0);
  const upcomingTournaments = tournaments.filter(t => new Date(t.date) > new Date()).length;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { class: 'status-completed', label: 'Terminé' };
      case 'IN_PROGRESS':
        return { class: 'status-progress', label: 'En cours' };
      case 'UPCOMING':
      default:
        return { class: 'status-upcoming', label: 'À venir' };
    }
  };

  return (
    <div className="admin-tournaments">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Gestion des Tournois</h1>
            <p className="header-description">Statistiques et gestion des tournois</p>
          </div>
          <button
            className={`add-button ${formVisible ? 'close' : ''}`}
            onClick={() => {
              setFormVisible(!formVisible);
              if (formVisible) resetForm();
            }}
          >
            {formVisible ? <X className="icon" /> : <PlusCircle className="icon" />}
            <span>{formVisible ? 'Fermer' : 'Ajouter un tournoi'}</span>
          </button>
        </div>

        <div className="stats-grid">
          <StatCard
            icon={<Trophy className="icon" />}
            title="Total Tournois"
            value={totalTournaments}
            iconClass="purple-icon"
          />
          <StatCard
            icon={<Users className="icon" />}
            title="Équipes Totales"
            value={totalTeams}
            iconClass="green-icon"
          />
          <StatCard
            icon={<CalendarDays className="icon" />}
            title="Tournois à Venir"
            value={upcomingTournaments}
            iconClass="yellow-icon"
          />
        </div>

        <TournamentModal
          isOpen={formVisible}
          onClose={resetForm}
          onSubmit={handleSubmit}
          newTournament={newTournament}
          setNewTournament={setNewTournament}
          editingId={editingId}
          communityManagers={communityManagers}
        />

        <div className="tournament-section">
          <div className="section-header">
            <h2 className="section-title">Liste des Tournois</h2>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un tournoi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <Loader className="spinner" />
              <p>Chargement en cours...</p>
            </div>
          ) : sortedTournaments.length > 0 ? (
            <div className="table-container">
              <table className="tournament-table">
                <thead>
                <tr>
                  <th onClick={() => handleSort('nom')} className="sortable-header">
                    Nom {sortConfig.key === 'nom' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('date')} className="sortable-header">
                    Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('categorie')} className="sortable-header">
                    Catégorie {sortConfig.key === 'categorie' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('status')} className="sortable-header">
                    Statut {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedTournaments.map((tournament) => {
                  const statusInfo = getStatusInfo(tournament.status);
                  return (
                    <tr key={tournament.id}>
                      <td>{tournament.nom}</td>
                      <td>{formatDate(tournament.date)}</td>
                      <td>{tournament.categorie}</td>
                      <td>
                          <span className={`status-badge ${statusInfo.class}`}>
                            {statusInfo.label}
                          </span>
                      </td>
                      <td className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(tournament)}
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => confirmDelete(tournament.id)}
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>Aucun tournoi trouvé. {searchTerm ? 'Essayez une autre recherche.' : 'Créez votre premier tournoi!'}</p>
              {!searchTerm && (
                <button className="create-button" onClick={() => setFormVisible(true)}>
                  <PlusCircle className="icon" />
                  Créer un tournoi
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ visible: false, message: '', type: 'success' })}
        />
      )}

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onCancel={() => setConfirmModal({ isOpen: false, message: '', tournamentId: null })}
        onConfirm={handleDelete}
        message={confirmModal.message}
      />
    </div>
  );
};

export default GerantTournaments;