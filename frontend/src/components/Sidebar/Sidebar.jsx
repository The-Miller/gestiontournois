import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../services/api/authApi';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/connexion');
  };

  if (!user) {
    return null; // Ne rien afficher si aucun utilisateur n'est connecté
  }

  // Définir les liens selon le rôle
  let links = [];
  let logoText = '';

  switch (user.role) {
    case 'ADMINISTRATEUR':
      logoText = 'Admin Dashboard';
      links = [
        { to: '/admin/overview', icon: 'fa-chart-line', label: 'Statistiques' },
        { to: '/admin/tournaments', icon: 'fa-trophy', label: 'Gestion des Tournois' },
        { to: '/admin/teams', icon: 'fa-users', label: 'Gestion des Équipes' },
        { to: '/admin/matches', icon: 'fa-life-ring', label: 'Matchs & Résultats' },
        { to: '/admin/users', icon: 'fa-user-cog', label: 'Utilisateurs' },
        { to: '/admin/posts', icon: 'fa-bullhorn', label: 'Annonces / Posts' },
      ];
      break;
    case 'GERANT':
      logoText = 'Gerant Dashboard';
      links = [
        { to: '/gerant/overview', icon: 'fa-chart-line', label: 'Statistiques' },
        { to: '/gerant/tournaments', icon: 'fa-trophy', label: 'Gestion des Tournois' },
        { to: '/gerant/teams', icon: 'fa-users', label: 'Gestion des Équipes' },
        { to: '/gerant/matches', icon: 'fa-life-ring', label: 'Matchs & Résultats' },
      ];
      break;
    case 'COMMUNITY_MANAGER':
      logoText = 'Community Dashboard';
      links = [
        { to: '/manager/posts', icon: 'fa-newspaper', label: 'Gestion des Posts' },
      ];
      break;
    default:
      return null; // Pas de sidebar pour les autres rôles
  }

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <h2>{logoText}</h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>
                <i className={`fa ${link.icon}`}></i> {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fa fa-sign-out"></i> Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
