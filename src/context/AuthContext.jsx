import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.user);
    } catch (error) {
      if (error.response?.status === 401 && error.response?.data?.message === 'Please verify your email before logging in') {
        // Handle unverified email case
        setUser({ needsVerification: true });
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message === 'Please verify your email before logging in') {
        setUser({ needsVerification: true, email: credentials.email });
      }
      throw error;
    }
  };

  const signup = async (userData) => {
    const response = await authAPI.signup(userData);
    // Only set user if admin (auto-verified) or already verified
    if (response.data.user.role === 'admin' || response.data.user.isVerified) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};