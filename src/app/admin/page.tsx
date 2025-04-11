'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminProtected from '../components/AdminProtected';
import Link from 'next/link';

interface PageMessages {
  [key: string]: string;
}

interface SiteMessages {
  homepage: PageMessages;
  [key: string]: PageMessages;
}

export default function AdminPage() {
  const { logout } = useAuth();
  const [messages, setMessages] = useState<SiteMessages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>('homepage');
  const [editedMessages, setEditedMessages] = useState<PageMessages>({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/update-messages');
        const result = await response.json();
        
        if (result.success) {
          setMessages(result.data);
          
          // Initialize edited messages with current values
          if (result.data[selectedPage]) {
            setEditedMessages(result.data[selectedPage]);
          }
        } else {
          setError('Failed to load messages');
        }
      } catch (err) {
        setError('Error fetching messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedPage]);

  // Handle message changes
  const handleMessageChange = (key: string, value: string) => {
    setEditedMessages(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Enable editing mode when changes are made
    setIsEditing(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Get admin session from localStorage for authentication
      const adminSession = localStorage.getItem('admin-session');
      if (!adminSession) {
        setError('Admin session expired. Please login again.');
        return;
      }
      
      // Send update request
      const response = await fetch('/api/update-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminSession}`
        },
        body: JSON.stringify({
          page: selectedPage,
          updates: editedMessages
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccess('Messages updated successfully!');
        
        // Update the messages state with the new values
        setMessages(prev => prev ? {
          ...prev,
          [selectedPage]: result.data
        } : null);
        
        // Reset editing state
        setIsEditing(false);
      } else {
        setError(result.error || 'Failed to update messages');
      }
    } catch (err) {
      setError('Error updating messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminProtected>
      <div className="min-h-screen bg-black text-white font-mono p-6">
        <header className="flex justify-between items-center mb-8 border-b border-white/20 pb-4">
          <h1 className="text-xl md:text-2xl font-bold text-[#FF0000]">SITE ADMIN</h1>
          <button
            onClick={logout}
            className="text-white/70 hover:text-white text-sm"
          >
            LOGOUT
          </button>
        </header>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-8">
            <h2 className="text-lg font-bold mb-4">Site Content</h2>
            <div className="mt-8">
              <Link 
                href="/"
                className="text-white/50 hover:text-white text-sm"
              >
                Return to Site
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-4">
              Edit Homepage Text
            </h2>
            
            {loading && !messages ? (
              <div className="text-white/70">Loading messages...</div>
            ) : error && !messages ? (
              <div className="text-[#FF0000]">{error}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {messages && messages.homepage && Object.entries(messages.homepage).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-white/70 text-sm">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <textarea
                      value={editedMessages[key] || ''}
                      onChange={(e) => handleMessageChange(key, e.target.value)}
                      className="w-full bg-black border border-white/30 p-3 text-sm min-h-[60px]"
                    />
                  </div>
                ))}
                
                {/* Status messages */}
                {error && <div className="text-[#FF0000] text-sm">{error}</div>}
                {success && <div className="text-green-500 text-sm">{success}</div>}
                
                {/* Submit button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!isEditing || loading}
                    className={`px-6 py-2 bg-[#FF0000] text-white ${!isEditing || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF0000]/80'}`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </AdminProtected>
  );
} 