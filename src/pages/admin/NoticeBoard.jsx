import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Plus, Edit, Trash, Users, GraduationCap, Globe, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../utils/storage';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const NoticeBoard = () => {
    const { isDark, currentTheme } = useTheme();
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', category: 'General', priority: 'Medium', audience: 'Everyone' });

    useEffect(() => {
        loadNotices();
    }, []);

    const loadNotices = () => {
        const storedNotices = storage.get('notices');
        if (storedNotices.length === 0) {
            const mockNotices = [
                { id: 1, title: 'Mid-term Exam Schedule', content: 'The mid-term exams will commence from the 20th of this month.', category: 'Exam', priority: 'High', audience: 'Students', date: '2025-11-04' },
                { id: 2, title: 'Annual Sports Day', content: 'The annual sports day will be held on the last Friday of this month.', category: 'Event', priority: 'Medium', audience: 'Everyone', date: '2025-11-02' },
                { id: 3, title: 'Faculty Meeting', content: 'A mandatory meeting for all faculty members is scheduled for this Wednesday.', category: 'General', priority: 'High', audience: 'Teachers', date: '2025-11-01' },
            ];
            storage.set('notices', mockNotices);
            setNotices(mockNotices);
            setSelectedNotice(mockNotices[0]);
        } else {
            setNotices(storedNotices);
            if (!selectedNotice && storedNotices.length > 0) {
                setSelectedNotice(storedNotices[0]);
            }
        }
    };

    const canManageNotices = user?.role === 'admin' || user?.role === 'teacher';

    const handleOpenModal = (notice = null) => {
        if (notice) {
            setIsEditing(true);
            setSelectedNotice(notice);
            setFormData({ title: notice.title, content: notice.content, category: notice.category, priority: notice.priority, audience: notice.audience });
        } else {
            setIsEditing(false);
            setFormData({ title: '', content: '', category: 'General', priority: 'Medium', audience: 'Everyone' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedNotices = notices.map(n => n.id === selectedNotice.id ? { ...n, ...formData, date: new Date().toISOString().split('T')[0] } : n);
            setNotices(updatedNotices);
            storage.set('notices', updatedNotices);
        } else {
            const newNotice = { id: Date.now(), ...formData, date: new Date().toISOString().split('T')[0] };
            const updatedNotices = [newNotice, ...notices];
            setNotices(updatedNotices);
            storage.set('notices', updatedNotices);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            const updatedNotices = notices.filter(n => n.id !== id);
            setNotices(updatedNotices);
            storage.set('notices', updatedNotices);
            if (selectedNotice && selectedNotice.id === id) {
                setSelectedNotice(updatedNotices[0] || null);
            }
        }
    };

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            default: return 'bg-green-500/10 text-green-500 border-green-500/20';
        }
    };

    const getAudienceIcon = (audience) => {
        switch(audience) {
            case 'Students': return <Users className="w-4 h-4" />;
            case 'Teachers': return <GraduationCap className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
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
                                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{canManageNotices ? 'Manage and publish official notices' : 'View all official notices'}</p>
                            </div>
                            {canManageNotices && (
                                <motion.button onClick={() => handleOpenModal()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl flex items-center gap-2`}>
                                    <Plus className="w-5 h-5" /> Create Notice
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
                            <div className={`p-4 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg h-[65vh] overflow-y-auto`}>
                                {notices.map(notice => (
                                    <div key={notice.id} onClick={() => setSelectedNotice(notice)} className={`p-4 mb-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${selectedNotice?.id === notice.id ? `${getPriorityStyle(notice.priority)} bg-opacity-30` : `${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} border-transparent`}`}>
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
                                            <div className="flex items-center gap-4 mb-3">
                                                <span className={`text-sm px-3 py-1 rounded-full inline-block ${getPriorityStyle(selectedNotice.priority)}`}>{selectedNotice.category}</span>
                                                <span className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>{getAudienceIcon(selectedNotice.audience)} {selectedNotice.audience}</span>
                                            </div>
                                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedNotice.title}</h2>
                                            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Published on {new Date(selectedNotice.date).toLocaleDateString()}</p>
                                        </div>
                                        {canManageNotices && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOpenModal(selectedNotice)} className="p-2 rounded-lg hover:bg-gray-500/10"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(selectedNotice.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash className="w-4 h-4" /></button>
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
            
            {showModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.form onSubmit={handleSubmit} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full max-w-lg p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{isEditing ? 'Edit Notice' : 'Create New Notice'}</h3>
                            <button type="button" onClick={handleCloseModal} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'}`}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <input required type="text" placeholder="Notice Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'}`} />
                            <textarea required placeholder="Notice Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'}`} rows="5"></textarea>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'}`}><option>General</option><option>Exam</option><option>Event</option></select>
                                <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'}`}><option>Low</option><option>Medium</option><option>High</option></select>
                                <select value={formData.audience} onChange={(e) => setFormData({ ...formData, audience: e.target.value })} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'}`}><option>Everyone</option><option>Teachers</option><option>Students</option></select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={handleCloseModal} className={`flex-1 px-4 py-3 rounded-xl ${isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'}`}>Cancel</button>
                            <button type="submit" className={`flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg`}>{isEditing ? 'Update Notice' : 'Publish Notice'}</button>
                        </div>
                    </motion.form>
                </motion.div>
            )}
        </div>
    );
};

export default NoticeBoard;