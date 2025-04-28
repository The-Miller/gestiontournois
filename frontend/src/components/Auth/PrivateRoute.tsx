// src/components/Auth/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Export par défaut correct
export default PrivateRoute;