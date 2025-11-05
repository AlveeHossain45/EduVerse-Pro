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
      // Step 1: Ensure mock data exists if storage is empty
      await seedMockData();
      
      // Step 2: We are removing the session check to force login every time.
      // The following lines have been removed:
      // const storedUser = localStorage.getItem('currentUser');
      // if (storedUser) {
      //   setUser(JSON.parse(storedUser));
      // }
      
      setLoading(false);
    };

    initializeApp();
  }, []);

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser || foundUser.password !== password) {
        return { success: false, error: 'আপনার দেওয়া ইমেল বা পাসওয়ার্ড ভুল।' };
      }

      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
      };

      // We will still set the session for the current visit
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      setUser(userSession);
      
      return { success: true, user: userSession };
    } catch (error) {
      return { success: false, error: 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।' };
    }
  };

  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error('এই ইমেল দিয়ে ইতিমধ্যে রেজিস্ট্রেশন করা হয়েছে।');
      }

      const newUser = {
        id: `user_${Date.now()}`,
        ...userData,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      return await login(userData.email, userData.password);
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear the session from both localStorage and state
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUser = (userData) => {
    if (!user) return;
    
    const updatedUserInState = { ...user, ...userData };
    setUser(updatedUserInState);
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUserInState));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};