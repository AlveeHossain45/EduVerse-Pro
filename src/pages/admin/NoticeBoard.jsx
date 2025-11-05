import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Plus, Edit, Trash } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext'; // Auth hook import
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const NoticeBoard = () => {
    const { isDark, currentTheme } = useTheme();
    const { user } = useAuth(); // Get current user info
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notices, setNotices] = useState([
        { id: 1, title: 'Mid-term Exam Schedule', content: 'The mid-term exams will commence from the 20th of this month.', category: 'Exam', priority: 'High', date: '2025-11-04' },
        { id: 2, title: 'Annual Sports Day', content: 'The annual sports day will be held on the last Friday of this month. All students are requested to participate.', category: 'Event', priority: 'Medium', date: '2025-11-02' },
        { id: 3, title: 'Library Closure', content: 'The library will be closed for maintenance this weekend.', category: 'General', priority: 'Low', date: '2025-11-01' },
    ]);
    const [selectedNotice, setSelectedNotice] = useState(notices[0]);
    
    // Check if the user is admin or teacher
    const canManageNotices = user?.role === 'admin' || user?.role === 'teacher';

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            default: return 'bg-green-500/10 text-green-500 border-green-500/20';
        }
    };
    
    return (
        <div className={`min-h-screen ${isDark ? currentTheme.dark.bg : currentTheme.light.bg}`}>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
                <div className="p-6 lg:p-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Notice Board</h1>
                                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {canManageNotices ? 'Manage and publish official notices' : 'View all official notices'}
                                </p>
                            </div>
                            {/* "Create Notice" button only for admin and teacher */}
                            {canManageNotices && (
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl flex items-center gap-2`}>
                                    <Plus className="w-5 h-5" /> Create Notice
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
                            <div className={`p-4 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg h-[60vh] overflow-y-auto`}>
                                {notices.map(notice => (
                                    <div key={notice.id} onClick={() => setSelectedNotice(notice)} className={`p-4 mb-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${selectedNotice.id === notice.id ? `${getPriorityStyle(notice.priority)} bg-opacity-30` : `${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} border-transparent`}`}>
                                        <div className="flex justify-between items-start">
                                            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{notice.title}</h4>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyle(notice.priority)}`}>{notice.priority}</span>
                                        </div>
                                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(notice.date).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
                            {selectedNotice && (
                                <div className={`p-8 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`text-sm px-3 py-1 rounded-full mb-3 inline-block ${getPriorityStyle(selectedNotice.priority)}`}>{selectedNotice.category}</span>
                                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedNotice.title}</h2>
                                            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Published on {new Date(selectedNotice.date).toLocaleDateString()}</p>
                                        </div>
                                        {/* Edit and Delete buttons only for admin and teacher */}
                                        {canManageNotices && (
                                            <div className="flex gap-2">
                                                <button className="p-2 rounded-lg hover:bg-gray-500/10"><Edit className="w-4 h-4" /></button>
                                                <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash className="w-4 h-4" /></button>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`prose prose-sm ${isDark ? 'prose-invert' : ''} max-w-none`}>
                                        <p>{selectedNotice.content}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NoticeBoard;