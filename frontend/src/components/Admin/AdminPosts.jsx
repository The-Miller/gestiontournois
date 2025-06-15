// import React, { useEffect, useState } from 'react';
// import { getAllPosts, createPost, updatePost, deletePost } from '../../services/api/postApi';
// import Sidebar from '../Sidebar/Sidebar';
// import './AdminPosts.css';
//
// const AdminPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ titre: '', contenu: '' });
//   const [editingId, setEditingId] = useState(null);
//
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await getAllPosts();
//         setPosts(response);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);
//
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append('titre', formData.titre);
//       data.append('contenu', formData.contenu);
//
//       if (editingId) {
//         await updatePost(editingId, data);
//         setPosts(posts.map(p => p.id === editingId ? { ...p, ...formData } : p));
//         setEditingId(null);
//       } else {
//         const newPost = await createPost(data);
//         setPosts([...posts, newPost]);
//       }
//       setFormData({ titre: '', contenu: '' });
//     } catch (error) {
//       console.error('Error saving post:', error);
//     }
//   };
//
//   const handleEdit = (post) => {
//     setFormData({ titre: post.titre, contenu: post.contenu });
//     setEditingId(post.id);
//   };
//
//   const handleDelete = async (id) => {
//     try {
//       await deletePost(id);
//       setPosts(posts.filter(p => p.id !== id));
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };
//
//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="content">
//         <h2>Annonces / Posts</h2>
//         <form onSubmit={handleSubmit} className="post-form">
//           <input
//             type="text"
//             name="titre"
//             value={formData.titre}
//             onChange={handleInputChange}
//             placeholder="Titre du post"
//             required
//           />
//           <textarea
//             name="contenu"
//             value={formData.contenu}
//             onChange={handleInputChange}
//             placeholder="Contenu du post"
//             required
//           />
//           <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
//         </form>
//         {loading ? (
//           <p>Chargement des posts...</p>
//         ) : (
//           <div className="posts-list">
//             {Array.isArray(posts) && posts.length > 0 ? (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Titre</th>
//                     <th>Contenu</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {posts.map(post => (
//                     <tr key={post.id}>
//                       <td>{post.titre}</td>
//                       <td>{post.contenu.substring(0, 50)}...</td>
//                       <td>
//                         <button onClick={() => handleEdit(post)}>Modifier</button>
//                         <button onClick={() => handleDelete(post.id)}>Supprimer</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Aucun post trouvé.</p>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
//
// export default AdminPosts;

import React, { useEffect, useState } from 'react';
import { getAllPosts, createPost, updatePost, deletePost } from '../../services/api/postApi';
import Sidebar from '../Sidebar/Sidebar';
import { Edit, Trash2, X, Search, CheckCircle, AlertCircle, Loader, FileText, PlusCircle } from 'lucide-react';
import './AdminPosts.css';

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

const PostModal = ({ isOpen, onClose, onSubmit, formData, setFormData, editingId }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="post-modal">
        <div className="modal-header">
          <h3 className="modal-title">{editingId ? 'Modifier un post' : 'Ajouter un post'}</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input
              id="titre"
              type="text"
              name="titre"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
              placeholder="Entrez le titre du post"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contenu">Contenu</label>
            <textarea
              id="contenu"
              name="contenu"
              value={formData.contenu}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
              placeholder="Entrez le contenu du post"
            />
          </div>
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>Annuler</button>
            <button type="submit" className="submit-button">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ titre: '', contenu: '' });
  const [editingId, setEditingId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', postId: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'titre', direction: 'asc' });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts();
        setPosts(response);
        showToast('Posts chargés avec succès', 'success');
      } catch (error) {
        console.error('Error fetching posts:', error);
        showToast('Impossible de charger les posts', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('titre', formData.titre);
      data.append('contenu', formData.contenu);

      if (editingId) {
        await updatePost(editingId, data);
        setPosts(posts.map(p => p.id === editingId ? { ...p, ...formData } : p));
        showToast('Post mis à jour avec succès', 'success');
      } else {
        const newPost = await createPost(data);
        setPosts([...posts, newPost]);
        showToast('Post ajouté avec succès', 'success');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving post:', error);
      showToast('Erreur lors de la sauvegarde du post', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ titre: '', contenu: '' });
    setEditingId(null);
    setModalVisible(false);
  };

  const handleEdit = (post) => {
    setFormData({ titre: post.titre, contenu: post.contenu });
    setEditingId(post.id);
    setModalVisible(true);
  };

  const handleAddPost = () => {
    setFormData({ titre: '', contenu: '' });
    setEditingId(null);
    setModalVisible(true);
  };

  const confirmDeletePost = (id) => {
    setConfirmModal({
      isOpen: true,
      message: 'Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.',
      postId: id,
    });
  };

  const handleDelete = async () => {
    const { postId } = confirmModal;
    setConfirmModal({ isOpen: false, message: '', postId: null });
    setLoading(true);
    try {
      await deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId));
      showToast('Post supprimé avec succès', 'success');
    } catch (error) {
      console.error('Error deleting post:', error);
      showToast('Erreur lors de la suppression du post', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedPosts = [...posts]
    .filter(post => post.titre.toLowerCase().includes(searchTerm.toLowerCase()) || post.contenu.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPosts = posts.length;

  return (
    <div className="admin-posts">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Annonces / Posts</h1>
            <p className="header-description">Ajoutez, modifiez ou supprimez des posts</p>
          </div>
          <button className="add-button" onClick={handleAddPost}>
            <PlusCircle className="icon" />
            Ajouter Post
          </button>
        </div>

        {/* Statistiques */}
        <div className="stats-grid">
          <StatCard
            icon={<FileText className="icon" />}
            title="Total Posts"
            value={totalPosts}
            iconClass="purple-icon"
          />
        </div>

        {/* Liste des posts */}
        <div className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Annonces / Posts</h2>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un post..."
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
          ) : sortedPosts.length > 0 ? (
            <div className="table-container">
              <table className="posts-table">
                <thead>
                <tr>
                  <th onClick={() => handleSort('titre')} className="sortable-header">
                    Titre {sortConfig.key === 'titre' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('contenu')} className="sortable-header">
                    Contenu {sortConfig.key === 'contenu' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedPosts.map(post => (
                  <tr key={post.id}>
                    <td>{post.titre}</td>
                    <td>{post.contenu.length > 50 ? post.contenu.substring(0, 50) + '...' : post.contenu}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(post)} title="Modifier">
                        <Edit size={18} />
                      </button>
                      <button className="delete-button" onClick={() => confirmDeletePost(post.id)} title="Supprimer">
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
              <p>Aucun post trouvé. {searchTerm ? 'Essayez une autre recherche.' : 'Ajoutez votre premier post !'}</p>
            </div>
          )}
        </div>

        {/* Modal */}
        <PostModal
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
          onCancel={() => setConfirmModal({ isOpen: false, message: '', postId: null })}
          onConfirm={handleDelete}
          message={confirmModal.message}
        />
      </main>
    </div>
  );
};

export default AdminPosts;
