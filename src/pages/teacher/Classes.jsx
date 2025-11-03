import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  Video,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  MapPin,
  Award
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../utils/storage'

const Classes = () => {
  const { isDark, currentTheme } = useTheme()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [classes, setClasses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadClasses()
  }, [])

  useEffect(() => {
    filterClasses()
  }, [classes, searchTerm])

  const loadClasses = () => {
    try {
      const classesData = storage.get('classes')
      const users = storage.get('users')
      
      // Get teacher's classes
      const teacherClasses = classesData.filter(c => c.teacherId === user.id)
      
      // Get student count for each class
      const classesWithStudentCount = teacherClasses.map(cls => {
        const students = users.filter(u => u.role === 'student' && u.classId === cls.id)
        return {
          ...cls,
          studentCount: students.length
        }
      })
      
      setClasses(classesWithStudentCount)
    } catch (error) {
      console.error('Error loading classes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterClasses = () => {
    if (!searchTerm) return classes
    
    return classes.filter(cls =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const filteredClasses = filterClasses()

  return (
    <div className={`min-h-screen ${isDark ? currentTheme.dark.bg : currentTheme.light.bg}`}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  My Classes
                </h1>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your classes and track student progress
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl flex items-center gap-2`}
              >
                <Plus className="w-5 h-5" />
                Create Class
              </motion.button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`mb-6 p-4 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
          >
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
              />
            </div>
          </motion.div>

          {/* Classes Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg group cursor-pointer`}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 ${currentTheme.text}`} />
                
                <div className="relative z-10 p-6">
                  {/* Class Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${currentTheme.text} bg-opacity-10`}>
                      <BookOpen className={`w-6 h-6 ${currentTheme.text}`} />
                    </div>
                    <div className="flex gap-2">
                      <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}>
                        <Edit3 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                      </button>
                      <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'} transition-colors`}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Class Info */}
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {classItem.name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                    {classItem.description}
                  </p>

                  {/* Class Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {classItem.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {classItem.schedule}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {classItem.room}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {classItem.studentCount} students
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${currentTheme.primary} text-white hover:shadow-lg transition-all duration-200`}>
                      Manage
                    </button>
                    <button className={`px-3 py-2 rounded-lg text-sm font-medium ${isDark ? 'bg-gray-700/30 hover:bg-gray-700/50 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} transition-colors flex items-center gap-1`}>
                      <Video className="w-4 h-4" />
                      Online
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredClasses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No classes found
              </h3>
              <p className="mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first class to get started'}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto`}
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Class
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Classes