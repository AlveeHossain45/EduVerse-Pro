// Mock data seeding utility for EduVersePro
// This creates initial data for demonstration purposes

export const seedMockData = async () => {
  // Check if data already exists
  const existingUsers = localStorage.getItem('users')
  const existingClasses = localStorage.getItem('classes')
  const existingExams = localStorage.getItem('exams')
  const existingSettings = localStorage.getItem('settings')

  if (existingUsers && existingClasses && existingExams && existingSettings) {
    return // Data already exists
  }

  // Seed Users
  const users = [
    {
      id: 'admin_001',
      name: 'System Administrator',
      email: 'admin@eduversepro.com',
      password: 'admin123', // In production, this would be hashed
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=3B82F6&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'teacher_001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@eduversepro.com',
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
      email: 'emma.wilson@eduversepro.com',
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
      id: 'student_003',
      name: 'Sophia Lee',
      email: 'sophia.lee@eduversepro.com',
      password: 'student123',
      role: 'student',
      avatar: 'https://ui-avatars.com/api/?name=Sophia+Lee&background=06B6D4&color=fff',
      createdAt: new Date().toISOString(),
      status: 'active',
      grade: '11th Grade',
      classId: 'class_002',
      parentEmail: 'lee.parent@email.com'
    },
    {
      id: 'accountant_001',
      name: 'Robert Martinez',
      email: 'robert.martinez@eduversepro.com',
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
        {
          id: 'q1',
          question: 'What is the derivative of x² + 3x + 2?',
          options: ['2x + 3', '2x + 2', 'x + 3', '2x'],
          correctAnswer: 0,
          marks: 10
        },
        {
          id: 'q2',
          question: 'Solve for x: 2x + 5 = 15',
          options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'],
          correctAnswer: 0,
          marks: 10
        },
        {
          id: 'q3',
          question: 'What is the area of a circle with radius 5?',
          options: ['25π', '10π', '5π', '50π'],
          correctAnswer: 0,
          marks: 10
        }
      ],
      scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      status: 'scheduled',
      createdAt: new Date().toISOString()
    },
    {
      id: 'exam_002',
      title: 'Physics Quiz - Forces',
      description: 'Quick quiz on Newton\'s laws of motion',
      teacherId: 'teacher_001',
      teacherName: 'Sarah Johnson',
      classId: 'class_002',
      className: 'Physics Fundamentals',
      duration: 30,
      totalMarks: 50,
      questions: [
        {
          id: 'q1',
          question: 'What is Newton\'s First Law of Motion?',
          options: [
            'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force',
            'Force equals mass times acceleration',
            'For every action, there is an equal and opposite reaction',
            'Energy cannot be created or destroyed'
          ],
          correctAnswer: 0,
          marks: 25
        },
        {
          id: 'q2',
          question: 'What is the unit of force?',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          correctAnswer: 1,
          marks: 25
        }
      ],
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
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
    features: {
      onlineExams: true,
      attendanceTracking: true,
      feeManagement: true,
      onlineClasses: true,
      notifications: true
    },
    academicYear: '2024-2025',
    semester: 'Fall',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  // Seed Attendance Records
  const attendance = [
    {
      id: 'att_001',
      studentId: 'student_001',
      studentName: 'Emma Wilson',
      classId: 'class_001',
      className: 'Mathematics 10A',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      markedBy: 'teacher_001',
      markedByName: 'Sarah Johnson',
      timestamp: new Date().toISOString()
    },
    {
      id: 'att_002',
      studentId: 'student_002',
      studentName: 'James Rodriguez',
      classId: 'class_001',
      className: 'Mathematics 10A',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      markedBy: 'teacher_001',
      markedByName: 'Sarah Johnson',
      timestamp: new Date().toISOString()
    },
    {
      id: 'att_003',
      studentId: 'student_003',
      studentName: 'Sophia Lee',
      classId: 'class_002',
      className: 'Physics Fundamentals',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'absent',
      markedBy: 'teacher_001',
      markedByName: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Seed Fee Records
  const fees = [
    {
      id: 'fee_001',
      studentId: 'student_001',
      studentName: 'Emma Wilson',
      amount: 1500,
      description: 'Tuition Fee - Fall Semester',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'paid',
      paidDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paymentMethod: 'Credit Card',
      transactionId: 'TXN' + Date.now(),
      createdAt: new Date().toISOString()
    },
    {
      id: 'fee_002',
      studentId: 'student_002',
      studentName: 'James Rodriguez',
      amount: 1500,
      description: 'Tuition Fee - Fall Semester',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      paidDate: null,
      paymentMethod: null,
      transactionId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: 'fee_003',
      studentId: 'student_003',
      studentName: 'Sophia Lee',
      amount: 1500,
      description: 'Tuition Fee - Fall Semester',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'partial',
      paidDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN' + (Date.now() - 1000000),
      amountPaid: 750,
      balanceDue: 750,
      createdAt: new Date().toISOString()
    }
  ]

  // Save all data to localStorage
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('classes', JSON.stringify(classes))
  localStorage.setItem('exams', JSON.stringify(exams))
  localStorage.setItem('settings', JSON.stringify(settings))
  localStorage.setItem('attendance', JSON.stringify(attendance))
  localStorage.setItem('fees', JSON.stringify(fees))

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