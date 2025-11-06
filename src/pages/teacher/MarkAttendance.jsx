import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../utils/storage';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const MarkAttendance = () => {
    const { isDark, currentTheme } = useTheme();
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const teacherClasses = storage.get('classes').filter(c => c.teacherId === user.id);
        setClasses(teacherClasses);
        if (teacherClasses.length > 0) {
            setSelectedClassId(teacherClasses[0].id);
        }
    }, [user.id]);

    useEffect(() => {
        if (selectedClassId) {
            const allUsers = storage.get('users');
            const classStudents = allUsers.filter(u => u.role === 'student' && u.classId === selectedClassId);
            setStudents(classStudents);
            
            const allAttendance = storage.get('attendance') || [];
            const todaysAttendance = allAttendance.filter(att => att.classId === selectedClassId && att.date === selectedDate);
            
            if (todaysAttendance.length > 0) {
                const data = {};
                todaysAttendance.forEach(rec => { data[rec.studentId] = rec.status; });
                setAttendanceData(data);
                setIsSaved(true);
            } else {
                const initialData = {};
                classStudents.forEach(student => { initialData[student.id] = 'present'; });
                setAttendanceData(initialData);
                setIsSaved(false);
            }
        }
    }, [selectedClassId, selectedDate]);

    const handleAttendanceChange = (studentId, status) => {
        if (isSaved) return;
        setAttendanceData(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSaveAttendance = () => {
        let allAttendance = storage.get('attendance') || [];
        allAttendance = allAttendance.filter(att => !(att.classId === selectedClassId && att.date === selectedDate));
        
        students.forEach(student => {
            allAttendance.push({
                id: `att_${student.id}_${selectedDate.replace(/-/g, '')}`,
                studentId: student.id,
                studentName: student.name,
                classId: selectedClassId,
                className: classes.find(c => c.id === selectedClassId)?.name,
                date: selectedDate,
                status: attendanceData[student.id],
                markedBy: user.id
            });
        });

        storage.set('attendance', allAttendance);
        setIsSaved(true);
    };

    return (
        <div className={`min-h-screen ${isDark ? currentTheme.dark.bg : currentTheme.light.bg}`}>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
                <div className="p-6 lg:p-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Mark Attendance</h1>
                        <p className={`text-lg mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Select a class and date to mark student attendance.</p>
                    </motion.div>

                    <div className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'} shadow-premium-lg`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Select Class</label>
                                <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className={`w-full p-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'}`}>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.name} - {c.subject}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Select Date</label>
                                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className={`w-full p-3 rounded-xl ${isDark ? 'input-glass-dark' : 'input-glass'}`} />
                            </div>
                        </div>

                        {isSaved && (
                            <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-green-500/10 text-green-500">
                                <AlertCircle className="w-5 h-5" />
                                <p className="text-sm font-medium">Attendance for this date has already been saved.</p>
                            </div>
                        )}

                        <div className="space-y-3">
                            {students.length > 0 ? students.map(student => (
                                <motion.div key={student.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                                    <div className="flex items-center gap-4">
                                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{student.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAttendanceChange(student.id, 'present')} disabled={isSaved} className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-all ${attendanceData[student.id] === 'present' ? 'bg-green-500 text-white shadow-md' : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${isSaved ? 'cursor-not-allowed opacity-70' : ''}`}>
                                            Present
                                        </button>
                                        <button onClick={() => handleAttendanceChange(student.id, 'absent')} disabled={isSaved} className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-all ${attendanceData[student.id] === 'absent' ? 'bg-red-500 text-white shadow-md' : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${isSaved ? 'cursor-not-allowed opacity-70' : ''}`}>
                                            Absent
                                        </button>
                                    </div>
                                </motion.div>
                            )) : <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No students found in this class.</p>}
                        </div>
                        
                        {!isSaved && students.length > 0 && (
                            <div className="mt-6 flex justify-end">
                                <motion.button onClick={handleSaveAttendance} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${currentTheme.primary} shadow-lg flex items-center gap-2`}>
                                    <Save className="w-5 h-5" /> Save Attendance
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarkAttendance;