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
  Plus,
  LogOut
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
  const { isDark, currentTheme } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25
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
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={`fixed top-16 left-0 bottom-0 w-72 ${isDark ? 'glass-dark border-gray-700/30' : 'glass border-white/20'} border-r z-50 flex flex-col`}
      >
        <div className="p-4 flex-1 overflow-y-auto">
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
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive
                        ? `bg-gradient-to-r ${currentTheme.primary} text-white shadow-lg`
                        : isDark
                          ? 'text-gray-300 hover:bg-gray-700/30'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : (isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-700')}`} />
                    
                    <div className="flex-1">
                      <p className={`font-medium text-sm transition-colors duration-200 ${isActive ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900')}`}>
                        {item.title}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isDark ? 'bg-gray-800 hover:bg-red-900/20' : 'bg-gray-100 hover:bg-red-50'} text-red-500 transition-colors duration-200`}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar