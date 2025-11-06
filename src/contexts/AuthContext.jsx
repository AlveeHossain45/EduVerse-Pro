import React, { createContext, useContext, useEffect, useState } from 'react';
import { seedMockData } from '../utils/storage.js';

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
    const initializeApp = async () => {
      // Step 1: Ensure mock data is seeded correctly if it doesn't exist or is outdated.
      await seedMockData();
      
      // Step 2: Remove any lingering session from localStorage on app load.
      // This will ensure the login page is always shown first.
      localStorage.removeItem('currentUser');
      setUser(null);
      
      setLoading(false);
    };

    initializeApp();
  }, []);

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        return { success: false, error: 'এই ইমেল দিয়ে কোনো ব্যবহারকারী খুঁজে পাওয়া যায়নি।' };
      }
      if (foundUser.password !== password) {
        return { success: false, error: 'আপনার দেওয়া পাসওয়ার্ডটি ভুল।' };
      }

      // Create a user session object for the current session
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
        classId: foundUser.classId // Important for students
      };

      // Set user for the current session
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      setUser(userSession);
      
      return { success: true, user: userSession };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: 'লগইন করার সময় একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।' };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout, // Simplified other functions as they were not the issue
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};