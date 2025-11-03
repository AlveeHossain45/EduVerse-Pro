import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
  AlertCircle,
  Users,
  Video,
  BarChart3,
  Bell
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../utils/storage'

const StudentDashboard = () => {
  const { isDark, currentTheme } = useTheme()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState({
    enrolledClasses: 0,
    upcomingExams: 0,
    pendingAssignments: 0,
    attendanceRate: 0
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [upcomingExams, setUpcomingExams] = useState([])
  const [recentGrades, setRecentGrades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = () => {
      try {
        // Get data from localStorage
        const classes = storage.get('classes')
        const exams = storage.get('exams')
        const attendance = storage.get('attendance')
        const users = storage.get('users')

        // Get student's class
        const studentClass = classes.find(c => c.id === user.classId)
        
        // Get upcoming exams for student's class
        const upcomingExamsList = exams.filter(e => 
          e.classId === user.classId &&
          new Date(e.scheduledDate) > new Date()
        )

        // Get student's attendance
        const studentAttendance = attendance.filter(a => a.studentId === user.id)
        const presentRecords = studentAttendance.filter(a => a.status === 'present')
        const attendanceRate = studentAttendance.length > 0 
          ? (presentRecords.length / studentAttendance.length * 100).toFixed(1) 
          : 0

        // Calculate statistics
        setStats({
          enrolledClasses: studentClass ? 1 : 0,
          upcomingExams: upcomingExamsList.length,
          pendingAssignments: 2, // Mock data
          attendanceRate: parseFloat(attendanceRate)
        })

        // Set upcoming exams
        setUpcomingExams(upcomingExamsList.slice(0, 3))

        // Generate recent grades (mock data)
        const mockGrades = [
          { subject: 'Mathematics', grade: 'A', score: 92, date: '2024-10-15' },
          { subject: 'Physics', grade: 'B+', score: 87, date: '2024-10-10' },
          { subject: 'Chemistry', grade: 'A-', score: 89, date: '2024-10-05' }
        ]
        setRecentGrades(mockGrades)

        // Generate recent activities
        const activities = [
          {
            id: 1,
            type: 'exam',
            icon: FileText,
            title: 'Exam Scheduled',
            description: 'Mathematics Midterm Exam next week',
            time: '2 hours ago',
            color: 'text-blue-500'
          },
          {
            id: 2,
            type: 'assignment',
            icon: BookOpen,
            title: 'New Assignment',
            description: 'Physics homework posted',
            time: '4 hours ago',
            color: 'text-green-500'
          },
          {
            id: 3,
            type: 'grade',
            icon: Award,
            title: 'Grade Posted',
            description: 'Chemistry quiz results available',
            time: '1 day ago',
            color: 'text-purple-500'
          },
          {
            id: 4,
            type: 'attendance',
            icon: CheckCircle,
            title: 'Attendance Marked',
            description: 'Present in Mathematics class',
            time: '2 days ago',
            color: 'text-emerald-500'
          }
        ]

        setRecentActivities(activities)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [user])

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

  const StatCard = ({ title, value, icon: Icon, color, delay = 0 }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={`relative overflow-hidden rounded-2xl p-6 ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg group hover:scale-[1.02] transition-all duration-300`}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 ${color}`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              {title}
            </p>
            <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </p>
          </div>
          
          <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </div>
    </motion.div>
  )

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
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Student Dashboard
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome back, {user?.name}! Track your progress and stay updated.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              title="Enrolled Classes"
              value={stats.enrolledClasses}
              icon={BookOpen}
              color="text-blue-500"
              delay={0}
            />
            <StatCard
              title="Upcoming Exams"
              value={stats.upcomingExams}
              icon={FileText}
              color="text-purple-500"
              delay={0.1}
            />
            <StatCard
              title="Pending Tasks"
              value={stats.pendingAssignments}
              icon={Clock}
              color="text-orange-500"
              delay={0.2}
            />
            <StatCard
              title="Attendance Rate"
              value={`${stats.attendanceRate}%`}
              icon={TrendingUp}
              color="text-green-500"
              delay={0.3}
            />
          </motion.div>

          {/* Upcoming Exams & Recent Grades */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Upcoming Exams */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className={`lg:col-span-2 p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Upcoming Exams
                </h3>
                <button 
                  onClick={() => window.location.href = '/student/exams'}
                  className={`px-4 py-2 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white text-sm font-medium hover:shadow-lg transition-all duration-200`}
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingExams.length > 0 ? upcomingExams.map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700/30' : 'border-gray-200'} hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30`}>
                          <FileText className="w-5 h-5 text-blue-500" />
                        </div>
                        
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {exam.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1`}>
                              <Calendar className="w-4 h-4" />
                              {new Date(exam.scheduledDate).toLocaleDateString()}
                            </span>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1`}>
                              <Clock className="w-4 h-4" />
                              {exam.duration} minutes
                            </span>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {exam.totalMarks} marks
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => window.location.href = `/student/exam/${exam.id}`}
                        className={`px-4 py-2 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white text-sm font-medium hover:shadow-lg transition-all duration-200`}
                      >
                        Start Exam
                      </button>
                    </div>
                  </motion.div>
                )) : (
                  <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No upcoming exams scheduled</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Grades */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Grades
                </h3>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}>
                  <Award className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700/30' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {grade.subject}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {grade.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${grade.score >= 90 ? 'text-green-500' : grade.score >= 80 ? 'text-blue-500' : grade.score >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                          {grade.grade}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {grade.score}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activities */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
          >
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Recent Activities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700/30' : 'border-gray-200'} hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                          {activity.title}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                          {activity.description}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard