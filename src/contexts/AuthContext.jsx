import React, { createContext, useContext, useEffect, useState } from 'react'
import { seedMockData } from '../utils/storage.js'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // অ্যাপটি প্রথমবার লোড হওয়ার সময় মক ডেটা তৈরি করার জন্য
  useEffect(() => {
    const initializeApp = async () => {
      // যদি মক ডেটা না থাকে তবে তা তৈরি করুন
      await seedMockData()
      
      // এই অংশটি লগইন সেশন মনে রাখা বন্ধ করবে
      // আগের কোডটি মুছে দিয়ে শুধুমাত্র setLoading(false) রাখা হয়েছে
      setLoading(false)
    }

    initializeApp()
  }, [])

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      
      if (!foundUser || foundUser.password !== password) {
        return { success: false, error: 'আপনার দেওয়া ইমেল বা পাসওয়ার্ড ভুল।' }
      }

      const token = btoa(`${foundUser.id}:${Date.now()}:${Math.random()}`)
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      }

      localStorage.setItem('currentUser', JSON.stringify(userSession))
      localStorage.setItem('authToken', token)
      localStorage.setItem('sessionStart', Date.now().toString())

      setUser(userSession)
      
      return { success: true, user: userSession }
    } catch (error) {
      return { success: false, error: 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।' }
    }
  }

  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error('এই ইমেল দিয়ে ইতিমধ্যে রেজিস্ট্রেশন করা হয়েছে।')
      }

      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'student',
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
        createdAt: new Date().toISOString(),
        ...userData
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      return await login(userData.email, userData.password)
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('authToken')
    localStorage.removeItem('sessionStart')
    setUser(null)
  }

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}