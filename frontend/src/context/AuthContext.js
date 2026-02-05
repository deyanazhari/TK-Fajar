import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogout } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionId = localStorage.getItem('adminSessionId');
    const username = localStorage.getItem('adminUsername');
    const role = localStorage.getItem('adminRole');
    
    if (sessionId && username) {
      const userData = { username, role: role || 'admin', loginTime: new Date().toISOString() };
      setUser(userData);
      setIsAuthenticated(true);
      
      // Check session validity periodically
      const checkSession = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/admin/check-session', {
            headers: {
              'X-Session-ID': sessionId
            }
          });
          
          const data = await response.json();
          
          if (!data.valid) {
            // Session expired, logout user
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('adminSessionId');
            localStorage.removeItem('adminUsername');
          }
        } catch (err) {
          console.error('Session validation error:', err);
        }
      };
      
      // Check session every 30 seconds
      const sessionInterval = setInterval(checkSession, 30000);
      
      return () => clearInterval(sessionInterval);
    }
  }, []);

  const login = (username, role = 'admin') => {
    setIsAuthenticated(true);
    const userData = { username, role, loginTime: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem('adminRole', role);
  };

  const logout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminSessionId');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};