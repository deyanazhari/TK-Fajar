import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogout, checkBackendHealth } from '../services/api';

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
          // First check if backend is available
          await checkRootHealth();
          
          const response = await fetch('http://localhost:8080/api/admin/check-session', {
            headers: {
              'X-Session-ID': sessionId
            },
            signal: AbortSignal.timeout(5000) // 5 second timeout
          });
          
          const data = await response.json();
          
          if (!data.valid) {
            // Session expired, logout user
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('adminSessionId');
            localStorage.removeItem('adminUsername');
            localStorage.removeItem('adminRole');
          }
        } catch (err) {
          console.warn('Session validation failed:', err);
          // Don't automatically logout on network errors
          // Only logout on explicit session invalidation
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
      // First try backend logout with timeout
      const sessionId = localStorage.getItem('adminSessionId');
      if (sessionId) {
        // Use Promise.race to implement timeout
        const logoutPromise = adminLogout();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Logout timeout')), 3000)
        );
        
        await Promise.race([logoutPromise, timeoutPromise]);
      }
    } catch (error) {
      console.warn('Logout API call failed or timed out:', error);
      // Continue with local logout even if server logout fails
      // This could happen due to network issues or server being down
    }
    
    // Always clear local storage and state
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