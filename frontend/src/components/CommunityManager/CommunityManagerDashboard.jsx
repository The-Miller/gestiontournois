import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Sidebar from '../Sidebar/Sidebar';
import { getAllPosts, createPost, updatePost, deletePost } from '../../services/api/postApi';
import './CommunityManagerDashboard.css';

const CommunityDashboard = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ titre: '', texte: '', photo: null });
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Vérification de l'utilisateur et chargement des posts
  useEffect(() => {
    if (!user) {
      navigate('/connexion');
      return;
    }
    if (user.role !== 'COMMUNITY_MANAGER') {
      navigate('/dashboard');
      return;
    }
    fetchPosts();
  }, [navigate, user]);

  const fetchPosts = async () => {
    try {
      const allPosts = await getAllPosts();
      const userPosts = allPosts.filter(post => post.createdBy === user.id);
      setPosts(userPosts);
    } catch (error) {
      console.error('Erreur lors de la récupération des posts :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setPost({ ...post, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titre', post.titre);
    formData.append('texte', post.texte);
    if (post.photo) formData.append('photo', post.photo);

    try {
      const newPost = await createPost(formData);
      setPosts([...posts, { ...newPost, createdBy: user.id }]);
      setPost({ titre: '', texte: '', photo: null });
    } catch (error) {
      console.error('Erreur lors de la création du post :', error);
    }
  };

  const handleEdit = (post) => {
    setEditMode(true);
    setSelectedPost(post);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titre', selectedPost.titre);
    formData.append('texte', selectedPost.texte);
    if (selectedPost.photo) formData.append('photo', selectedPost.photo);

    try {
      await updatePost(selectedPost.id, formData);
      setPosts(posts.map(p => p.id === selectedPost.id ? selectedPost : p));
      setEditMode(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du post :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du post :', error);
    }
  };

  if (!user || user.role !== 'COMMUNITY_MANAGER') return null;

  return (
    <div className="dashboard-community">
      <Sidebar />
      <main className="content">
        <h1>Gestion des Posts</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre</label>
            <input
              type="text"
              value={post.titre}
              onChange={(e) => setPost({ ...post, titre: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Photo ou Vidéo</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label>Texte de Commentaire</label>
            <textarea
              value={post.texte}
              onChange={(e) => setPost({ ...post, texte: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Créer Post</button>
        </form>

        <h2>Posts Existants</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.titre}</h3>
              {post.photo && <img src={post.photo} alt="Post" />}
              <p>{post.texte}</p>
              <button onClick={() => handleEdit(post)} className="btn btn-warning">Modifier</button>
              <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Supprimer</button>
            </div>
          ))
        ) : (
          <p>Aucun post créé.</p>
        )}

        {editMode && (
          <div className="edit-form">
            <h2>Modifier le Post</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  value={selectedPost?.titre || ''}
                  onChange={(e) => setSelectedPost({ ...selectedPost, titre: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Texte de Commentaire</label>
                <textarea
                  value={selectedPost?.texte || ''}
                  onChange={(e) => setSelectedPost({ ...selectedPost, texte: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Enregistrer</button>
              <button type="button" onClick={() => setEditMode(false)} className="btn btn-secondary">Annuler</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunityDashboard;