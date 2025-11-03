import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sun,
  Moon,
  User,
  ChevronDown
} from 'lucide-react'
import Logo from './Logo'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth()
  const { isDark, toggleDarkMode, currentTheme, setTheme, themes } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-red-500',
      teacher: 'bg-blue-500',
      student: 'bg-green-500',
      accountant: 'bg-purple-500'
    }
    return colors[role] || 'bg-gray-500'
  }

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  }

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New exam scheduled', message: 'Mathematics Midterm Exam', time: '2 hours ago', read: false },
    { id: 2, title: 'Attendance marked', message: 'Your attendance has been updated', time: '5 hours ago', read: false },
    { id: 3, title: 'Fee reminder', message: 'Tuition fee due next week', time: '1 day ago', read: true }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'glass-dark' : 'glass'} border-b ${isDark ? 'border-gray-700/30' : 'border-white/20'}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-white/20'} transition-colors`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <Link to={`/${user?.role}/dashboard`} className="flex items-center">
              <Logo size="small" />
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, classes, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-white/20'} transition-colors`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`absolute right-0 mt-2 w-48 ${isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-xl shadow-premium-lg`}
                  >
                    <div className="p-2">
                      <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 px-2`}>THEME</p>
                      <button
                        onClick={() => {
                          toggleDarkMode()
                          setThemeMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}
                      >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {isDark ? 'Light Mode' : 'Dark Mode'}
                        </span>
                      </button>
                      
                      <div className="border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-2" />
                      
                      <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 px-2`}>COLOR</p>
                      {Object.entries(themes).map(([key, theme]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setTheme(key)
                            setThemeMenuOpen(false)
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors ${currentTheme.name === theme.name ? (isDark ? 'bg-gray-700/50' : 'bg-gray-100') : ''}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.primary}`} />
                          <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-white/20'} transition-colors relative`}
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`absolute right-0 mt-2 w-80 ${isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-xl shadow-premium-lg`}
                  >
                    <div className="p-4">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>Notifications</h3>
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg ${!notification.read ? (isDark ? 'bg-gray-700/30' : 'bg-blue-50') : ''}`}
                          >
                            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {notification.title}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                              {notification.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-white/20'} transition-colors`}
              >
                <img
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden sm:block text-left">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`absolute right-0 mt-2 w-48 ${isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-xl shadow-premium-lg`}
                  >
                    <div className="p-2">
                      <Link
                        to={`/${user?.role}/profile`}
                        onClick={() => setProfileMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}
                      >
                        <User className="w-4 h-4" />
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile</span>
                      </Link>
                      
                      <Link
                        to={`/${user?.role}/settings`}
                        onClick={() => setProfileMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}
                      >
                        <Settings className="w-4 h-4" />
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</span>
                      </Link>
                      
                      <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-2`} />
                      
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'} transition-colors`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar