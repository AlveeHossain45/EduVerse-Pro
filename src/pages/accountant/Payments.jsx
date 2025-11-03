import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Search,
  Filter,
  Plus,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Receipt,
  Calendar,
  TrendingUp,
  ChevronDown,
  X
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../utils/storage'

const Payments = () => {
  const { isDark, currentTheme } = useTheme()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [fees, setFees] = useState([])
  const [filteredFees, setFilteredFees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedFee, setSelectedFee] = useState(null)
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: 'Credit Card',
    transactionId: '',
    notes: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFees()
  }, [])

  useEffect(() => {
    filterFees()
  }, [fees, searchTerm, statusFilter])

  const loadFees = () => {
    try {
      const feesData = storage.get('fees')
      setFees(feesData)
      setFilteredFees(feesData)
    } catch (error) {
      console.error('Error loading fees:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterFees = () => {
    let filtered = fees

    if (statusFilter !== 'all') {
      filtered = filtered.filter(fee => fee.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(fee =>
        fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredFees(filtered)
  }

  const openPaymentModal = (fee) => {
    setSelectedFee(fee)
    setPaymentData({
      amount: fee.balanceDue || fee.amount,
      paymentMethod: 'Credit Card',
      transactionId: '',
      notes: ''
    })
    setShowPaymentModal(true)
  }

  const recordPayment = () => {
    try {
      const updatedFees = fees.map(fee => {
        if (fee.id === selectedFee.id) {
          const paidAmount = parseFloat(paymentData.amount)
          const newBalance = (fee.balanceDue || fee.amount) - paidAmount
          
          return {
            ...fee,
            status: newBalance <= 0 ? 'paid' : 'partial',
            paidDate: fee.paidDate || new Date().toISOString().split('T')[0],
            paymentMethod: paymentData.paymentMethod,
            transactionId: paymentData.transactionId || `TXN${Date.now()}`,
            amountPaid: (fee.amountPaid || 0) + paidAmount,
            balanceDue: newBalance > 0 ? newBalance : 0,
            notes: paymentData.notes
          }
        }
        return fee
      })

      setFees(updatedFees)
      storage.set('fees', updatedFees)
      
      setShowPaymentModal(false)
      setSelectedFee(null)
      setPaymentData({
        amount: '',
        paymentMethod: 'Credit Card',
        transactionId: '',
        notes: ''
      })
    } catch (error) {
      console.error('Error recording payment:', error)
      alert('Error recording payment. Please try again.')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      paid: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-400', label: 'Paid' },
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-400', label: 'Pending' },
      partial: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-400', label: 'Partial' }
    }
    return badges[status] || badges.pending
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

  const totalRevenue = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0)
  const totalPending = fees.filter(f => f.status === 'pending' || f.status === 'partial').reduce((sum, f) => sum + (f.balanceDue || f.amount), 0)

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
                  Fee Management
                </h1>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage student fees and payments
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl flex items-center gap-2`}
              >
                <Download className="w-5 h-5" />
                Export Report
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl p-6 ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    Total Revenue
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${(totalRevenue / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className={`p-3 rounded-xl text-green-500 bg-opacity-10`}>
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl p-6 ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    Pending Fees
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${(totalPending / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className={`p-3 rounded-xl text-yellow-500 bg-opacity-10`}>
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl p-6 ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    Total Students
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {fees.length}
                  </p>
                </div>
                <div className={`p-3 rounded-xl text-blue-500 bg-opacity-10`}>
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg mb-6`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`pl-10 pr-10 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white' : 'text-gray-900'} appearance-none cursor-pointer`}
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                </select>
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
          </motion.div>

          {/* Fees Table */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg overflow-hidden`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-50/50'} border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200'}`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                      Student
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                      Description
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                      Amount
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                      Due Date
                    </th>
                    <th className={`px-6 py-4 text-right text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700/30' : 'divide-gray-200'}`}>
                  {filteredFees.map((fee, index) => {
                    const statusBadge = getStatusBadge(fee.status)
                    return (
                      <motion.tr
                        key={fee.id}
                        variants={itemVariants}
                        className={`${isDark ? 'hover:bg-gray-800/30' : 'hover:bg-gray-50'} transition-colors`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {fee.studentName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {fee.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              ${fee.amount.toLocaleString()}
                            </div>
                            {fee.balanceDue && fee.balanceDue > 0 && (
                              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Due: ${fee.balanceDue.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'">
                          {fee.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            {fee.status !== 'paid' && (
                              <button
                                onClick={() => openPaymentModal(fee)}
                                className={`px-3 py-1 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white text-xs font-medium hover:shadow-lg transition-all duration-200`}
                              >
                                Record Payment
                              </button>
                            )}
                            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}>
                              <Receipt className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Payment Modal */}
          {showPaymentModal && selectedFee && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-full max-w-md p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Record Payment
                  </h3>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>

                <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Student:</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFee.studentName}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Amount:</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>${selectedFee.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Balance Due:</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>${(selectedFee.balanceDue || selectedFee.amount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Payment Amount
                    </label>
                    <input
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      placeholder="Enter amount"
                      className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white' : 'text-gray-900'}`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Payment Method
                    </label>
                    <select
                      value={paymentData.paymentMethod}
                      onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Check">Check</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      value={paymentData.transactionId}
                      onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                      placeholder="Enter transaction ID"
                      className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white' : 'text-gray-900'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Notes
                    </label>
                    <textarea
                      value={paymentData.notes}
                      onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                      placeholder="Add notes (optional)"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'} ${isDark ? 'text-white' : 'text-gray-900'}`}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className={`flex-1 px-4 py-3 rounded-xl ${isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'} ${isDark ? 'text-white' : 'text-gray-900'} transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={recordPayment}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    Record Payment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Payments