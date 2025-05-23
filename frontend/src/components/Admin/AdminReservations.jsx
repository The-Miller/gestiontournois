// import React, { useEffect, useState } from 'react';
// import { getAllReservations, updateReservation, deleteReservation } from '../../services/api/reservationApi';
// import { updatePaiementStatus } from '../../services/api/paiementApi';
// import Sidebar from '../Sidebar/Sidebar';
// import './AdminReservations.css';
//
// const AdminReservations = () => {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const response = await getAllReservations();
//         setReservations(response);
//       } catch (error) {
//         console.error('Error fetching reservations:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReservations();
//   }, []);
//
//   const handleUpdateStatus = async (id, statut) => {
//     try {
//       await updatePaiementStatus(id, statut);
//       setReservations(reservations.map(r => r.id === id ? { ...r, statut } : r));
//     } catch (error) {
//       console.error('Error updating payment status:', error);
//     }
//   };
//
//   const handleDelete = async (id) => {
//     try {
//       await deleteReservation(id);
//       setReservations(reservations.filter(r => r.id !== id));
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//     }
//   };
//
//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="content">
//         <h2>Réservations & Paiements</h2>
//         {loading ? (
//           <p>Chargement des réservations...</p>
//         ) : (
//           <div className="reservations-list">
//             {Array.isArray(reservations) && reservations.length > 0 ? (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Utilisateur</th>
//                     <th>Statut</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reservations.map(reservation => (
//                     <tr key={reservation.id}>
//                       <td>{reservation.id}</td>
//                       <td>{reservation.utilisateur?.email || 'N/A'}</td>
//                       <td>{reservation.statut || 'N/A'}</td>
//                       <td>
//                         <select
//                           onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
//                           defaultValue={reservation.statut}
//                         >
//                           <option value="PENDING">En attente</option>
//                           <option value="PAID">Payé</option>
//                           <option value="CANCELLED">Annulé</option>
//                         </select>
//                         <button onClick={() => handleDelete(reservation.id)}>Supprimer</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Aucune réservation trouvée.</p>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
//
// export default AdminReservations;

