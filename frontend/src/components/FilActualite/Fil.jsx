import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { getAllPosts } from '../../services/api/postApi';
import './Fil.css';

const FilActualite = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Erreur lors de la récupération des posts :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="Fil-actualite-content">
      <Navbar />
      <main className="fil-main">
        <h1>Fil d'Actualité</h1>
        {loading ? (
          <p>Chargement...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.titre}</h3>
              {post.photo && <img src={post.photo} alt="Post" />}
              <p>{post.texte}</p>
            </div>
          ))
        ) : (
          <p>Aucun post à afficher.</p>
        )}
      </main>
      <div className="chat-button">
        <button>Chat</button>
      </div>
    </div>
  );
};

export default FilActualite;