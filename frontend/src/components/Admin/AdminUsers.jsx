// // import React, { useEffect, useState } from 'react';
// // import { getAllUsers, updateUser, deleteUser } from '../../services/api/userApi';
// // import Sidebar from '../Sidebar/Sidebar';
// // import './AdminUsers.css';
// //
// // const AdminUsers = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [formData, setFormData] = useState({ email: '', role: '' });
// //   const [editingId, setEditingId] = useState(null);
// //
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const response = await getAllUsers();
// //         setUsers(response);
// //       } catch (error) {
// //         console.error('Error fetching users:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUsers();
// //   }, []);
// //
// //   const handleInputChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };
// //
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (editingId) {
// //         await updateUser(editingId, formData);
// //         setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
// //         setEditingId(null);
// //         setFormData({ email: '', role: '' });
// //       }
// //     } catch (error) {
// //       console.error('Error updating user:', error);
// //     }
// //   };
// //
// //   const handleEdit = (user) => {
// //     setFormData({ email: user.email, role: user.role });
// //     setEditingId(user.id);
// //   };
// //
// //   const handleDelete = async (id) => {
// //     try {
// //       await deleteUser(id);
// //       setUsers(users.filter(u => u.id !== id));
// //     } catch (error) {
// //       console.error('Error deleting user:', error);
// //     }
// //   };
// //
// //   return (
// //     <div className="dashboard-container">
// //       <Sidebar />
// //       <main className="content">
// //         <h2>Gestion des Utilisateurs</h2>
// //         <form onSubmit={handleSubmit} className="user-form">
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleInputChange}
// //             placeholder="Email"
// //             required
// //             disabled={!editingId}
// //           />
// //           <select
// //             name="role"
// //             value={formData.role}
// //             onChange={handleInputChange}
// //             required
// //           >
// //             <option value="">Sélectionner un rôle</option>
// //             <option value="GERANT">Utilisateur</option>
// //             <option value="ADMINISTRATEUR">Administrateur</option>
// //             <option value="COMMUNITY_MANAGER">Community Manager</option>
// //             <option value="SuperAdministrateur">Super Administrateur</option>
// //           </select>
// //           <button type="submit" disabled={!editingId}>Mettre à jour</button>
// //         </form>
// //         {loading ? (
// //           <p>Chargement des utilisateurs...</p>
// //         ) : (
// //           <div className="users-list">
// //             {Array.isArray(users) && users.length > 0 ? (
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Email</th>
// //                     <th>Rôle</th>
// //                     <th>Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {users.map(user => (
// //                     <tr key={user.id}>
// //                       <td>{user.email}</td>
// //                       <td>{user.role}</td>
// //                       <td>
// //                         <button onClick={() => handleEdit(user)}>Modifier</button>
// //                         <button onClick={() => handleDelete(user.id)}>Supprimer</button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             ) : (
// //               <p>Aucun utilisateur trouvé.</p>
// //             )}
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };
// //
// // export default AdminUsers;
//
// import React, { useEffect, useState } from 'react';
// import { getAllUsers, updateUser, deleteUser } from '../../services/api/userApi';
// import Sidebar from '../Sidebar/Sidebar';
// import { Edit, Trash2, X, Search, CheckCircle, AlertCircle, Loader, Users } from 'lucide-react';
// import './AdminUsers.css';
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
// const UserModal = ({ isOpen, onClose, onSubmit, formData, setFormData, editingId }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="modal-overlay">
//       <div className="user-modal">
//         <div className="modal-header">
//           <h3 className="modal-title">Modifier un utilisateur</h3>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>
//         <form onSubmit={onSubmit} className="user-form">
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//                 required
//                 placeholder="Entrez l'email"
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="role">Rôle</label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//                 required
//               >
//                 <option value="">Sélectionner un rôle</option>
//                 <option value="GERANT">Utilisateur</option>
//                 <option value="ADMINISTRATEUR">Administrateur</option>
//                 <option value="COMMUNITY_MANAGER">Community Manager</option>
//                 <option value="SuperAdministrateur">Super Administrateur</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-buttons">
//             <button type="button" className="cancel-button" onClick={onClose}>
//               Annuler
//             </button>
//             <button type="submit" className="submit-button">
//               Mettre à jour
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
//
// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ email: '', role: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
//   const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', userId: null });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: 'email', direction: 'asc' });
//
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllUsers();
//         setUsers(response);
//         showToast('Utilisateurs chargés avec succès', 'success');
//       } catch (error) {
//         console.error('Erreur lors du chargement des utilisateurs :', error);
//         showToast('Impossible de charger les utilisateurs', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
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
//         await updateUser(editingId, formData);
//         setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
//         showToast('Utilisateur mis à jour avec succès', 'success');
//       }
//       resetForm();
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour de l’utilisateur :', error);
//       showToast('Erreur lors de la mise à jour de l’utilisateur', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const resetForm = () => {
//     setFormData({ email: '', role: '' });
//     setEditingId(null);
//     setModalVisible(false);
//   };
//
//   const handleEdit = (user) => {
//     setFormData({ email: user.email, role: user.role });
//     setEditingId(user.id);
//     setModalVisible(true);
//   };
//
//   const confirmDeleteUser = (id) => {
//     setConfirmModal({
//       isOpen: true,
//       message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.',
//       userId: id,
//     });
//   };
//
//   const handleDelete = async () => {
//     const { userId } = confirmModal;
//     setConfirmModal({ isOpen: false, message: '', userId: null });
//     setLoading(true);
//     try {
//       await deleteUser(userId);
//       setUsers(users.filter(u => u.id !== userId));
//       showToast('Utilisateur supprimé avec succès', 'success');
//     } catch (error) {
//       console.error('Erreur lors de la suppression de l’utilisateur :', error);
//       showToast('Erreur lors de la suppression de l’utilisateur', 'error');
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
//   const sortedUsers = [...users]
//     .filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => {
//       const valueA = sortConfig.key === 'email' ? a.email : a.role;
//       const valueB = sortConfig.key === 'email' ? b.email : b.role;
//       if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//
//   // Statistiques
//   const totalUsers = users.length;
//   const totalAdmins = users.filter(user => user.role === 'ADMINISTRATEUR' || user.role === 'SuperAdministrateur').length;
//   const totalCommunityManagers = users.filter(user => user.role === 'COMMUNITY_MANAGER').length;
//
//   return (
//     <div className="admin-users">
//       <Sidebar />
//       <main className="content">
//         <div className="header">
//           <div className="header-text">
//             <h1>Gestion des Utilisateurs</h1>
//             <p className="header-description">Modifiez ou supprimez des utilisateurs</p>
//           </div>
//         </div>
//
//         {/* Statistiques */}
//         <div className="stats-grid">
//           <StatCard
//             icon={<Users className="icon" />}
//             title="Total Utilisateurs"
//             value={totalUsers}
//             iconClass="purple-icon"
//           />
//           <StatCard
//             icon={<Users className="icon" />}
//             title="Administrateurs"
//             value={totalAdmins}
//             iconClass="green-icon"
//           />
//           <StatCard
//             icon={<Users className="icon" />}
//             title="Community Managers"
//             value={totalCommunityManagers}
//             iconClass="yellow-icon"
//           />
//         </div>
//
//         {/* Modal */}
//         <UserModal
//           isOpen={modalVisible}
//           onClose={resetForm}
//           onSubmit={handleSubmit}
//           formData={formData}
//           setFormData={setFormData}
//           editingId={editingId}
//         />
//
//         {/* Barre de recherche et liste des utilisateurs */}
//         <div className="user-section">
//           <div className="section-header">
//             <h2 className="section-title">Liste des Utilisateurs</h2>
//             <div className="search-container">
//               <Search className="search-icon" />
//               <input
//                 type="text"
//                 placeholder="Rechercher un utilisateur..."
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
//           ) : sortedUsers.length > 0 ? (
//             <div className="table-container">
//               <table className="user-table">
//                 <thead>
//                 <tr>
//                   <th onClick={() => handleSort('email')} className="sortable-header">
//                     Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th onClick={() => handleSort('role')} className="sortable-header">
//                     Rôle {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th>Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {sortedUsers.map(user => (
//                   <tr key={user.id}>
//                     <td>{user.email}</td>
//                     <td>{user.role}</td>
//                     <td className="action-buttons">
//                       <button className="edit-button" onClick={() => handleEdit(user)} title="Modifier">
//                         <Edit size={18} />
//                       </button>
//                       <button className="delete-button" onClick={() => confirmDeleteUser(user.id)} title="Supprimer">
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
//               <p>Aucun utilisateur trouvé. {searchTerm ? 'Essayez une autre recherche.' : 'Aucun utilisateur disponible.'}</p>
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
//           onCancel={() => setConfirmModal({ isOpen: false, message: '', userId: null })}
//           onConfirm={handleDelete}
//           message={confirmModal.message}
//         />
//       </main>
//     </div>
//   );
// };
//
// export default AdminUsers;

import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser, createUser } from '../../services/api/userApi';
import Sidebar from '../Sidebar/Sidebar';
import { Edit, Trash2, X, Search, CheckCircle, AlertCircle, Loader, Users, PlusCircle } from 'lucide-react';
import './AdminUsers.css';

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

const UserModal = ({ isOpen, onClose, onSubmit, formData, setFormData, editingId }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="user-modal">
        <div className="modal-header">
          <h3 className="modal-title">{editingId ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="user-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required
                placeholder="Entrez l'email"
                disabled={!!editingId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Rôle</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required
              >
                <option value="">Sélectionner un rôle</option>
                <option value="GERANT">Utilisateur</option>
                <option value="ADMINISTRATEUR">Administrateur</option>
                <option value="COMMUNITY_MANAGER">Community Manager</option>
                <option value="SuperAdministrateur">Super Administrateur</option>
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

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ email: '', role: '' });
  const [editingId, setEditingId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', userId: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'email', direction: 'asc' });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        setUsers(response);
        showToast('Utilisateurs chargés avec succès', 'success');
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error);
        showToast('Impossible de charger les utilisateurs', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateUser(editingId, formData);
        setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
        showToast('Utilisateur mis à jour avec succès', 'success');
      } else {
        const newUser = await createUser(formData);
        setUsers([...users, newUser]);
        showToast('Utilisateur ajouté avec succès', 'success');
      }
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l’utilisateur :', error);
      showToast('Erreur lors de la sauvegarde de l’utilisateur', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', role: '' });
    setEditingId(null);
    setModalVisible(false);
  };

  const handleEdit = (user) => {
    setFormData({ email: user.email, role: user.role });
    setEditingId(user.id);
    setModalVisible(true);
  };

  const handleAddUser = () => {
    setFormData({ email: '', role: '' });
    setEditingId(null);
    setModalVisible(true);
  };

  const confirmDeleteUser = (id) => {
    setConfirmModal({
      isOpen: true,
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.',
      userId: id,
    });
  };

  const handleDelete = async () => {
    const { userId } = confirmModal;
    setConfirmModal({ isOpen: false, message: '', userId: null });
    setLoading(true);
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      showToast('Utilisateur supprimé avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur :', error);
      showToast('Erreur lors de la suppression de l’utilisateur', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users]
    .filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const valueA = sortConfig.key === 'email' ? a.email : a.role;
      const valueB = sortConfig.key === 'email' ? b.email : b.role;
      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  // Statistiques
  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.role === 'ADMINISTRATEUR' || user.role === 'SuperAdministrateur').length;
  const totalCommunityManagers = users.filter(user => user.role === 'COMMUNITY_MANAGER').length;

  return (
    <div className="admin-users">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Gestion des Utilisateurs</h1>
            <p className="header-description">Ajoutez, modifiez ou supprimez des utilisateurs</p>
          </div>
          <button className="add-button" onClick={handleAddUser}>
            <PlusCircle className="icon" />
            Ajouter Utilisateur
          </button>
        </div>

        {/* Statistiques */}
        <div className="stats-grid">
          <StatCard
            icon={<Users className="icon" />}
            title="Total Utilisateurs"
            value={totalUsers}
            iconClass="purple-icon"
          />
          <StatCard
            icon={<Users className="icon" />}
            title="Administrateurs"
            value={totalAdmins}
            iconClass="green-icon"
          />
          <StatCard
            icon={<Users className="icon" />}
            title="Community Managers"
            value={totalCommunityManagers}
            iconClass="yellow-icon"
          />
        </div>

        {/* Liste des utilisateurs avec barre de recherche */}
        <div className="user-section">
          <div className="section-header">
            <h2 className="section-title">Liste des Utilisateurs</h2>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
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
          ) : sortedUsers.length > 0 ? (
            <div className="table-container">
              <table className="user-table">
                <thead>
                <tr>
                  <th onClick={() => handleSort('email')} className="sortable-header">
                    Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('role')} className="sortable-header">
                    Rôle {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(user)} title="Modifier">
                        <Edit size={18} />
                      </button>
                      <button className="delete-button" onClick={() => confirmDeleteUser(user.id)} title="Supprimer">
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
              <p>Aucun utilisateur trouvé. {searchTerm ? 'Essayez une autre recherche.' : 'Ajoutez votre premier utilisateur!'}</p>
            </div>
          )}
        </div>

        {/* Modal */}
        <UserModal
          isOpen={modalVisible}
          onClose={resetForm}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
        />

        {/* Toast notifications */}
        {toast.visible && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />
        )}

        {/* Modal de confirmation */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onCancel={() => setConfirmModal({ isOpen: false, message: '', userId: null })}
          onConfirm={handleDelete}
          message={confirmModal.message}
        />
      </main>
    </div>
  );
};

export default AdminUsers;
