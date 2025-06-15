import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/api/authApi';
import './auth.css';
import toornament from '../../assets/toornament.png';
import background from '../../assets/football.webp';
import Navbar from '../Navbar/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password
      };

      await register(userData);
      
      // Redirect to login with success state
      navigate('/connexion', { 
        state: { 
          registrationSuccess: true,
          email: formData.email 
        } 
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Une erreur est survenue lors de l\'inscription'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Header with Navbar */}
      <Navbar />

      {/* Registration Form Container */}
      <div className="auth-container" style={{ backgroundImage: `url(${background})` }}>
        <div className="auth-overlay"></div>
        <div className="auth-card">
          <div className="auth-header">
            <img src={toornament} alt="Toornament Logo" className="auth-logo" />
            <h2>Créer un compte</h2>
            <p>Commencez à gérer vos tournois dès maintenant</p>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  placeholder="Votre prénom"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="exemple@email.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="••••••••"
              />
              <small className="password-hint">Minimum 6 caractères</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Inscription en cours...
                </>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Vous avez déjà un compte? <Link to="/connexion">Connectez-vous</Link>
            </p>
            <p className="terms">
              En vous inscrivant, vous acceptez nos{' '}
              <Link to="/terms">Conditions d'utilisation</Link> et notre{' '}
              <Link to="/privacy">Politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;