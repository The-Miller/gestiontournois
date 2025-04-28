import React from 'react';
import './presentation.css';
import toornamentLogo from '../../assets/toornament.png';

const Presentation = () => {
  return (
    <div className="presentation-content">
      {/* Header Section (Reused from Home) */}
      <header className="header">
        <div className="logo-container">
          <img src={toornamentLogo} alt="Logo Toornament" className="toornament-logo" />
        </div>
        <nav className="navbar">
          <a href="/">Accueil</a>
          <a href="/presentation">Présentation</a>
          <a href="/fil-actualite">Fil d'actualité</a>
          <a href="/tournois">Tournois</a>
          <a href="/contact">Contact</a>
          <div className="nav-buttons">
            <a href="/inscription" className="btn btn-signup">Inscription</a>
            <a href="/connexion" className="btn btn-login">Connexion</a>
          </div>
        </nav>
      </header>

      {/* Main Presentation Section */}
      <div className="content-section">
        <div className="section-row">
          <div className="section-column text-section">
            <h1 className="section-title">Présentation de Toornament</h1>
            <p className="description">
              Toornament est une plateforme innovante dédiée à la gestion de tournois universitaires. Notre mission est de simplifier l'organisation de compétitions sportives, qu'il s'agisse de petits événements locaux ou de grands tournois multi-disciplinaires. Avec Toornament, vous pouvez :
            </p>
            <ul className="feature-list">
              <li>Gérer les inscriptions des équipes en ligne.</li>
              <li>Planifier les matchs automatiquement ou manuellement.</li>
              <li>Suivre les scores en temps réel avec un affichage dynamique.</li>
              <li>Créer des formats de tournoi personnalisés (poules, éliminatoires, etc.).</li>
            </ul>
            <p className="description">
              Que vous soyez un organisateur novice ou expérimenté, Toornament vous offre les outils nécessaires pour faire de votre tournoi un succès.
            </p>
            <a href="/connexion" className="btn btn-cta">Commencer maintenant</a>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="chat-button">
        <button>Chat</button>
      </div>
    </div>
  );
};

export default Presentation;