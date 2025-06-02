import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/api/authApi';
import { AuthContext } from '../../contexts/AuthContext';
import './auth.css';
import toornament from '../../assets/toornament.png';
import background from '../../assets/football.webp';
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Tentative de connexion avec email :', email);
      const response = await login(email, password);
      console.log('Réponse du serveur :', response);
      if (response && typeof response === 'object' && Object.keys(response).length > 0) {
        const userData = response;
        const userRole = userData.role || 'GERANT';
        console.log('Données utilisateur :', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        switch (userRole.toUpperCase()) {
          case 'ADMINISTRATEUR':
            navigate('/admin/dashboard');
            break;
          case 'COMMUNITY_MANAGER':
            navigate('/manager/dashboard');
            break;
          case 'GERANT':
            navigate('/gerant/dashboard');
            break;
          default:
            navigate('/dashboard');
            break;
        }
      } else {
        throw new Error('Réponse du serveur invalide : données manquantes');
      }
    } catch (err) {
      console.error('Erreur lors de la connexion :', err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Identifiants incorrects ou problème de connexion'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container" style={{ backgroundImage: `url(${background})` }}>
        <div className="auth-overlay"></div>
        <div className="auth-card">
          <div className="auth-header">
            <img src={toornament} alt="Toornament Logo" className="auth-logo" />
            <h2>Connexion à votre compte</h2>
            <p>Gérez vos tournois universitaires en toute simplicité</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Se souvenir de moi</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
            </p>
            <p className="auth-terms">
              En continuant, vous acceptez nos <Link to="/terms">Conditions d'utilisation</Link> et notre <Link to="/privacy">Politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;