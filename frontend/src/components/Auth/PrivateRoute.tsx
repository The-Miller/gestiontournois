import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  requiredRole: string[];
  children: React.ReactNode;
}

const PrivateRoute = ({ requiredRole, children }: PrivateRouteProps) => {
  const { user } = useContext(AuthContext);
  console.log('Vérification PrivateRoute - User:', user, 'Rôle requis:', requiredRole);

  if (!user) {
    console.log('Redirection vers /connexion car aucun utilisateur connecté');
    return <Navigate to="/connexion" />;
  }

  if (!requiredRole.includes(user.role)) {
    console.log('Redirection vers /dashboard car rôle invalide');
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
