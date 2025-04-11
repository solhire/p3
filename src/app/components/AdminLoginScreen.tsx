'use client'

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginScreen() {
  const { adminLogin } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = adminLogin(password);
    if (!isCorrect) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-black">
      <div className="text-[#FF0000] text-[2rem] md:text-[3rem] font-black tracking-[0.2em] mb-6 uppercase font-mono text-center">
        ADMIN ACCESS
      </div>
      
      <div className="text-white/70 font-mono text-sm mb-12 text-center max-w-md">
        This area is restricted to site administrators.
        {showHint ? (
          <div className="mt-2 text-xs">
            Hint: The password follows the format "sundayservice-admin-YEAR"
          </div>
        ) : (
          <button 
            onClick={() => setShowHint(true)}
            className="block mx-auto mt-2 text-xs text-white/50 hover:text-white"
          >
            Need a hint?
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-sm">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          className={`bg-black border ${error ? 'border-[#FF0000]' : 'border-white/50'} w-full px-4 py-3 text-white font-mono tracking-wider focus:border-[#FF0000] focus:outline-none transition-colors duration-300`}
          autoComplete="off"
        />
        
        <button 
          type="submit"
          className="bg-[#FF0000] text-white font-mono tracking-[0.15em] px-8 py-3 w-full transition-all duration-300 hover:scale-105 active:scale-95 uppercase"
        >
          AUTHENTICATE
        </button>
        
        {error && (
          <div className="text-[#FF0000] font-mono text-sm animate-fade-in">
            INVALID ADMIN CREDENTIALS
          </div>
        )}
      </form>
      
      <div className="mt-12">
        <a 
          href="/"
          className="text-white/50 font-mono text-sm hover:text-white transition-colors duration-300"
        >
          Return to Site
        </a>
      </div>
    </div>
  );
} 