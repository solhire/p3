'use client'

import { useAuth } from '../context/AuthContext';
import PasswordScreen from './PasswordScreen';

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <PasswordScreen />;
  }

  return <>{children}</>;
}