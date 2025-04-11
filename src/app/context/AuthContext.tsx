'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { sha256 } from 'js-sha256';

// The admin hash is stored as a SHA-256 hash for security
// This is for the password "sundayservice-admin-2025" 
// In production, this is stored in environment variables
const ADMIN_HASH = process.env.NEXT_PUBLIC_ADMIN_HASH || "86f6d3c608a9f439b92b9318b16b6c0d27c1d1518064dbdd3064723191be594d";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (password: string) => boolean;
  adminLogin: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check local storage on initial load
  useEffect(() => {
    // The site is now always authenticated for visitors
    setIsAuthenticated(true);
    
    // Check if admin session exists
    const adminSession = localStorage.getItem('admin-session');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        // Check if session is still valid (24 hours)
        if (session.expires > Date.now()) {
          setIsAdmin(true);
        } else {
          // Clear expired session
          localStorage.removeItem('admin-session');
        }
      } catch (e) {
        localStorage.removeItem('admin-session');
      }
    }
  }, []);

  // Regular login, now always returns true
  const login = (_password: string) => {
    setIsAuthenticated(true);
    return true;
  };
  
  // Admin login with secure password check
  const adminLogin = (password: string) => {
    // Hash the password and compare with stored hash
    const hashedPassword = sha256(password);
    
    const isValid = hashedPassword === ADMIN_HASH;
    
    if (isValid) {
      // Set admin status
      setIsAdmin(true);
      
      // Store admin session in localStorage with 24 hour expiry
      const session = {
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem('admin-session', JSON.stringify(session));
    }
    
    return isValid;
  };
  
  // Logout function
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin-session');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, adminLogin, logout }}>
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