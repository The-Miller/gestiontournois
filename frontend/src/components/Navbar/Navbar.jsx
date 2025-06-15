import React, { useState } from 'react';
import './Navbar.css';
import toornamentLogo from '../../assets/toornament.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={toornamentLogo} alt="Logo Toornament" className="toornament-logo" />
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu mobile"
      >
        ☰
      </button>

      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
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
  );
};

export default Navbar;
