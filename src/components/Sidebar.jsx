import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Calendar,
  DollarSign,
  Settings,
  Award,
  MessageSquare,
  BarChart3,
  Clock,
  Video,
  Edit3,
  Plus
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
  const { isDark, currentTheme } = useTheme()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = {
    admin: [
      { title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', description: 'Overview and analytics' },
      { title: 'Manage Users', icon: Users, path: '/admin/users', description: 'Add, edit, delete users' },
      { title: 'Classes', icon: GraduationCap, path: '/admin/classes', description: 'Manage classes and subjects' },
      { title: 'Exams', icon: FileText, path: '/admin/exams', description: 'Exam management' },
      { title: 'Attendance', icon: Calendar, path: '/admin/attendance', description: 'Attendance reports' },
      { title: 'Finance', icon: DollarSign, path: '/admin/finance', description: 'Fee management' },
      { title: 'Reports', icon: BarChart3, path: '/admin/reports', description: 'Analytics and reports' },
      { title: 'Settings', icon: Settings, path: '/admin/settings', description: 'System settings' }
    ],
    teacher: [
      { title: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard', description: 'Overview and schedule' },
      { title: 'My Classes', icon: GraduationCap, path: '/teacher/classes', description: 'Manage your classes' },
      { title: 'Create Exam', icon: Plus, path: '/teacher/exams', description: 'Create new exams' },
      { title: 'Assignments', icon: Edit3, path: '/teacher/assignments', description: 'Manage assignments' },
      { title: 'Attendance', icon: Calendar, path: '/teacher/attendance', description: 'Mark attendance' },
      { title: 'Online Classes', icon: Video, path: '/teacher/online-classes', description: 'Schedule online classes' },
      { title: 'Messages', icon: MessageSquare, path: '/teacher/messages', description: 'Communicate with students' }
    ],
    student: [
      { title: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard', description: 'Overview and updates' },
      { title: 'My Classes', icon: GraduationCap, path: '/student/classes', description: 'View enrolled classes' },
      { title: 'Exams', icon: FileText, path: '/student/exams', description: 'Take exams' },
      { title: 'Assignments', icon: Edit3, path: '/student/assignments', description: 'View and submit assignments' },
      { title: 'Attendance', icon: Calendar, path: '/student/attendance', description: 'View attendance record' },
      { title: 'Results', icon: Award, path: '/student/results', description: 'View grades and results' },
      { title: 'Online Classes', icon: Video, path: '/student/online-classes', description: 'Join online classes' },
      { title: 'Messages', icon: MessageSquare, path: '/student/messages', description: 'Communicate with teachers' }
    ],
    accountant: [
      { title: 'Dashboard', icon: LayoutDashboard, path: '/accountant/dashboard', description: 'Financial overview' },
      { title: 'Fee Management', icon: DollarSign, path: '/accountant/payments', description: 'Manage student fees' },
      { title: 'Invoices', icon: FileText, path: '/accountant/invoices', description: 'Generate and manage invoices' },
      { title: 'Reports', icon: BarChart3, path: '/accountant/reports', description: 'Financial reports' },
      { title: 'Settings', icon: Settings, path: '/accountant/settings', description: 'Account settings' }
    ]
  }

  const currentMenuItems = menuItems[user?.role] || []

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: -300,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300
      }
    })
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      {/* 
        নিচের লাইনে z-30 কে z-50 করা হয়েছে। 
        এটাই মূল সমাধান।
      */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={`fixed top-16 left-0 bottom-0 w-72 ${isDark ? 'glass-dark border-gray-700/30' : 'glass border-white/20'} border-r z-50 overflow-y-auto`}
      >
        <div className="p-4">
          {/* User Info */}
          <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                alt={user?.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user?.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {currentMenuItems.map((item, index) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              return (
                <motion.div
                  key={item.path}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? isDark 
                          ? 'sidebar-link-active-dark shadow-lg' 
                          : 'sidebar-link-active shadow-lg'
                        : isDark 
                          ? 'sidebar-link-dark' 
                          : 'sidebar-link'
                      }
                      ${isDark ? 'text-white' : 'text-gray-700'}
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? `bg-gradient-to-r ${currentTheme.primary} text-white shadow-md` 
                        : isDark 
                          ? 'bg-gray-700/30 text-gray-400 group-hover:bg-gray-700/50 group-hover:text-white' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${isActive ? 'text-white' : ''}`}>
                        {item.title}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-white/80' : isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {item.description}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={`w-1 h-8 rounded-full bg-gradient-to-r ${currentTheme.primary}`}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-3 px-4`}>
              QUICK ACTIONS
            </h4>
            
            <div className="space-y-2">
              {user?.role === 'teacher' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isDark ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} text-white shadow-lg`}
                  onClick={() => {
                    navigate('/teacher/exams')
                    onClose()
                  }}
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Create Quick Exam</span>
                </motion.button>
              )}

              {user?.role === 'student' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isDark ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'} text-white shadow-lg`}
                  onClick={() => {
                    navigate('/student/exams')
                    onClose()
                  }}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Available Exams</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar