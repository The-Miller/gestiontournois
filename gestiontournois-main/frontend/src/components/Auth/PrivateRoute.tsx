import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getCurrentUser } from '../../services/api/authApi';

interface PrivateRouteProps {
  requiredRole: string[];
  children: React.ReactNode;
}

const PrivateRoute = ({ requiredRole, children }: PrivateRouteProps) => {
  const { user } = useContext(AuthContext);
  const currentUser = user || getCurrentUser();

  console.log('Vérification PrivateRoute - User:', currentUser, 'Rôle requis:', requiredRole);

  if (!currentUser) {
    console.log('Redirection vers /connexion car aucun utilisateur connecté');
    return <Navigate to="/connexion" />;
  }

  if (!requiredRole.includes(currentUser.role)) {
    console.log('Redirection vers /dashboard car rôle invalide');
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;