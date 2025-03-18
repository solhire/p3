'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem('ss-auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string) => {
    const correctPassword = 'yeezy888';
    const isCorrect = password === correctPassword;
    
    if (isCorrect) {
      setIsAuthenticated(true);
      localStorage.setItem('ss-auth', 'true');
    }
    
    return isCorrect;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 