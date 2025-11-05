import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, LogIn, Shield, Users, BookOpen, GraduationCap, ArrowLeft, Sparkles } from 'lucide-react'
import Logo from '../../components/Logo'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const { isDark, currentTheme } = useTheme()
  const { login } = useAuth()
  
  const [selectedPortal, setSelectedPortal] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const portals = [
    { 
      id: 'admin', 
      title: 'Administrator', 
      icon: Shield, 
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-500/10 to-pink-500/10',
      description: 'Full system access and management',
      email: 'admin@eduversepro.com',
      password: 'admin123'
    },
    { 
      id: 'teacher', 
      title: 'Teacher', 
      icon: Users, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      description: 'Manage courses and students',
      email: 'teacher@eduversepro.com',
      password: 'teacher123'
    },
    { 
      id: 'student', 
      title: 'Student', 
      icon: BookOpen, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      description: 'Access learning materials',
      email: 'student@eduversepro.com',
      password: 'student123'
    },
    { 
      id: 'accountant', 
      title: 'Accountant', 
      icon: GraduationCap, 
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-500/10 to-indigo-500/10',
      description: 'Financial management system',
      email: 'accountant@eduversepro.com',
      password: 'accountant123'
    }
  ]

  const handlePortalSelect = (portal) => {
    setSelectedPortal(portal)
    setFormData({
      email: portal.email,
      password: portal.password
    })
  }

  const handleBackToPortals = () => {
    setSelectedPortal(null)
    setFormData({ email: '', password: '' })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        const role = result.user.role
        navigate(`/${role}/dashboard`, { replace: true })
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.4
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    } p-4 relative overflow-hidden`}>
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-3xl"
        />
      </div>

      <div className="relative w-full max-w-6xl">
        {/* Logo - Always Fixed at Top */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-4"
          >
            <Logo size="xl" />
          </motion.div>
          <motion.h1 
            className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              EduVersePro
            </span>
          </motion.h1>
          <AnimatePresence mode="wait">
            {!selectedPortal ? (
              <motion.p
                key="choose-portal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Choose your portal to continue
              </motion.p>
            ) : (
              <motion.p
                key="login-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Sign in to <span className="font-semibold">{selectedPortal.title}</span> Portal
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main Content Area */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!selectedPortal ? (
              /* Portals Grid - 4 Cards in 2x2 Layout */
              <motion.div
                key="portals-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-2 gap-6 w-full max-w-3xl mx-auto"
              >
                {portals.map((portal, index) => {
                  const IconComponent = portal.icon
                  return (
                    <motion.button
                      key={portal.id}
                      variants={itemVariants}
                      onClick={() => handlePortalSelect(portal)}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -8,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-3xl backdrop-blur-xl border-2 text-left transition-all duration-500 group relative overflow-hidden ${
                        isDark 
                          ? 'glass-card-dark border-gray-700/40 bg-gray-900/50 hover:border-gray-600/60' 
                          : 'glass-card-light border-white/30 bg-white/60 hover:border-white/50'
                      } shadow-super-premium hover:shadow-2xl`}
                    >
                      {/* Animated Gradient Background */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${portal.bgColor} opacity-0 group-hover:opacity-100`}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      {/* Content Container */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-r ${portal.color} w-16 h-16 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3`}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-transparent group-hover:bg-gradient-to-r ${portal.color} group-hover:bg-clip-text transition-all duration-300`}>
                          {portal.title}
                        </h3>
                        
                        {/* Description */}
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-5 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300`}>
                          {portal.description}
                        </p>
                        
                        {/* CTA Arrow */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                            <span>Access Portal</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            >
                              →
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute rounded-full ${isDark ? 'bg-white/10' : 'bg-white/30'}`}
                            style={{
                              width: Math.random() * 8 + 4,
                              height: Math.random() * 8 + 4,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: Math.random() * 3 + 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            ) : (
              /* Login Form - Same Position with Beautiful Transition */
              <motion.div
                key="login-form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-md mx-auto"
              >
                <div className={`relative p-8 rounded-3xl backdrop-blur-xl border-2 ${
                  isDark 
                    ? 'glass-card-dark border-gray-700/40 bg-gray-900/50' 
                    : 'glass-card-light border-white/30 bg-white/60'
                } shadow-super-premium`}>
                  
                  {/* Back Button */}
                  <motion.button
                    onClick={handleBackToPortals}
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 mb-8 p-3 rounded-2xl transition-all duration-300 group ${
                      isDark 
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 border border-gray-700/40' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 border border-gray-200/40'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-semibold">Back to Portals</span>
                  </motion.button>

                  {/* Portal Header */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <motion.div 
                      className={`p-4 rounded-2xl bg-gradient-to-r ${selectedPortal.color} shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <selectedPortal.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {selectedPortal.title} Portal
                      </h2>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Welcome back! Sign in to continue
                      </p>
                    </div>
                  </motion.div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                          isDark 
                            ? 'bg-red-900/30 border border-red-800/50' 
                            : 'bg-red-50 border border-red-200'
                        } shadow-lg`}
                      >
                        <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Login Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Email Field */}
                    <div>
                      <label className={`block text-sm font-semibold ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      } mb-3`}>
                        Email Address
                      </label>
                      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                        <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30' 
                              : 'bg-white/70 border border-gray-200/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30'
                          } focus:shadow-lg`}
                          required
                        />
                      </motion.div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className={`block text-sm font-semibold ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      } mb-3`}>
                        Password
                      </label>
                      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                        <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30' 
                              : 'bg-white/70 border border-gray-200/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30'
                          } focus:shadow-lg`}
                          required
                        />
                      </motion.div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02, y: -2 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r ${
                        selectedPortal.color
                      } shadow-xl hover:shadow-2xl transform transition-all duration-300 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      } flex items-center justify-center gap-3 relative overflow-hidden group`}
                    >
                      {/* Animated Shine Effect */}
                      <motion.div 
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        whileHover={{ translateX: '100%' }}
                        transition={{ duration: 0.8 }}
                      />
                      
                      {loading ? (
                        <>
                          <motion.div 
                            className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span>Access {selectedPortal.title} Portal</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>

                  {/* Demo Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`mt-6 p-4 rounded-xl text-center border ${
                      isDark 
                        ? 'bg-gradient-to-r from-gray-800/30 to-gray-900/30 border-gray-700/40' 
                        : 'bg-gradient-to-r from-gray-100/50 to-white/50 border-gray-200/40'
                    } shadow-lg`}
                  >
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="font-semibold">Demo Access:</span> Credentials auto-filled
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Login