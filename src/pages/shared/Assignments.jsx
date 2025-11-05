import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Edit3,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Search,
  Filter
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../utils/storage'

const Assignments = () => {
  const { isDark, currentTheme } = useTheme()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [assignments, setAssignments] = useState([])
  const [filteredAssignments, setFilteredAssignments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAssignments()
  }, [])

  useEffect(() => {
    filterAssignments()
  }, [assignments, searchTerm, filterStatus])

  const loadAssignments = () => {
    try {
      // Mock data, in a real app this would come from an API
      const mockData = [
        { id: 1, title: 'Algebra Homework', subject: 'Mathematics', dueDate: '2024-11-10', status: 'pending', description: 'Complete exercises 1-10 from chapter 5.', points: 100 },
        { id: 2, title: 'Lab Report: Photosynthesis', subject: 'Biology', dueDate: '2024-11-12', status: 'submitted', description: 'Write a 5-page report on the photosynthesis experiment.', points: 150 },
        { id: 3, title: 'Essay: The Great Gatsby', subject: 'Literature', dueDate: '2024-11-05', status: 'graded', description: 'Analyze the symbolism of the green light.', points: 200, grade: 'A-' }
      ]
      const assignmentsData = storage.get('assignments') || mockData
      setAssignments(assignmentsData)
      setFilteredAssignments(assignmentsData)
    } catch (error) {
      console.error('Error loading assignments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAssignments = () => {
    let filtered = assignments

    if (filterStatus !== 'all') {
      filtered = filtered.filter(assignment => assignment.status === filterStatus)
    }

    if (searchTerm) {
      filtered = filtered.filter(assignment =>
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAssignments(filtered)
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
                  Assignments
                </h1>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user?.role === 'teacher' ? 'Create and manage student assignments' : 'View and submit your assignments'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className={`mb-6 p-4 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>
              
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-10 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white' : 'text-gray-900'} appearance-none cursor-pointer`}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="graded">Graded</option>
                </select>
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
          </motion.div>

          {/* Assignments Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      assignment.status === 'graded' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                      assignment.status === 'submitted' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {assignment.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {assignment.subject}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    assignment.status === 'graded' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {assignment.status}
                  </div>
                </div>

                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 line-clamp-2`}>
                  {assignment.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Due: {assignment.dueDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {assignment.points} points
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <motion.button
                    onClick={() => alert(`Viewing assignment: ${assignment.title}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium ${
                      assignment.status === 'graded'
                        ? isDark ? 'bg-gray-700/30 text-gray-400 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : isDark ? `bg-blue-600/20 text-blue-400 hover:bg-blue-600/30` : `bg-blue-100 text-blue-600 hover:bg-blue-200`
                    } transition-colors`}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{user?.role === 'teacher' ? 'Edit' : 'View / Submit'}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Assignments