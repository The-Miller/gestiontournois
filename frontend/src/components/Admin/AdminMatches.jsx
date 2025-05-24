// import React, { useEffect, useState } from 'react';
// import { getAllMatches, createMatch, updateMatch, deleteMatch } from '../../services/api/matchApi';
// import Sidebar from '../Sidebar/Sidebar';
// import './AdminMatches.css';
//
// const AdminMatches = () => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ equipe1: '', equipe2: '', resultat: '' });
//   const [editingId, setEditingId] = useState(null);
//
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await getAllMatches();
//         setMatches(response);
//       } catch (error) {
//         console.error('Error fetching matches:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMatches();
//   }, []);
//
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateMatch(editingId, formData);
//         setMatches(matches.map(m => m.id === editingId ? { ...m, ...formData } : m));
//         setEditingId(null);
//       } else {
//         const newMatch = await createMatch(formData);
//         setMatches([...matches, newMatch]);
//       }
//       setFormData({ equipe1: '', equipe2: '', resultat: '' });
//     } catch (error) {
//       console.error('Error saving match:', error);
//     }
//   };
//
//   const handleEdit = (match) => {
//     setFormData({ equipe1: match.equipe1, equipe2: match.equipe2, resultat: match.resultat });
//     setEditingId(match.id);
//   };
//
//   const handleDelete = async (id) => {
//     try {
//       await deleteMatch(id);
//       setMatches(matches.filter(m => m.id !== id));
//     } catch (error) {
//       console.error('Error deleting match:', error);
//     }
//   };
//
//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="content">
//         <h2>Matchs & Résultats</h2>
//         <form onSubmit={handleSubmit} className="match-form">
//           <input
//             type="text"
//             name="equipe1"
//             value={formData.equipe1}
//             onChange={handleInputChange}
//             placeholder="Équipe 1"
//             required
//           />
//           <input
//             type="text"
//             name="equipe2"
//             value={formData.equipe2}
//             onChange={handleInputChange}
//             placeholder="Équipe 2"
//             required
//           />
//           <input
//             type="text"
//             name="resultat"
//             value={formData.resultat}
//             onChange={handleInputChange}
//             placeholder="Résultat"
//           />
//           <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
//         </form>
//         {loading ? (
//           <p>Chargement des matchs...</p>
//         ) : (
//           <div className="matches-list">
//             {Array.isArray(matches) && matches.length > 0 ? (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Équipe 1</th>
//                     <th>Équipe 2</th>
//                     <th>Résultat</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {matches.map(match => (
//                     <tr key={match.id}>
//                       <td>{match.equipe1}</td>
//                       <td>{match.equipe2}</td>
//                       <td>{match.resultat || 'N/A'}</td>
//                       <td>
//                         <button onClick={() => handleEdit(match)}>Modifier</button>
//                         <button onClick={() => handleDelete(match.id)}>Supprimer</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Aucun match trouvé.</p>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
//
// export default AdminMatches;
//
// import React, { useEffect, useState } from 'react';
// import { getAllMatches, createMatch, updateMatch, deleteMatch } from '../../services/api/matchApi';
// import Sidebar from '../Sidebar/Sidebar';
// import { PlusCircle, Edit, Trash2, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
// import './AdminMatches.css';
//
// const Toast = ({ message, type, onClose }) => (
//   <div className={`toast ${type}`}>
//     {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
//     <p>{message}</p>
//     <button onClick={onClose} className="toast-close">
//       <X size={16} />
//     </button>
//   </div>
// );
//
// const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="modal-overlay">
//       <div className="confirmation-modal">
//         <h3 className="modal-title">Confirmation</h3>
//         <p className="modal-message">{message}</p>
//         <div className="modal-buttons">
//           <button className="cancel-button" onClick={onCancel}>Annuler</button>
//           <button className="confirm-button" onClick={onConfirm}>Confirmer</button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// const MatchModal = ({ isOpen, onClose, onSubmit, formData, setFormData, editingId }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="modal-overlay">
//       <div className="match-modal">
//         <div className="modal-header">
//           <h3 className="modal-title">{editingId ? 'Modifier un match' : 'Ajouter un match'}</h3>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>
//         <form onSubmit={onSubmit} className="match-form">
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="equipe1">Équipe 1</label>
//               <input
//                 id="equipe1"
//                 type="text"
//                 name="equipe1"
//                 value={formData.equipe1}
//                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//                 required
//                 placeholder="Nom de l'équipe 1"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="equipe2">Équipe 2</label>
//               <input
//                 id="equipe2"
//                 type="text"
//                 name="equipe2"
//                 value={formData.equipe2}
//                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//                 required
//                 placeholder="Nom de l'équipe 2"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="resultat">Résultat</label>
//               <input
//                 id="resultat"
//                 type="text"
//                 name="resultat"
//                 value={formData.resultat}
//                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//                 placeholder="Score du match"
//               />
//             </div>
//           </div>
//           <div className="form-buttons">
//             <button type="button" className="cancel-button" onClick={onClose}>
//               Annuler
//             </button>
//             <button type="submit" className="submit-button">
//               {editingId ? 'Mettre à jour' : 'Ajouter'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
//
// const AdminMatches = () => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ equipe1: '', equipe2: '', resultat: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
//   const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', matchId: null });
//   const [sortConfig, setSortConfig] = useState({ key: 'equipe1', direction: 'asc' });
//
//   useEffect(() => {
//     const fetchMatches = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllMatches();
//         setMatches(response);
//         showToast('Matchs chargés avec succès', 'success');
//       } catch (error) {
//         console.error('Erreur lors du chargement des matchs :', error);
//         showToast('Impossible de charger les matchs', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMatches();
//   }, []);
//
//   const showToast = (message, type = 'success') => {
//     setToast({ visible: true, message, type });
//     setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (editingId) {
//         await updateMatch(editingId, formData);
//         setMatches(matches.map(m => m.id === editingId ? { ...m, ...formData } : m));
//         showToast('Match mis à jour avec succès', 'success');
//       } else {
//         const newMatch = await createMatch(formData);
//         setMatches([...matches, newMatch]);
//         showToast('Match créé avec succès', 'success');
//       }
//       resetForm();
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde du match :', error);
//       showToast('Erreur lors de la sauvegarde du match', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const resetForm = () => {
//     setFormData({ equipe1: '', equipe2: '', resultat: '' });
//     setEditingId(null);
//     setModalVisible(false);
//   };
//
//   const handleEdit = (match) => {
//     setFormData({
//       equipe1: match.equipe1,
//       equipe2: match.equipe2,
//       resultat: match.resultat || '',
//     });
//     setEditingId(match.id);
//     setModalVisible(true);
//   };
//
//   const confirmDelete = (id) => {
//     setConfirmModal({
//       isOpen: true,
//       message: 'Êtes-vous sûr de vouloir supprimer ce match ? Cette action est irréversible.',
//       matchId: id,
//     });
//   };
//
//   const handleDelete = async () => {
//     const { matchId } = confirmModal;
//     setConfirmModal({ isOpen: false, message: '', matchId: null });
//     setLoading(true);
//     try {
//       await deleteMatch(matchId);
//       setMatches(matches.filter(m => m.id !== matchId));
//       showToast('Match supprimé avec succès', 'success');
//     } catch (error) {
//       console.error('Erreur lors de la suppression du match :', error);
//       showToast('Erreur lors de la suppression du match', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
//     setSortConfig({ key, direction });
//   };
//
//   const sortedMatches = [...matches].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
//     if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
//     return 0;
//   });
//
//   return (
//     <div className="admin-matches">
//       <Sidebar />
//       <main className="content">
//         <div className="header">
//           <div className="header-text">
//             <h1>Gestion des Matchs</h1>
//             <p className="header-description">Ajoutez, modifiez ou supprimez des matchs et leurs résultats</p>
//           </div>
//           <button
//             className={`add-button ${modalVisible ? 'close' : ''}`}
//             onClick={() => { setModalVisible(!modalVisible); if (modalVisible) resetForm(); }}
//           >
//             {modalVisible ? <X className="icon" /> : <PlusCircle className="icon" />}
//             <span>{modalVisible ? 'Fermer' : 'Ajouter un match'}</span>
//           </button>
//         </div>
//
//         {/* Modal */}
//         <MatchModal
//           isOpen={modalVisible}
//           onClose={resetForm}
//           onSubmit={handleSubmit}
//           formData={formData}
//           setFormData={setFormData}
//           editingId={editingId}
//         />
//
//         {loading ? (
//           <div className="loading-container">
//             <Loader className="spinner" />
//             <p>Chargement en cours...</p>
//           </div>
//         ) : matches.length > 0 ? (
//           <div className="table-container">
//             <table className="matches-table">
//               <thead>
//               <tr>
//                 <th onClick={() => handleSort('equipe1')} className="sortable-header">
//                   Équipe 1 {sortConfig.key === 'equipe1' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th onClick={() => handleSort('equipe2')} className="sortable-header">
//                   Équipe 2 {sortConfig.key === 'equipe2' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th onClick={() => handleSort('resultat')} className="sortable-header">
//                   Résultat {sortConfig.key === 'resultat' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th>Actions</th>
//               </tr>
//               </thead>
//               <tbody>
//               {sortedMatches.map(match => (
//                 <tr key={match.id}>
//                   <td>{match.equipe1}</td>
//                   <td>{match.equipe2}</td>
//                   <td>{match.resultat || 'N/A'}</td>
//                   <td className="action-buttons">
//                     <button className="edit-button" onClick={() => handleEdit(match)} title="Modifier">
//                       <Edit size={18} />
//                     </button>
//                     <button className="delete-button" onClick={() => confirmDelete(match.id)} title="Supprimer">
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="empty-state">
//             <p>Aucun match trouvé. Créez votre premier match!</p>
//             <button className="create-button" onClick={() => setModalVisible(true)}>
//               <PlusCircle className="icon" />
//               Ajouter un match
//             </button>
//           </div>
//         )}
//
//         {/* Toast notifications */}
//         {toast.visible && (
//           <Toast message={toast.message} type={toast.type} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />
//         )}
//
//         {/* Modal de confirmation */}
//         <ConfirmationModal
//           isOpen={confirmModal.isOpen}
//           onCancel={() => setConfirmModal({ isOpen: false, message: '', matchId: null })}
//           onConfirm={handleDelete}
//           message={confirmModal.message}
//         />
//       </main>
//     </div>
//   );
// };
//
// export default AdminMatches;
import React, { useEffect, useState } from 'react';
import { getAllMatches, createMatch, updateMatch, deleteMatch } from '../../services/api/matchApi';
import { getAllEquipes, getAllTournaments } from '../../services/api/teamApi';
import Sidebar from '../Sidebar/Sidebar';
import { PlusCircle, Edit, Trash2, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './AdminMatches.css';

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

const MatchModal = ({ isOpen, onClose, onSubmit, formData, setFormData, editingId, teams, tournaments }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="match-modal">
        <div className="modal-header">
          <h3 className="modal-title">{editingId ? 'Modifier un match' : 'Ajouter un match'}</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="match-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="tournoiId">Tournoi</label>
              <select
                id="tournoiId"
                name="tournoiId"
                value={formData.tournoiId || ''}
                onChange={(e) => setFormData({ ...formData, tournoiId: e.target.value })}
                required
              >
                <option value="">Sélectionner un tournoi</option>
                {tournaments.map(t => (
                  <option key={t.id} value={t.id}>{t.nom}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="equipeaId">Équipe A</label>
              <select
                id="equipeaId"
                name="equipeaId"
                value={formData.equipeaId || ''}
                onChange={(e) => setFormData({ ...formData, equipeaId: e.target.value })}
                required
              >
                <option value="">Sélectionner une équipe</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.nom}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="equipebId">Équipe B</label>
              <select
                id="equipebId"
                name="equipebId"
                value={formData.equipebId || ''}
                onChange={(e) => setFormData({ ...formData, equipebId: e.target.value })}
                required
              >
                <option value="">Sélectionner une équipe</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.nom}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="scorea">Score Équipe A</label>
              <input
                id="scorea"
                type="number"
                name="scorea"
                value={formData.scorea || ''}
                onChange={(e) => setFormData({ ...formData, scorea: e.target.value })}
                placeholder="Score"
              />
            </div>
            <div className="form-group">
              <label htmlFor="scoreb">Score Équipe B</label>
              <input
                id="scoreb"
                type="number"
                name="scoreb"
                value={formData.scoreb || ''}
                onChange={(e) => setFormData({ ...formData, scoreb: e.target.value })}
                placeholder="Score"
              />
            </div>
            <div className="form-group">
              <label htmlFor="statut">Statut</label>
              <select
                id="statut"
                name="statut"
                value={formData.statut || ''}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
              >
                <option value="">Sélectionner un statut</option>
                <option value="SCHEDULED">Programmé</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="COMPLETED">Terminé</option>
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

const AdminMatches = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    tournoiId: '',
    equipeaId: '',
    equipebId: '',
    date: '',
    scorea: '',
    scoreb: '',
    statut: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', matchId: null });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [matchesResponse, teamsResponse, tournamentsResponse] = await Promise.all([
          getAllMatches(),
          getAllEquipes(),
          getAllTournaments(),
        ]);
        setMatches(matchesResponse);
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
      // Ajouter une heure par défaut (00:00:00) pour correspondre à LocalDateTime
      const matchData = {
        tournoiId: formData.tournoiId,
        equipeaId: formData.equipeaId,
        equipebId: formData.equipebId,
        date: formData.date ? `${formData.date}T00:00:00` : '', // Format YYYY-MM-DDTHH:mm:ss
        scorea: formData.scorea || 0,
        scoreb: formData.scoreb || 0,
        statut: formData.statut || 'SCHEDULED',
      };
      if (editingId) {
        await updateMatch(editingId, matchData);
        setMatches(matches.map(m => m.id === editingId ? { ...m, ...matchData } : m));
        showToast('Match mis à jour avec succès', 'success');
      } else {
        const newMatch = await createMatch(matchData);
        setMatches([...matches, newMatch]);
        showToast('Match créé avec succès', 'success');
      }
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du match :', error);
      showToast('Erreur lors de la sauvegarde du match', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      tournoiId: '',
      equipeaId: '',
      equipebId: '',
      date: '',
      scorea: '',
      scoreb: '',
      statut: '',
    });
    setEditingId(null);
    setModalVisible(false);
  };

  const handleEdit = (match) => {
    setFormData({
      tournoiId: match.tournoiId,
      equipeaId: match.equipeaId,
      equipebId: match.equipebId,
      date: match.date ? match.date.split('T')[0] : '', // Extraire uniquement la date YYYY-MM-DD
      scorea: match.scorea || '',
      scoreb: match.scoreb || '',
      statut: match.statut || '',
    });
    setEditingId(match.id);
    setModalVisible(true);
  };

  const confirmDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      message: 'Êtes-vous sûr de vouloir supprimer ce match ? Cette action est irréversible.',
      matchId: id,
    });
  };

  const handleDelete = async () => {
    const { matchId } = confirmModal;
    setConfirmModal({ isOpen: false, message: '', matchId: null });
    setLoading(true);
    try {
      await deleteMatch(matchId);
      setMatches(matches.filter(m => m.id !== matchId));
      showToast('Match supprimé avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors de la suppression du match :', error);
      showToast('Erreur lors de la suppression du match', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedMatches = [...matches].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="admin-matches">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Gestion des Matchs</h1>
            <p className="header-description">Ajoutez, modifiez ou supprimez des matchs et leurs résultats</p>
          </div>
          <button
            className={`add-button ${modalVisible ? 'close' : ''}`}
            onClick={() => { setModalVisible(!modalVisible); if (modalVisible) resetForm(); }}
          >
            {modalVisible ? <X className="icon" /> : <PlusCircle className="icon" />}
            <span>{modalVisible ? 'Fermer' : 'Ajouter un match'}</span>
          </button>
        </div>

        <MatchModal
          isOpen={modalVisible}
          onClose={resetForm}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          teams={teams}
          tournaments={tournaments}
        />

        {loading ? (
          <div className="loading-container">
            <Loader className="spinner" />
            <p>Chargement en cours...</p>
          </div>
        ) : matches.length > 0 ? (
          <div className="table-container">
            <table className="matches-table">
              <thead>
              <tr>
                <th onClick={() => handleSort('tournoiId')} className="sortable-header">
                  Tournoi {sortConfig.key === 'tournoiId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('equipeaId')} className="sortable-header">
                  Équipe A {sortConfig.key === 'equipeaId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('equipebId')} className="sortable-header">
                  Équipe B {sortConfig.key === 'equipebId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('date')} className="sortable-header">
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th>Score</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {sortedMatches.map(match => (
                <tr key={match.id}>
                  <td>{tournaments.find(t => t.id === match.tournoiId)?.nom || 'N/A'}</td>
                  <td>{teams.find(t => t.id === match.equipeaId)?.nom || 'N/A'}</td>
                  <td>{teams.find(t => t.id === match.equipebId)?.nom || 'N/A'}</td>
                  <td>{new Date(match.date).toLocaleDateString()}</td>
                  <td>{`${match.scorea || 0} - ${match.scoreb || 0}`}</td>
                  <td>{match.statut || 'N/A'}</td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(match)} title="Modifier">
                      <Edit size={18} />
                    </button>
                    <button className="delete-button" onClick={() => confirmDelete(match.id)} title="Supprimer">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>Aucun match trouvé. Créez votre premier match!</p>
            <button className="create-button" onClick={() => setModalVisible(true)}>
              <PlusCircle className="icon" />
              Ajouter un match
            </button>
          </div>
        )}

        {toast.visible && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />
        )}

        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onCancel={() => setConfirmModal({ isOpen: false, message: '', matchId: null })}
          onConfirm={handleDelete}
          message={confirmModal.message}
        />
      </main>
    </div>
  );
};

export default AdminMatches;