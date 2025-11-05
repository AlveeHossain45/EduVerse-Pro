// Mock data seeding utility for EduVersePro
// This creates initial data for demonstration purposes

export const seedMockData = async () => {
  // Check if data already exists
  const existingUsers = localStorage.getItem('users')
  
  // To apply changes, clear localStorage or remove this check temporarily
  if (existingUsers) {
    // Basic check to see if emails need updating
    const users = JSON.parse(existingUsers);
    const needsUpdate = users.some(u => u.email === 'sarah.johnson@eduversepro.com'); // old email check
    if (!needsUpdate) return; 
  }

  // Clear old data to ensure re-seeding
  localStorage.removeItem('users');
  localStorage.removeItem('classes');
  localStorage.removeItem('exams');
  localStorage.removeItem('settings');
  localStorage.removeItem('attendance');
  localStorage.removeItem('fees');


  // Seed Users
  const users = [
    {
      id: 'admin_001',
      name: 'System Administrator',
      email: 'admin@eduversepro.com', // পরিবর্তিত ইমেল
      password: 'admin123',
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=3B82F6&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'teacher_001',
      name: 'Sarah Johnson',
      email: 'teacher@eduversepro.com', // পরিবর্তিত ইমেল
      password: 'teacher123',
      role: 'teacher',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active',
      subjects: ['Mathematics', 'Physics'],
      classes: ['class_001', 'class_002']
    },
    {
      id: 'teacher_002',
      name: 'Michael Chen',
      email: 'michael.chen@eduversepro.com',
      password: 'teacher123',
      role: 'teacher',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=8B5CF6&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active',
      subjects: ['Computer Science', 'Chemistry'],
      classes: ['class_003']
    },
    {
      id: 'student_001',
      name: 'Emma Wilson',
      email: 'student@eduversepro.com', // পরিবর্তিত ইমেল
      password: 'student123',
      role: 'student',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=EC4899&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active',
      grade: '10th Grade',
      classId: 'class_001',
      parentEmail: 'wilson.parent@email.com'
    },
    {
      id: 'student_002',
      name: 'James Rodriguez',
      email: 'james.rodriguez@eduversepro.com',
      password: 'student123',
      role: 'student',
      avatar: 'https://ui-avatars.com/api/?name=James+Rodriguez&background=F59E0B&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active',
      grade: '10th Grade',
      classId: 'class_001',
      parentEmail: 'rodriguez.parent@email.com'
    },
    {
      id: 'accountant_001',
      name: 'Robert Martinez',
      email: 'accountant@eduversepro.com', // পরিবর্তিত ইমেল
      password: 'accountant123',
      role: 'accountant',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Martinez&background=6366F1&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active'
    }
  ]

  // Seed Classes
  const classes = [
    {
      id: 'class_001',
      name: 'Mathematics 10A',
      description: 'Advanced Mathematics for 10th Grade',
      teacherId: 'teacher_001',
      teacherName: 'Sarah Johnson',
      subject: 'Mathematics',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      room: 'Room 201',
      maxStudents: 30,
      currentStudents: 2,
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      id: 'class_002',
      description: 'Physics Fundamentals',
      teacherId: 'teacher_001',
      teacherName: 'Sarah Johnson',
      subject: 'Physics',
      schedule: 'Tue, Thu - 10:30 AM',
      room: 'Lab 101',
      maxStudents: 25,
      currentStudents: 1,
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      id: 'class_003',
      name: 'Computer Science 11',
      description: 'Introduction to Programming',
      teacherId: 'teacher_002',
      teacherName: 'Michael Chen',
      subject: 'Computer Science',
      schedule: 'Mon, Wed, Fri - 2:00 PM',
      room: 'Computer Lab 3',
      maxStudents: 20,
      currentStudents: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ]

  // Seed Exams
  const exams = [
    {
      id: 'exam_001',
      title: 'Mathematics Midterm Exam',
      description: 'Comprehensive midterm covering algebra and geometry',
      teacherId: 'teacher_001',
      teacherName: 'Sarah Johnson',
      classId: 'class_001',
      className: 'Mathematics 10A',
      duration: 90, // minutes
      totalMarks: 100,
      questions: [
        { id: 'q1', question: 'What is the derivative of x² + 3x + 2?', options: ['2x + 3', '2x + 2', 'x + 3', '2x'], correctAnswer: 0, marks: 10 },
        { id: 'q2', question: 'Solve for x: 2x + 5 = 15', options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'], correctAnswer: 0, marks: 10 },
        { id: 'q3', question: 'What is the area of a circle with radius 5?', options: ['25π', '10π', '5π', '50π'], correctAnswer: 0, marks: 10 }
      ],
      scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }
  ]

  // Seed Settings
  const settings = {
    siteName: 'EduVersePro',
    siteDescription: 'Advanced Student Management System',
    maintenanceMode: false,
    allowRegistration: true,
    defaultTheme: 'blue',
    features: { onlineExams: true, attendanceTracking: true, feeManagement: true, onlineClasses: true, notifications: true },
    academicYear: '2024-2025',
    semester: 'Fall',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  // Save all data to localStorage
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('classes', JSON.stringify(classes))
  localStorage.setItem('exams', JSON.stringify(exams))
  localStorage.setItem('settings', JSON.stringify(settings))

  console.log('Mock data seeded successfully!')
}

// Utility functions for data management
export const storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]')
    } catch {
      return []
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getObject: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}')
    } catch {
      return {}
    }
  },
  setObject: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
}