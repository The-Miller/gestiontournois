import React, { useEffect, useState } from 'react';
import { getAllPosts, createPost, updatePost, deletePost } from '../../services/api/postApi';
import Sidebar from '../Sidebar/Sidebar';
import './AdminPosts.css';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ titre: '', contenu: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('titre', formData.titre);
      data.append('contenu', formData.contenu);

      if (editingId) {
        await updatePost(editingId, data);
        setPosts(posts.map(p => p.id === editingId ? { ...p, ...formData } : p));
        setEditingId(null);
      } else {
        const newPost = await createPost(data);
        setPosts([...posts, newPost]);
      }
      setFormData({ titre: '', contenu: '' });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post) => {
    setFormData({ titre: post.titre, contenu: post.contenu });
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Annonces / Posts</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleInputChange}
            placeholder="Titre du post"
            required
          />
          <textarea
            name="contenu"
            value={formData.contenu}
            onChange={handleInputChange}
            placeholder="Contenu du post"
            required
          />
          <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
        </form>
        {loading ? (
          <p>Chargement des posts...</p>
        ) : (
          <div className="posts-list">
            {Array.isArray(posts) && posts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Contenu</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.titre}</td>
                      <td>{post.contenu.substring(0, 50)}...</td>
                      <td>
                        <button onClick={() => handleEdit(post)}>Modifier</button>
                        <button onClick={() => handleDelete(post.id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun post trouvé.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPosts;