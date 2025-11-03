import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'

const Finance = () => {
  const { isDark, currentTheme } = useTheme()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

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
                  Financial Management
                </h1>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overview of financial operations and metrics
                </p>
              </div>
            </div>
          </motion.div>

          {/* Financial Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { title: 'Total Revenue', value: '$125,450', change: '+12.5%', icon: TrendingUp, color: 'green' },
              { title: 'Pending Payments', value: '$8,320', change: '-3.2%', icon: CreditCard, color: 'yellow' },
              { title: 'Active Students', value: '1,248', change: '+8.1%', icon: Users, color: 'blue' },
              { title: 'Collection Rate', value: '94.2%', change: '+2.3%', icon: PieChart, color: 'purple' }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                custom={index}
                className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${stat.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : stat.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} font-medium`}>{stat.change}</p>
                    </div>
                  </div>
                  <div className={`text-right`}>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className={`w-6 h-6 ${currentTheme.text}`} />
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Transactions
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { id: 1, student: 'Emma Wilson', amount: 1500, date: '2024-11-01', status: 'paid', type: 'Tuition Fee' },
                { id: 2, student: 'John Smith', amount: 1200, date: '2024-11-01', status: 'pending', type: 'Tuition Fee' },
                { id: 3, student: 'Sarah Johnson', amount: 800, date: '2024-10-31', status: 'paid', type: 'Lab Fee' },
                { id: 4, student: 'Mike Davis', amount: 200, date: '2024-10-30', status: 'overdue', type: 'Library Fine' }
              ].map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  variants={itemVariants}
                  custom={index}
                  className={`p-4 rounded-xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} ${transaction.status === 'paid' ? 'border-l-4 border-green-500' : transaction.status === 'pending' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-red-500'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{transaction.student}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{transaction.type}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>${transaction.amount}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{transaction.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Finance