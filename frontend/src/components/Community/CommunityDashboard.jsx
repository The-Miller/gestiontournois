import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/api';
import './CommunityDashboard.css';

const CommunityDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ titre: '', texte: '', photo: null });
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user || user.role !== 'CommunityManager') {
    navigate('/connexion');
    return null;
  }

  const handleFileChange = (e) => {
    setPost({ ...post, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous enverriez le post au backend
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

  const handleUpdate = () => {
    // Logique de mise à jour
    setEditMode(false);
    setSelectedPost(null);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/connexion');
  };

  return (
    <div className="dashboard-community">
      <aside className="sidebar">
        <div className="logo-container">
          <h2>Community Dashboard</h2>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li><Link to="/community/posts"><i className="fa fa-newspaper-o"></i> Gestion des Posts</Link></li>
            <li><button onClick={handleLogout} className="logout-btn"><i className="fa fa-sign-out"></i> Déconnexion</button></li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <h1>Gestion des Posts</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre</label>
            <input 
              type="text" 
              value={post.titre}
              onChange={(e) => setPost({...post, titre: e.target.value})}
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
              onChange={(e) => setPost({...post, texte: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Créer Post</button>
        </form>

        <h2>Posts Existants</h2>
        {posts.map(post => (
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
              <input
                type="text"
                value={selectedPost?.titre || ''}
                onChange={(e) => setSelectedPost({...selectedPost, titre: e.target.value})}
                required
              />
              <textarea
                value={selectedPost?.texte || ''}
                onChange={(e) => setSelectedPost({...selectedPost, texte: e.target.value})}
                required
              />
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setEditMode(false)}>Annuler</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunityDashboard;