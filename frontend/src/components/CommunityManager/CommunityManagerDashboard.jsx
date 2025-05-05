import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Sidebar from '../Sidebar/Sidebar';
import './CommunityManagerDashboard.css';

const CommunityDashboard = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ titre: '', texte: '', photo: null });
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  // Vérification de l'utilisateur dans useEffect
  useEffect(() => {
    console.log('useEffect exécuté - User:', user);
    if (!user) {
      console.log('Redirection vers /connexion car aucun utilisateur');
      navigate('/connexion');
      return;
    }
    if (user.role !== 'COMMUNITY_MANAGER') {
      console.log('Redirection vers /dashboard car rôle invalide:', user.role);
      navigate('/dashboard');
      return;
    }
  }, [navigate, user]);

  const handleFileChange = (e) => {
    setPost({ ...post, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      titre: post.titre,
      texte: post.texte,
      photo: post.photo ? URL.createObjectURL(post.photo) : null
    };
    setPosts([...posts, newPost]);
    setPost({ titre: '', texte: '', photo: null });
  };

  const handleEdit = (post) => {
    setEditMode(true);
    setSelectedPost(post);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setPosts(posts.map(p => p.id === selectedPost.id ? selectedPost : p));
    setEditMode(false);
    setSelectedPost(null);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Ne rien afficher tant qu'on n'a pas confirmé le rôle
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
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.titre}</h3>
            {post.photo && <img src={post.photo} alt="Post" />}
            <p>{post.texte}</p>
            <button onClick={() => handleEdit(post)} className="btn btn-warning">Modifier</button>
            <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Supprimer</button>
          </div>
        ))}

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