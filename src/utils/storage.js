// Mock data seeding utility for EduVersePro
// This creates initial data for demonstration purposes

const DATA_VERSION = '1.2'; // Change this version to force re-seeding of data

export const seedMockData = async () => {
  const currentVersion = localStorage.getItem('data_version');

  // If versions don't match, clear old data and re-seed
  if (currentVersion !== DATA_VERSION) {
    localStorage.clear();
    console.log('Data version mismatch. Clearing old data and seeding new data for version:', DATA_VERSION);

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
      {
        id: 'class_001',
        name: 'Mathematics 10A',
        description: 'Advanced Mathematics for 10th Grade',
        teacherId: 'teacher_001',
        subject: 'Mathematics',
        schedule: 'Mon, Wed, Fri - 9:00 AM',
        room: 'Room 201',
        maxStudents: 30
      },
      {
        id: 'class_002',
        name: 'Physics Fundamentals',
        description: 'Introduction to Classical Mechanics and Electromagnetism.',
        teacherId: 'teacher_001',
        subject: 'Physics',
        schedule: 'Tue, Thu - 10:30 AM',
        room: 'Lab 101',
        maxStudents: 25
      }
    ];

    // Seed Exams
    const exams = [
      {
        id: 'exam_001',
        title: 'Mathematics Midterm Exam',
        description: 'Comprehensive midterm covering algebra and geometry',
        teacherId: 'teacher_001',
        classId: 'class_001',
        duration: 90,
        totalMarks: 100,
        questions: [
          { id: 'q1', question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: 1, marks: 10 },
          { id: 'q2', question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], correctAnswer: 2, marks: 10 },
        ],
        scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled'
      }
    ];

    // Seed Settings
    const settings = {
      siteName: 'EduVersePro',
      siteDescription: 'Advanced Student Management System',
      maintenanceMode: false,
      allowRegistration: true,
      defaultTheme: 'blue',
      academicYear: '2024-2025',
      semester: 'Fall'
    };

    // Seed Attendance Records
    const attendance = [
      { id: 'att_001', studentId: 'student_001', classId: 'class_001', date: new Date().toISOString().split('T')[0], status: 'present' }
    ];

    // Seed Fee Records
    const fees = [
      { id: 'fee_001', studentId: 'student_001', studentName: 'Emma Wilson', amount: 1500, description: 'Tuition Fee - Fall Semester', dueDate: new Date().toISOString().split('T')[0], status: 'paid', paidDate: new Date().toISOString().split('T')[0] },
      { id: 'fee_002', studentId: 'student_001', studentName: 'Emma Wilson', amount: 200, description: 'Lab Fee', dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending' }
    ];

    // Save all data to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('classes', JSON.stringify(classes));
    localStorage.setItem('exams', JSON.stringify(exams));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('attendance', JSON.stringify(attendance));
    localStorage.setItem('fees', JSON.stringify(fees));
    
    // Set the new data version
    localStorage.setItem('data_version', DATA_VERSION);
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