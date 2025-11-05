// Mock data seeding utility for EduVersePro
// This creates initial data for demonstration purposes

export const seedMockData = async () => {
  // Check if users data already exists. If not, seed everything.
  // This is a more robust way to prevent re-seeding issues.
  if (!localStorage.getItem('users')) {
    console.log('No user data found. Seeding new mock data...');

    // Seed Users
    const users = [
      {
        id: 'admin_001',
        name: 'System Administrator',
        email: 'admin@eduversepro.com',
        password: 'admin123',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff',
        createdAt: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'teacher_001',
        name: 'Sarah Johnson',
        email: 'teacher@eduversepro.com',
        password: 'teacher123',
        role: 'teacher',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff',
        createdAt: new Date().toISOString(),
        status: 'active',
        subjects: ['Mathematics', 'Physics'],
        classes: ['class_001', 'class_002']
      },
      {
        id: 'student_001',
        name: 'Emma Wilson',
        email: 'student@eduversepro.com',
        password: 'student123',
        role: 'student',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=10b981&color=fff',
        createdAt: new Date().toISOString(),
        status: 'active',
        grade: '10th Grade',
        classId: 'class_001',
        parentEmail: 'wilson.parent@email.com'
      },
      {
        id: 'accountant_001',
        name: 'Robert Martinez',
        email: 'accountant@eduversepro.com',
        password: 'accountant123',
        role: 'accountant',
        avatar: 'https://ui-avatars.com/api/?name=Robert+Martinez&background=8b5cf6&color=fff',
        createdAt: new Date().toISOString(),
        status: 'active'
      }
    ];

    // Seed Classes
    const classes = [
      { id: 'class_001', name: 'Mathematics 10A', description: 'Advanced Mathematics for 10th Grade', teacherId: 'teacher_001', subject: 'Mathematics', schedule: 'Mon, Wed, Fri - 9:00 AM', room: 'Room 201', maxStudents: 30 },
      { id: 'class_002', name: 'Physics Fundamentals', description: 'Introduction to Classical Mechanics.', teacherId: 'teacher_001', subject: 'Physics', schedule: 'Tue, Thu - 10:30 AM', room: 'Lab 101', maxStudents: 25 }
    ];

    // Seed Exams, Settings, etc.
    const exams = [ { id: 'exam_001', title: 'Mathematics Midterm Exam', description: 'Midterm exam.', teacherId: 'teacher_001', classId: 'class_001', duration: 90, totalMarks: 100, questions: [], scheduledDate: new Date().toISOString(), status: 'scheduled' } ];
    const settings = { siteName: 'EduVersePro', academicYear: '2024-2025' };
    const attendance = [ { id: 'att_001', studentId: 'student_001', classId: 'class_001', date: new Date().toISOString().split('T')[0], status: 'present' } ];
    const fees = [ { id: 'fee_001', studentId: 'student_001', studentName: 'Emma Wilson', amount: 1500, description: 'Tuition Fee - Fall Semester', dueDate: new Date().toISOString().split('T')[0], status: 'paid', paidDate: new Date().toISOString().split('T')[0] } ];

    // Save all data to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('classes', JSON.stringify(classes));
    localStorage.setItem('exams', JSON.stringify(exams));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('attendance', JSON.stringify(attendance));
    localStorage.setItem('fees', JSON.stringify(fees));
    
    console.log('Mock data seeded successfully!');
  }
};

// Utility functions for data management
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, error);
      return [];
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },
  getObject: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, error);
      return {};
    }
  },
  setObject: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  }
};