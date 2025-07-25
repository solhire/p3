'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { sha256 } from 'js-sha256';

// The admin hash is stored as a SHA-256 hash for security
// This is for the password "YZY777888" 
// In production, this is stored in environment variables
const ADMIN_HASH = process.env.NEXT_PUBLIC_ADMIN_HASH || "c6af0defa736e3eaf9b7afb8ea1570c4979a1ec30c477c24bacedae949d8335f";

// Site password hash for "yzy777"
const SITE_PASSWORD_HASH = "d0be2dc421be4fcd0172e5afceea3970e2f3d940";

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
    // Check if user is authenticated
    const userSession = localStorage.getItem('user-session');
    if (userSession) {
      try {
        const session = JSON.parse(userSession);
        // Check if session is still valid (24 hours)
        if (session.expires > Date.now()) {
          setIsAuthenticated(true);
        } else {
          // Clear expired session
          localStorage.removeItem('user-session');
        }
      } catch {
        localStorage.removeItem('user-session');
      }
    }
    
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
      } catch {
        localStorage.removeItem('admin-session');
      }
    }
  }, []);

  // Regular login for site access
  const login = (password: string) => {
    // Hash the password and compare with stored hash
    const hashedPassword = sha256(password);
    
    // Check if password is "yzy777"
    const isValid = hashedPassword === SITE_PASSWORD_HASH || password === "yzy777";
    
    if (isValid) {
      setIsAuthenticated(true);
      
      // Store user session in localStorage with 24 hour expiry
      const session = {
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem('user-session', JSON.stringify(session));
    }
    
    return isValid;
  };
  
  // Admin login with secure password check
  const adminLogin = (password: string) => {
    // Hash the password and compare with stored hash
    const hashedPassword = sha256(password);
    
    const isValid = hashedPassword === ADMIN_HASH;
    
    if (isValid) {
      // Set admin status
      setIsAdmin(true);
      setIsAuthenticated(true);
      
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
    setIsAuthenticated(false);
    localStorage.removeItem('admin-session');
    localStorage.removeItem('user-session');
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