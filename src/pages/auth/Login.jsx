import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from 'lucide-react'
import Logo from '../../components/Logo'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const { isDark, currentTheme } = useTheme()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/admin/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // Navigate based on user role
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
    // Clear error when user starts typing
    if (error) setError('')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? currentTheme.dark.bg : currentTheme.light.bg} p-4`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${isDark ? 'bg-blue-900/20' : 'bg-blue-100/50'} blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${isDark ? 'bg-purple-900/20' : 'bg-purple-100/50'} blur-3xl`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${isDark ? 'bg-emerald-900/10' : 'bg-emerald-100/30'} blur-3xl`} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        <motion.div
          variants={itemVariants}
          className={`relative p-8 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg border ${isDark ? 'border-gray-700/30' : 'border-white/20'}`}
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <Logo size="large" />
          </motion.div>

          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Welcome Back
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to your EduVersePro account
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${isDark ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-200'} border`}
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className={`w-4 h-4 rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} text-blue-600 focus:ring-blue-500`}
                />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className={`text-sm font-medium ${currentTheme.text} hover:opacity-80 transition-opacity`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl transform transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'} flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Demo Accounts */}
          <motion.div
            variants={itemVariants}
            className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}
          >
            <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              DEMO ACCOUNTS
            </p>
            <div className="space-y-1 text-xs">
              <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span>Admin:</span>
                <span>admin@eduversepro.com / admin123</span>
              </div>
              <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span>Teacher:</span>
                <span>sarah.johnson@eduversepro.com / teacher123</span>
              </div>
              <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span>Student:</span>
                <span>emma.wilson@eduversepro.com / student123</span>
              </div>
              <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span>Accountant:</span>
                <span>robert.martinez@eduversepro.com / accountant123</span>
              </div>
            </div>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-6"
          >
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <Link
                to="/register"
                className={`font-medium ${currentTheme.text} hover:opacity-80 transition-opacity`}
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login