// import React, { useEffect, useState } from 'react';
// import { getAllReservations, updateReservation, deleteReservation } from '../../services/api/reservationApi';
// import { updatePaiementStatus } from '../../services/api/paiementApi';
// import Sidebar from '../Sidebar/Sidebar';
// import {
//   Edit,
//   Trash2,
//   X,
//   Search,
//   CheckCircle,
//   AlertCircle,
//   Loader,
//   Calendar,
//   DollarSign,
//   RefreshCw,
//   PlusCircle
// } from 'lucide-react';
// import './AdminReservations.css';
//
// const StatCard = ({ icon, title, value, iconClass }) => (
//   <div className="stat-card">
//     <div className={`stat-icon ${iconClass}`}>{icon}</div>
//     <div>
//       <p className="stat-title">{title}</p>
//       <p className="stat-value">{value}</p>
//     </div>
//   </div>
// );
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
// const AdminReservations = () => {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
//   const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', reservationId: null });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
//
//   useEffect(() => {
//     const fetchReservations = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllReservations();
//         setReservations(response);
//         showToast('Réservations chargées avec succès', 'success');
//       } catch (error) {
//         console.error('Error fetching reservations:', error);
//         showToast('Impossible de charger les réservations', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReservations();
//   }, []);
//
//   const showToast = (message, type = 'success') => {
//     setToast({ visible: true, message, type });
//     setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
//   };
//
//   const handleUpdateStatus = async (id, statut) => {
//     setLoading(true);
//     try {
//       await updatePaiementStatus(id, statut);
//       setReservations(reservations.map(r => r.id === id ? { ...r, statut } : r));
//       showToast('Statut mis à jour avec succès', 'success');
//     } catch (error) {
//       console.error('Error updating payment status:', error);
//       showToast('Erreur lors de la mise à jour du statut', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleDelete = async () => {
//     const { reservationId } = confirmModal;
//     setConfirmModal({ isOpen: false, message: '', reservationId: null });
//     setLoading(true);
//     try {
//       await deleteReservation(reservationId);
//       setReservations(reservations.filter(r => r.id !== reservationId));
//       showToast('Réservation supprimée avec succès', 'success');
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//       showToast('Erreur lors de la suppression de la réservation', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const confirmDeleteReservation = (id) => {
//     setConfirmModal({
//       isOpen: true,
//       message: 'Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.',
//       reservationId: id,
//     });
//   };
//
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
//     setSortConfig({ key, direction });
//   };
//
//   const sortedReservations = [...reservations]
//     .filter(r => (r.id?.toString() || '').includes(searchTerm) || (r.utilisateur?.email || '').toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => {
//       const valueA = sortConfig.key === 'id' ? a.id : sortConfig.key === 'utilisateur' ? a.utilisateur?.email : a.statut;
//       const valueB = sortConfig.key === 'id' ? b.id : sortConfig.key === 'utilisateur' ? b.utilisateur?.email : b.statut;
//       if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//
//   // Statistiques
//   const totalReservations = reservations.length;
//   const pendingPayments = reservations.filter(r => r.statut === 'PENDING').length;
//   const paidReservations = reservations.filter(r => r.statut === 'PAID').length;
//
//   return (
//     <div className="admin-reservations">
//       <Sidebar />
//       <main className="content">
//         <div className="header">
//           <div className="header-text">
//             <h1>Réservations & Paiements</h1>
//             <p className="header-description">Gérez les réservations et leur statut de paiement</p>
//           </div>
//
//             <button className="add-button" onClick={() => setModalVisible(true)}>
//               <PlusCircle className="icon"/>
//               Ajouter une réservation
//             </button>
//
//         </div>
//
//         {/* Statistiques */}
//         <div className="stats-grid">
//           <StatCard
//             icon={<Calendar className="icon"/>}
//             title="Total Réservations"
//             value={totalReservations}
//             iconClass="purple-icon"
//           />
//           <StatCard
//             icon={<DollarSign className="icon"/>}
//             title="Paiements en attente"
//             value={pendingPayments}
//             iconClass="yellow-icon"
//           />
//           <StatCard
//             icon={<DollarSign className="icon" />}
//             title="Réservations payées"
//             value={paidReservations}
//             iconClass="green-icon"
//           />
//         </div>
//
//         {/* Liste des réservations */}
//         <div className="reservations-section">
//           <div className="section-header">
//             <h2 className="section-title">Réservations & Paiements</h2>
//             <div className="search-container">
//               <Search className="search-icon" />
//               <input
//                 type="text"
//                 placeholder="Rechercher une réservation..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//             </div>
//           </div>
//
//           {loading ? (
//             <div className="loading-container">
//               <Loader className="spinner" />
//               <p>Chargement en cours...</p>
//             </div>
//           ) : sortedReservations.length > 0 ? (
//             <div className="table-container">
//               <table className="reservations-table">
//                 <thead>
//                 <tr>
//                   <th onClick={() => handleSort('id')} className="sortable-header">
//                     ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th onClick={() => handleSort('utilisateur')} className="sortable-header">
//                     Utilisateur {sortConfig.key === 'utilisateur' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th onClick={() => handleSort('statut')} className="sortable-header">
//                     Statut {sortConfig.key === 'statut' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th>Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {sortedReservations.map(reservation => (
//                   <tr key={reservation.id}>
//                     <td>{reservation.id}</td>
//                     <td>{reservation.utilisateur?.email || 'N/A'}</td>
//                     <td>{reservation.statut || 'N/A'}</td>
//                     <td className="action-buttons">
//                       <select
//                         onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
//                         defaultValue={reservation.statut || ''}
//                       >
//                         <option value="PENDING">En attente</option>
//                         <option value="PAID">Payé</option>
//                         <option value="CANCELLED">Annulé</option>
//                       </select>
//                       <button className="delete-button" onClick={() => confirmDeleteReservation(reservation.id)} title="Supprimer">
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="empty-state">
//               <p>Aucune réservation trouvée. {searchTerm ? 'Essayez une autre recherche.' : 'Aucune réservation disponible.'}</p>
//             </div>
//           )}
//         </div>
//
//         {/* Toast notifications */}
//         {toast.visible && (
//           <Toast message={toast.message} type={toast.type} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />
//         )}
//
//         {/* Modal de confirmation */}
//         <ConfirmationModal
//           isOpen={confirmModal.isOpen}
//           onCancel={() => setConfirmModal({ isOpen: false, message: '', reservationId: null })}
//           onConfirm={handleDelete}
//           message={confirmModal.message}
//         />
//       </main>
//     </div>
//   );
// };
//
// export default AdminReservations;
import React, { useEffect, useState } from 'react';
import { getAllReservations, updateReservation, deleteReservation, createReservation } from '../../services/api/reservationApi';
import { updatePaiementStatus } from '../../services/api/paiementApi';
import Sidebar from '../Sidebar/Sidebar';
import {
  Edit,
  Trash2,
  X,
  Search,
  CheckCircle,
  AlertCircle,
  Loader,
  Calendar,
  DollarSign,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import './AdminReservations.css';

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

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', reservationId: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [modalVisible, setModalVisible] = useState(false);
  const [newReservation, setNewReservation] = useState({ title: "", date: "" });

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await getAllReservations();
        setReservations(response);
        showToast('Réservations chargées avec succès', 'success');
      } catch (error) {
        console.error('Error fetching reservations:', error);
        showToast('Impossible de charger les réservations', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReservation(newReservation);
      setModalVisible(false);
      setNewReservation({ title: "", date: "" });
      const response = await getAllReservations();
      setReservations(response);
      showToast('Réservation ajoutée avec succès', 'success');
    } catch (error) {
      console.error('Error creating reservation:', error);
      showToast('Erreur lors de la création de la réservation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, statut) => {
    setLoading(true);
    try {
      await updatePaiementStatus(id, statut);
      setReservations(reservations.map(r => r.id === id ? { ...r, statut } : r));
      showToast('Statut mis à jour avec succès', 'success');
    } catch (error) {
      console.error('Error updating payment status:', error);
      showToast('Erreur lors de la mise à jour du statut', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const { reservationId } = confirmModal;
    setConfirmModal({ isOpen: false, message: '', reservationId: null });
    setLoading(true);
    try {
      await deleteReservation(reservationId);
      setReservations(reservations.filter(r => r.id !== reservationId));
      showToast('Réservation supprimée avec succès', 'success');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      showToast('Erreur lors de la suppression de la réservation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteReservation = (id) => {
    setConfirmModal({
      isOpen: true,
      message: 'Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.',
      reservationId: id,
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedReservations = [...reservations]
    .filter(r => (r.id?.toString() || '').includes(searchTerm) || (r.utilisateur?.email || '').toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const valueA = sortConfig.key === 'id' ? a.id : sortConfig.key === 'utilisateur' ? a.utilisateur?.email : a.statut;
      const valueB = sortConfig.key === 'id' ? b.id : sortConfig.key === 'utilisateur' ? b.utilisateur?.email : b.statut;
      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  // Statistiques
  const totalReservations = reservations.length;
  const pendingPayments = reservations.filter(r => r.statut === 'PENDING').length;
  const paidReservations = reservations.filter(r => r.statut === 'PAID').length;

  return (
    <div className="admin-reservations">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Réservations & Paiements</h1>
            <p className="header-description">Gérez les réservations et leur statut de paiement</p>
          </div>
          <div className="header-actions">
            <button className="add-button" onClick={() => setModalVisible(true)}>
              <PlusCircle className="icon" />
              Ajouter une réservation
            </button>
          </div>
        </div>

        {/* Modale pour ajouter une réservation */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Ajouter une réservation</h3>
                <button onClick={() => setModalVisible(false)} className="modal-close">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddReservation} className="modal-form">
                <div className="form-group">
                  <label htmlFor="title">Titre</label>
                  <input
                    id="title"
                    type="text"
                    value={newReservation.title}
                    onChange={(e) => setNewReservation({ ...newReservation, title: e.target.value })}
                    required
                    placeholder="Entrez le titre de la réservation"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button type="button" className="cancel-button" onClick={() => setModalVisible(false)}>Annuler</button>
                  <button type="submit" className="submit-button">Créer Réservation</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Statistiques */}
        <div className="stats-grid">
          <StatCard
            icon={<Calendar className="icon" />}
            title="Total Réservations"
            value={totalReservations}
            iconClass="purple-icon"
          />
          <StatCard
            icon={<DollarSign className="icon" />}
            title="Paiements en attente"
            value={pendingPayments}
            iconClass="yellow-icon"
          />
          <StatCard
            icon={<DollarSign className="icon" />}
            title="Réservations payées"
            value={paidReservations}
            iconClass="green-icon"
          />
        </div>

        {/* Liste des réservations */}
        <div className="reservations-section">
          <div className="section-header">
            <h2 className="section-title">Réservations & Paiements</h2>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher une réservation..."
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
          ) : sortedReservations.length > 0 ? (
            <div className="table-container">
              <table className="reservations-table">
                <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className="sortable-header">
                    ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('utilisateur')} className="sortable-header">
                    Utilisateur {sortConfig.key === 'utilisateur' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('statut')} className="sortable-header">
                    Statut {sortConfig.key === 'statut' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedReservations.map(reservation => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.utilisateur?.email || 'N/A'}</td>
                    <td>{reservation.statut || 'N/A'}</td>
                    <td className="action-buttons">
                      <select
                        onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
                        defaultValue={reservation.statut || ''}
                      >
                        <option value="PENDING">En attente</option>
                        <option value="PAID">Payé</option>
                        <option value="CANCELLED">Annulé</option>
                      </select>
                      <button className="delete-button" onClick={() => confirmDeleteReservation(reservation.id)} title="Supprimer">
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
              <p>Aucune réservation trouvée. {searchTerm ? 'Essayez une autre recherche.' : 'Aucune réservation disponible.'}</p>
            </div>
          )}
        </div>

        {/* Toast notifications */}
        {toast.visible && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />
        )}

        {/* Modal de confirmation */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onCancel={() => setConfirmModal({ isOpen: false, message: '', reservationId: null })}
          onConfirm={handleDelete}
          message={confirmModal.message}
        />
      </main>
    </div>
  );
};

export default AdminReservations;
