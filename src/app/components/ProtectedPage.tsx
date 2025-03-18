'use client'

import { useAuth } from "../context/AuthContext";
import PasswordScreen from "./PasswordScreen";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  // Always render children, no password check
  return <>{children}</>;
} 