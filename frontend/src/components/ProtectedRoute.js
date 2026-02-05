import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole === 'super_admin' && user?.role !== 'superadmin') {
    return <Navigate to="/admin/registrations" replace />;
  }

  return children;
};

export default ProtectedRoute;