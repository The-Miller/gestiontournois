// import React, { useEffect, useState } from 'react';
// import { getAllEquipes, createEquipe, updateEquipe, deleteEquipe, getTeamMembers, getAllTournaments, addMemberToTeam, updateTeamMember, deleteTeamMember } from '../../services/api/teamApi';
// import Sidebar from '../Sidebar/Sidebar';
// import './AdminTeams.css';
//
// const AdminTeams = () => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ nom: '', categorie: '', tournoiId: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [members, setMembers] = useState({});
//   const [selectedTeamId, setSelectedTeamId] = useState(null);
//   const [error, setError] = useState(null);
//   const [tournaments, setTournaments] = useState([]);
//   const [memberForm, setMemberForm] = useState({ nom: '', prenom: '' });
//   const [editingMemberId, setEditingMemberId] = useState(null);
//
//   useEffect(() => {
//     const fetchTeamsAndTournaments = async () => {
//       try {
//         const [teamsResponse, tournamentsResponse] = await Promise.all([
//           getAllEquipes(),
//           getAllTournaments()
//         ]);
//         setTeams(teamsResponse);
//         setTournaments(tournamentsResponse);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Erreur lors du chargement des données. Vérifiez votre connexion ou réessayez.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTeamsAndTournaments();
//   }, []);
//
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//
//   const handleMemberInputChange = (e) => {
//     setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const teamData = {
//         nom: formData.nom,
//         categorie: formData.categorie,
//         tournoi: { id: formData.tournoiId },
//       };
//       if (editingId) {
//         await updateEquipe(editingId, teamData);
//         setTeams(teams.map(t => t.id === editingId ? { ...t, ...teamData } : t));
//         setEditingId(null);
//       } else {
//         const newTeam = await createEquipe(teamData);
//         setTeams([...teams, newTeam]);
//       }
//       setFormData({ nom: '', categorie: '', tournoiId: '' });
//       setError(null);
//     } catch (error) {
//       console.error('Error saving team:', error);
//       setError('Erreur lors de la sauvegarde. Vérifiez les champs ou réessayez.');
//     }
//   };
//
//   const handleEdit = (team) => {
//     setFormData({
//       nom: team.nom,
//       categorie: team.categorie,
//       tournoiId: team.tournoi?.id || '',
//     });
//     setEditingId(team.id);
//   };
//
//   const handleDelete = async (id) => {
//     try {
//       await deleteEquipe(id);
//       setTeams(teams.filter(t => t.id !== id));
//       setError(null);
//     } catch (error) {
//       console.error('Error deleting team:', error);
//       setError('Erreur lors de la suppression. Réessayez.');
//     }
//   };
//
//   const handleViewMembers = async (teamId) => {
//     try {
//       const response = await getTeamMembers(teamId);
//       setMembers({ ...members, [teamId]: response });
//       setSelectedTeamId(teamId);
//     } catch (error) {
//       console.error('Error fetching team members:', error);
//       setError('Erreur lors du chargement des membres.');
//     }
//   };
//
//   const handleAddOrUpdateMember = async (e) => {
//     e.preventDefault();
//     try {
//       if (!selectedTeamId) {
//         setError('Sélectionnez une équipe avant d’ajouter ou de modifier un membre.');
//         return;
//       }
//       if (editingMemberId) {
//         await updateTeamMember(selectedTeamId, editingMemberId, memberForm);
//         setMembers({
//           ...members,
//           [selectedTeamId]: members[selectedTeamId].map(m =>
//             m.id === editingMemberId ? { ...m, ...memberForm } : m
//           ),
//         });
//         setEditingMemberId(null);
//       } else {
//         const newMember = await addMemberToTeam(selectedTeamId, memberForm);
//         setMembers({
//           ...members,
//           [selectedTeamId]: [...(members[selectedTeamId] || []), newMember],
//         });
//       }
//       setMemberForm({ nom: '', prenom: '' });
//       setError(null);
//     } catch (error) {
//       console.error('Error saving member:', error);
//       setError('Erreur lors de la sauvegarde du membre. Réessayez.');
//     }
//   };
//
//   const handleEditMember = (member) => {
//     setMemberForm({ nom: member.nom, prenom: member.prenom });
//     setEditingMemberId(member.id);
//   };
//
//   const handleDeleteMember = async (memberId) => {
//     try {
//       await deleteTeamMember(selectedTeamId, memberId);
//       setMembers({
//         ...members,
//         [selectedTeamId]: members[selectedTeamId].filter(m => m.id !== memberId),
//       });
//       setError(null);
//     } catch (error) {
//       console.error('Error deleting member:', error);
//       setError('Erreur lors de la suppression du membre. Réessayez.');
//     }
//   };
//
//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="content">
//         <h2>Gestion des Équipes</h2>
//         {error && <div className="error-message">{error}</div>}
//         <form onSubmit={handleSubmit} className="team-form">
//           <input
//             type="text"
//             name="nom"
//             value={formData.nom}
//             onChange={handleInputChange}
//             placeholder="Nom de l'équipe"
//             required
//           />
//           <input
//             type="text"
//             name="categorie"
//             value={formData.categorie}
//             onChange={handleInputChange}
//             placeholder="Catégorie"
//             required
//           />
//           <select
//             name="tournoiId"
//             value={formData.tournoiId}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Sélectionner un tournoi</option>
//             {tournaments.map(t => (
//               <option key={t.id} value={t.id}>{t.nom}</option>
//             ))}
//           </select>
//           <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
//           {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ nom: '', categorie: '', tournoiId: '' }); }}>Annuler</button>}
//         </form>
//         {loading ? (
//           <p>Chargement des équipes...</p>
//         ) : (
//           <div className="teams-list">
//             {Array.isArray(teams) && teams.length > 0 ? (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Nom</th>
//                     <th>Catégorie</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {teams.map(team => (
//                     <tr key={team.id}>
//                       <td>{team.nom}</td>
//                       <td>{team.categorie}</td>
//                       <td>
//                         <button onClick={() => handleEdit(team)}>Modifier</button>
//                         <button onClick={() => handleDelete(team.id)}>Supprimer</button>
//                         <button onClick={() => handleViewMembers(team.id)}>Voir Membres</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Aucune équipe trouvée.</p>
//             )}
//             {selectedTeamId && (
//               <div className="members-section">
//                 <h3>Membres de l'équipe</h3>
//                 <form onSubmit={handleAddOrUpdateMember} className="member-form">
//                   <input
//                     type="text"
//                     name="nom"
//                     value={memberForm.nom}
//                     onChange={handleMemberInputChange}
//                     placeholder="Nom du membre"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="prenom"
//                     value={memberForm.prenom}
//                     onChange={handleMemberInputChange}
//                     placeholder="Prénom du membre"
//                     required
//                   />
//                   <button type="submit">{editingMemberId ? 'Mettre à jour' : 'Ajouter Membre'}</button>
//                   {editingMemberId && <button type="button" onClick={() => { setEditingMemberId(null); setMemberForm({ nom: '', prenom: '' }); }}>Annuler</button>}
//                 </form>
//                 {members[selectedTeamId] && members[selectedTeamId].length > 0 ? (
//                   <ul>
//                     {members[selectedTeamId].map(member => (
//                       <li key={member.id}>
//                         {member.nom} {member.prenom}
//                         <button onClick={() => handleEditMember(member)}>Modifier</button>
//                         <button onClick={() => handleDeleteMember(member.id)}>Supprimer</button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>Aucun membre trouvé.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
//
// export default AdminTeams;
import React, { useEffect, useState } from 'react';
import { getAllEquipes, createEquipe, updateEquipe, deleteEquipe, getTeamMembers, getAllTournaments, addMemberToTeam, updateTeamMember, deleteTeamMember } from '../../services/api/teamApi';
import Sidebar from '../Sidebar/Sidebar';
import { PlusCircle, Edit, Trash2, Users, X, Search, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './AdminTeams.css';

const StatCard = ({ icon, title, value, iconClass }) => (
  <div className="stat-card">
    <div className={`stat-icon ${iconClass}`}>{icon}</div>
    <div>
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  </div>
);

const Toast = ({ message, type, onClose }) => (
  <div className={`toast ${type}`}>
    {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    <p>{message}</p>
    <button onClick={onClose} className="toast-close">
      <X size={16} />
    </button>
  </div>
);

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

const TournamentModal = ({ isOpen, onClose, onSubmit, formData, setFormData, editingId, tournaments }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="tournament-modal">
        <div className="modal-header">
          <h3 className="modal-title">{editingId ? 'Modifier une équipe' : 'Ajouter une équipe'}</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="tournament-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nom">Nom de l'équipe</label>
              <input
                id="nom"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required
                placeholder="Entrez le nom de l'équipe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="categorie">Catégorie</label>
              <select
                id="categorie"
                name="categorie"
                value={formData.categorie}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Mixte">Mixte</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tournoiId">Tournoi</label>
              <select
                id="tournoiId"
                name="tournoiId"
                value={formData.tournoiId}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required
              >
                <option value="">Sélectionner un tournoi</option>
                {tournaments.map(t => (
                  <option key={t.id} value={t.id}>{t.nom}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="submit-button">
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({ nom: '', categorie: '', tournoiId: '' });
  const [editingId, setEditingId] = useState(null);
  const [members, setMembers] = useState({});
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', teamId: null, memberId: null });
  const [tournaments, setTournaments] = useState([]);
  const [memberForm, setMemberForm] = useState({ nom: '', prenom: '' });
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'nom', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teamsResponse, tournamentsResponse] = await Promise.all([getAllEquipes(), getAllTournaments()]);
        setTeams(teamsResponse);
        setTournaments(tournamentsResponse);
        showToast('Données chargées avec succès', 'success');
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        showToast('Impossible de charger les données', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const teamData = {
        nom: formData.nom,
        categorie: formData.categorie,
        tournoi: { id: formData.tournoiId },
      };
      if (editingId) {
        await updateEquipe(editingId, teamData);
        setTeams(teams.map(t => t.id === editingId ? { ...t, ...teamData, tournoi: { id: formData.tournoiId, nom: tournaments.find(t => t.id === formData.tournoiId)?.nom || '' } } : t));
        showToast('Équipe mise à jour avec succès', 'success');
      } else {
        const newTeam = await createEquipe(teamData);
        setTeams([...teams, { ...newTeam, tournoi: { id: formData.tournoiId, nom: tournaments.find(t => t.id === formData.tournoiId)?.nom || '' } }]);
        showToast('Équipe créée avec succès', 'success');
      }
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
      showToast('Erreur lors de la sauvegarde de l\'équipe', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ nom: '', categorie: '', tournoiId: '' });
    setEditingId(null);
    setModalVisible(false);
  };

  const handleEdit = (team) => {
    setFormData({
      nom: team.nom,
      categorie: team.categorie,
      tournoiId: team.tournoi?.id || '',
    });
    setEditingId(team.id);
    setModalVisible(true);
  };

  const confirmDeleteTeam = (id) => {
    setConfirmModal({
      isOpen: true,
      message: 'Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action est irréversible.',
      teamId: id,
      memberId: null,
    });
  };

  const confirmDeleteMember = (memberId) => {
    setConfirmModal({
      isOpen: true,
      message: 'Êtes-vous sûr de vouloir supprimer ce membre ? Cette action est irréversible.',
      teamId: selectedTeamId,
      memberId,
    });
  };

  const handleDelete = async () => {
    const { teamId, memberId } = confirmModal;
    setConfirmModal({ isOpen: false, message: '', teamId: null, memberId: null });
    setLoading(true);
    try {
      if (memberId) {
        await deleteTeamMember(teamId, memberId);
        setMembers({
          ...members,
          [teamId]: members[teamId].filter(m => m.id !== memberId),
        });
        showToast('Membre supprimé avec succès', 'success');
      } else if (teamId) {
        await deleteEquipe(teamId);
        setTeams(teams.filter(t => t.id !== teamId));
        if (selectedTeamId === teamId) setSelectedTeamId(null);
        showToast('Équipe supprimée avec succès', 'success');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      showToast('Erreur lors de la suppression', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMembers = async (teamId) => {
    try {
      const response = await getTeamMembers(teamId);
      setMembers({ ...members, [teamId]: response });
      setSelectedTeamId(teamId === selectedTeamId ? null : teamId);
    } catch (error) {
      console.error('Erreur lors du chargement des membres :', error);
      showToast('Erreur lors du chargement des membres', 'error');
    }
  };

  const handleAddOrUpdateMember = async (e) => {
    e.preventDefault();
    if (!selectedTeamId) {
      showToast('Sélectionnez une équipe avant d’ajouter ou de modifier un membre.', 'error');
      return;
    }
    setLoading(true);
    try {
      if (editingMemberId) {
        await updateTeamMember(selectedTeamId, editingMemberId, memberForm);
        setMembers({
          ...members,
          [selectedTeamId]: members[selectedTeamId].map(m =>
            m.id === editingMemberId ? { ...m, ...memberForm } : m
          ),
        });
        showToast('Membre mis à jour avec succès', 'success');
      } else {
        const newMember = await addMemberToTeam(selectedTeamId, memberForm);
        setMembers({
          ...members,
          [selectedTeamId]: [...(members[selectedTeamId] || []), newMember],
        });
        showToast('Membre ajouté avec succès', 'success');
      }
      setMemberForm({ nom: '', prenom: '' });
      setEditingMemberId(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du membre :', error);
      showToast('Erreur lors de la sauvegarde du membre', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = (member) => {
    setMemberForm({ nom: member.nom, prenom: member.prenom });
    setEditingMemberId(member.id);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedTeams = [...teams]
    .filter(team => team.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const displayedTeams = selectedTeamId
    ? sortedTeams.filter(team => team.id === selectedTeamId)
    : sortedTeams;

  // Statistiques
  const totalTeams = teams.length;
  const totalMembers = Object.values(members).reduce((sum, mems) => sum + (mems?.length || 0), 0);
  const activeTeams = teams.filter(team => !selectedTeamId || team.id === selectedTeamId).length;

  return (
    <div className="admin-teams">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Gestion des Équipes</h1>
            <p className="header-description">Ajoutez, modifiez ou supprimez des équipes et leurs membres</p>
          </div>
          <button
            className={`add-button ${modalVisible ? 'close' : ''}`}
            onClick={() => { setModalVisible(!modalVisible); if (modalVisible) resetForm(); }}
          >
            {modalVisible ? <X className="icon" /> : <PlusCircle className="icon" />}
            <span>{modalVisible ? 'Fermer' : 'Ajouter une équipe'}</span>
          </button>
        </div>

        {/* Statistiques */}
        <div className="stats-grid">
          <StatCard
            icon={<Users className="icon" />}
            title="Total Équipes"
            value={totalTeams}
            iconClass="purple-icon"
          />
          <StatCard
            icon={<Users className="icon" />}
            title="Membres Totales"
            value={totalMembers}
            iconClass="green-icon"
          />
          <StatCard
            icon={<Users className="icon" />}
            title="Équipes Actives"
            value={activeTeams}
            iconClass="yellow-icon"
          />
        </div>

        {/* Modal */}
        <TournamentModal
          isOpen={modalVisible}
          onClose={resetForm}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          tournaments={tournaments}
        />

        {/* Barre de recherche et liste des équipes */}
        <div className="tournament-section">
          <div className="section-header">
            <h2 className="section-title">Liste des Équipes</h2>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher une équipe..."
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
          ) : displayedTeams.length > 0 ? (
            <div className="table-container">
              <table className="tournament-table">
                <thead>
                <tr>
                  <th onClick={() => handleSort('nom')} className="sortable-header">
                    Nom {sortConfig.key === 'nom' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('categorie')} className="sortable-header">
                    Catégorie {sortConfig.key === 'categorie' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('tournoi')} className="sortable-header">
                    Tournoi {sortConfig.key === 'tournoi' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {displayedTeams.map(team => (
                  <tr key={team.id}>
                    <td>{team.nom}</td>
                    <td>{team.categorie || 'Non spécifiée'}</td>
                    <td>{team.tournoi?.nom || 'Aucun tournoi'}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(team)} title="Modifier">
                        <Edit size={18} />
                      </button>
                      <button className="delete-button" onClick={() => confirmDeleteTeam(team.id)} title="Supprimer">
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="view-members-button"
                        onClick={() => handleViewMembers(team.id)}
                        title={selectedTeamId === team.id ? 'Masquer Membres' : 'Voir Membres'}
                      >
                        <Users size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>Aucune équipe trouvée. {searchTerm ? 'Essayez une autre recherche.' : 'Créez votre première équipe!'}</p>
              {!searchTerm && (
                <button className="create-button" onClick={() => setModalVisible(true)}>
                  <PlusCircle className="icon" />
                  Ajouter une équipe
                </button>
              )}
            </div>
          )}
        </div>

        {selectedTeamId && (
          <div className="members-section">
            <div className="card-header">
              <h3 className="card-title">
                <Users className="card-title-icon" />
                Membres de l'équipe
              </h3>
            </div>
            <div className="card-content">
              <form onSubmit={handleAddOrUpdateMember} className="member-form">
                <div className="form-group">
                  <label htmlFor="member-nom">Nom du membre</label>
                  <input
                    id="member-nom"
                    type="text"
                    name="nom"
                    value={memberForm.nom}
                    onChange={(e) => setMemberForm({ ...memberForm, [e.target.name]: e.target.value })}
                    placeholder="Entrez le nom du membre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="member-prenom">Prénom du membre</label>
                  <input
                    id="member-prenom"
                    type="text"
                    name="prenom"
                    value={memberForm.prenom}
                    onChange={(e) => setMemberForm({ ...memberForm, [e.target.name]: e.target.value })}
                    placeholder="Entrez le prénom du membre"
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="submit-button">
                    <PlusCircle className="icon" />
                    {editingMemberId ? 'Mettre à jour' : 'Ajouter Membre'}
                  </button>
                  {editingMemberId && (
                    <button type="button" className="cancel-button" onClick={() => { setEditingMemberId(null); setMemberForm({ nom: '', prenom: '' }); }}>
                      Annuler
                    </button>
                  )}
                </div>
              </form>
              {members[selectedTeamId] && members[selectedTeamId].length > 0 ? (
                <div className="table-container">
                  <table className="tournament-table">
                    <thead>
                    <tr>
                      <th onClick={() => handleSort('nom')} className="sortable-header">
                        Nom {sortConfig.key === 'nom' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('prenom')} className="sortable-header">
                        Prénom {sortConfig.key === 'prenom' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members[selectedTeamId].map(member => (
                      <tr key={member.id}>
                        <td>{member.nom}</td>
                        <td>{member.prenom}</td>
                        <td className="action-buttons">
                          <button className="edit-button" onClick={() => handleEditMember(member)} title="Modifier">
                            <Edit size={18} />
                          </button>
                          <button className="delete-button" onClick={() => confirmDeleteMember(member.id)} title="Supprimer">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data-message">Aucun membre trouvé.</p>
              )}
            </div>
          </div>
        )}

        {/* Toast notifications */}
        {toast.visible && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />
        )}

        {/* Modal de confirmation */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onCancel={() => setConfirmModal({ isOpen: false, message: '', teamId: null, memberId: null })}
          onConfirm={handleDelete}
          message={confirmModal.message}
        />
      </main>
    </div>
  );
};

export default AdminTeams;