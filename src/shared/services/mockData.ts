import { User, UserRole, EmployeeProfile, Feedback, AbsenceRequest, AbsenceStatus } from '../types/index.js';
import { ROLE_PERMISSIONS } from '../types/permissions.js';

export const mockEmployees: (EmployeeProfile & { role: UserRole; })[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'manager@newwork.com',
    role: UserRole.MANAGER,
    position: 'Senior HR Manager',
    department: 'Human Resources',
    // profileImage: 'https://avatar.iran.liara.run/username?username=Sarah+Johnson', // Removed for performance
    bio: 'Experienced HR professional with 8+ years in talent management and employee development.',
    skills: ['Talent Management', 'Employee Relations', 'HR Strategy', 'Performance Management'],
    phone: '+1-555-0123',
    salary: 85000,
    startDate: '2020-03-15',
    employeeId: 'EMP001',
    address: '123 Business Ave, Tech City, TC 12345',
    emergencyContact: {
      name: 'David Johnson',
      phone: '+1-555-0124',
      relationship: 'Spouse'
    },
    feedback: [],
    absenceRequests: [],
    performanceRating: 4.5,
    certifications: ['HR specialist'],
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'employee@newwork.com',
    role: UserRole.EMPLOYEE,
    position: 'Software Engineer',
    department: 'Engineering',
    // profileImage: 'https://avatar.iran.liara.run/username?username=Michael+Chen', // Removed for performance
    bio: 'Full-stack developer passionate about clean code and user experience.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    phone: '+1-555-0125',
    salary: 75000,
    startDate: '2021-06-10',
    employeeId: 'EMP002',
    address: '456 Tech Street, Innovation City, IC 67890',
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+1-555-0126',
      relationship: 'Sister'
    },
    workHistory: [
      { company: 'Google', position: 'Senior Engineer', duration: '2015-2018' },
      { company: 'Microsoft', position: 'Software Engineer', duration: '2012-2015' }
    ],
    feedback: [],
    absenceRequests: [
      {
        id: '1',
        startDate: '2024-02-15',
        endDate: '2024-02-16',
        reason: 'Personal day',
        status: AbsenceStatus.APPROVED,
        createdAt: '2024-01-20T09:00:00Z',
        updatedAt: '2024-01-21T14:30:00Z'
      },
      {
        id: '2',
        startDate: '2024-03-10',
        endDate: '2024-03-12',
        reason: 'Vacation - Family trip',
        status: AbsenceStatus.PENDING,
        createdAt: '2024-02-15T10:30:00Z',
        updatedAt: '2024-02-15T10:30:00Z'
      }
    ]
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'coworker@newwork.com',
    role: UserRole.COWORKER,
    position: 'Product Designer',
    department: 'Design',
    // profileImage: 'https://avatar.iran.liara.run/username?username=Emily+Davis', // Removed for performance
    bio: 'Creative designer focused on user-centered design and accessibility.',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Accessibility'],
    phone: '+1-555-0127',
    salary: 70000,
    startDate: '2022-01-20',
    employeeId: 'EMP003',
    address: '789 Design Lane, Creative City, CC 11111',
    emergencyContact: {
      name: 'Robert Davis',
      phone: '+1-555-0128',
      relationship: 'Father'
    },
    feedback: [],
    absenceRequests: [
      {
        id: '3',
        startDate: '2024-02-20',
        endDate: '2024-02-20',
        reason: 'Sick leave',
        status: AbsenceStatus.APPROVED,
        createdAt: '2024-02-19T08:00:00Z',
        updatedAt: '2024-02-19T09:15:00Z'
      }
    ]
  },
  {
    id: '4',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@newwork.com',
    role: UserRole.MANAGER,
    position: 'Engineering Manager',
    department: 'Engineering',
    // profileImage: 'https://avatar.iran.liara.run/username?username=John+Smith', // Removed for performance
    bio: 'Experienced engineering leader with 10+ years managing high-performing development teams.',
    skills: ['Team Leadership', 'Agile Management', 'System Architecture', 'Python', 'AWS'],
    phone: '+1-555-0101',
    salary: 120000,
    startDate: '2019-01-15',
    employeeId: 'EMP004',
    address: '123 Tech Drive, Silicon Valley, CA 94025',
    emergencyContact: {
      name: 'Jennifer Smith',
      phone: '+1-555-0102',
      relationship: 'Spouse'
    },
    performanceRating: 4.8,
    certifications: ['AWS Solutions Architect', 'PMP', 'CSM'],
    workHistory: [
      { company: 'Google', position: 'Senior Engineer', duration: '2015-2018' },
      { company: 'Microsoft', position: 'Software Engineer', duration: '2012-2015' }
    ],
    feedback: [],
    absenceRequests: []
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Rodriguez',
    email: 'lisa.rodriguez@newwork.com',
    role: UserRole.MANAGER,
    position: 'HR Manager',
    department: 'Human Resources',
    // profileImage: 'https://avatar.iran.liara.run/username?username=Lisa+Rodriguez', // Removed for performance
    bio: 'Strategic HR leader with expertise in talent acquisition and employee development.',
    skills: ['Talent Management', 'Employee Relations', 'HR Strategy', 'Performance Management'],
    phone: '+1-555-0107',
    salary: 110000,
    startDate: '2018-09-01',
    employeeId: 'EMP005',
    address: '321 HR Avenue, Business District, CA 90212',
    emergencyContact: {
      name: 'Carlos Rodriguez',
      phone: '+1-555-0108',
      relationship: 'Spouse'
    },
    performanceRating: 4.7,
    certifications: ['SHRM-CP', 'PHR'],
    workHistory: [
      { company: 'Salesforce', position: 'HR Specialist', duration: '2016-2018' }
    ],
    feedback: [],
    absenceRequests: [
      {
        id: '4',
        startDate: '2024-04-01',
        endDate: '2024-04-05',
        reason: 'Vacation - Spring break',
        status: AbsenceStatus.PENDING,
        createdAt: '2024-02-01T11:00:00Z',
        updatedAt: '2024-02-01T11:00:00Z'
      }
    ]
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@newwork.com',
    role: UserRole.EMPLOYEE,
    position: 'Sales Representative',
    department: 'Sales',
    // profileImage: 'https://avatar.iran.liara.run/username?username=David+Kim', // Removed for performance
    bio: 'Results-driven sales professional with a track record of exceeding targets.',
    skills: ['B2B Sales', 'CRM Systems', 'Negotiation', 'Client Relations', 'Sales Strategy'],
    phone: '+1-555-0109',
    salary: 75000,
    startDate: '2022-01-15',
    employeeId: 'EMP006',
    address: '654 Sales Street, Commerce City, CA 90213',
    emergencyContact: {
      name: 'Grace Kim',
      phone: '+1-555-0110',
      relationship: 'Spouse'
    },
    performanceRating: 4.3,
    certifications: ['Salesforce Sales', 'HubSpot Sales'],
    workHistory: [
      { company: 'Oracle', position: 'Account Executive', duration: '2020-2022' }
    ],
    feedback: [],
    absenceRequests: [
      {
        id: '5',
        startDate: '2024-05-15',
        endDate: '2024-05-17',
        reason: 'Vacation - Long weekend trip',
        status: AbsenceStatus.PENDING,
        createdAt: '2024-03-01T14:20:00Z',
        updatedAt: '2024-03-01T14:20:00Z'
      }
    ]
  },
  {
    id: '7',
    firstName: 'Emma',
    lastName: 'Thompson',
    email: 'emma.thompson@newwork.com',
    role: UserRole.EMPLOYEE,
    position: 'Marketing Specialist',
    department: 'Marketing',
    // profileImage: 'https://avatar.iran.liara.run/username?username=Emma+Thompson', // Removed for performance
    bio: 'Creative marketer with expertise in digital campaigns and brand development.',
    skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics', 'Brand Strategy'],
    phone: '+1-555-0111',
    salary: 70000,
    startDate: '2022-03-01',
    employeeId: 'EMP007',
    address: '987 Marketing Blvd, Creative District, CA 90214',
    emergencyContact: {
      name: 'James Thompson',
      phone: '+1-555-0112',
      relationship: 'Spouse'
    },
    performanceRating: 4.2,
    certifications: ['Google Ads', 'Facebook Blueprint', 'HubSpot Marketing'],
    workHistory: [
      { company: 'Meta', position: 'Marketing Coordinator', duration: '2020-2022' }
    ],
    feedback: [],
    absenceRequests: [
      {
        id: '6',
        startDate: '2024-04-20',
        endDate: '2024-04-20',
        reason: 'Sick leave - Doctor appointment',
        status: AbsenceStatus.APPROVED,
        createdAt: '2024-04-19T08:30:00Z',
        updatedAt: '2024-04-19T10:15:00Z'
      },
      {
        id: '7',
        startDate: '2024-06-10',
        endDate: '2024-06-14',
        reason: 'Vacation - Summer break',
        status: AbsenceStatus.PENDING,
        createdAt: '2024-02-28T16:45:00Z',
        updatedAt: '2024-02-28T16:45:00Z'
      }
    ]
  },
  {
    id: '8',
    firstName: 'Alex',
    lastName: 'Patel',
    email: 'alex.patel@newwork.com',
    role: UserRole.EMPLOYEE,
    position: 'Junior Developer',
    department: 'Engineering',
    // profileImage: 'https://avatar.iran.liara.run/username?username=Alex+Patel', // Removed for performance
    bio: 'Eager junior developer with strong foundation in modern web technologies.',
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Git', 'REST APIs'],
    phone: '+1-555-0113',
    salary: 65000,
    startDate: '2023-06-01',
    employeeId: 'EMP008',
    address: '147 Dev Lane, Tech Hub, CA 90215',
    emergencyContact: {
      name: 'Priya Patel',
      phone: '+1-555-0114',
      relationship: 'Sister'
    },
    performanceRating: 4.0,
    certifications: ['React Developer', 'JavaScript Fundamentals'],
    workHistory: [],
    feedback: [],
    absenceRequests: [
      {
        id: '8',
        startDate: '2024-03-25',
        endDate: '2024-03-29',
        reason: 'Vacation - Spring break',
        status: AbsenceStatus.REJECTED,
        createdAt: '2024-02-15T11:00:00Z',
        updatedAt: '2024-02-16T09:30:00Z'
      }
    ]
  }
];

// Centralized feedback data (single source of truth)
export const mockFeedback: Feedback[] = [
  {
    id: 'f1',
    fromUserId: '1',
    toUserId: '2',
    content: 'Great teamwork on the project! You always communicate clearly and meet deadlines.',
    enhancedContent: 'I appreciate your exceptional teamwork on the project. Your clear communication and consistent ability to meet deadlines have been invaluable to our success.',
    isEnhanced: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'f2',
    fromUserId: '2',
    toUserId: '1',
    content: 'You could improve your time management skills. Sometimes meetings run over.',
    enhancedContent: 'I have noticed opportunities to enhance your time management skills. Meetings occasionally run over schedule, and developing more structured time allocation could benefit both you and the team.',
    isEnhanced: true,
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 'f3',
    fromUserId: '3',
    toUserId: '2',
    content: 'Your technical skills are amazing! Love working with you.',
    enhancedContent: 'Your technical expertise is truly impressive! I thoroughly enjoy collaborating with you and appreciate the valuable insights you bring to our projects.',
    isEnhanced: true,
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 'f4',
    fromUserId: '4',
    toUserId: '2',
    content: 'You need to improve your communication with the team.',
    enhancedContent: 'I\'ve observed opportunities to enhance your team communication. Clear and consistent communication is essential for our collaborative success, and I believe we can work together to strengthen this aspect of your performance.',
    isEnhanced: true,
    createdAt: '2024-01-12T16:30:00Z',
    updatedAt: '2024-01-12T16:30:00Z'
  },
  {
    id: 'f5',
    fromUserId: '5',
    toUserId: '3',
    content: 'Excellent sales performance this quarter. Keep up the great work!',
    enhancedContent: 'Your sales performance this quarter has been exceptional. Your dedication and strategic approach have significantly contributed to our team\'s success. Keep up the outstanding work!',
    isEnhanced: true,
    createdAt: '2024-01-10T11:45:00Z',
    updatedAt: '2024-01-10T11:45:00Z'
  }
];

// Legacy export for backward compatibility
export const mockProfiles: EmployeeProfile[] = mockEmployees;

// Mock sessions (simple in-memory storage)
export const mockSessions: Map<string, User> = new Map();

// Helper functions
export const findUserByEmail = (email: string): User | undefined => {
  const employee = mockEmployees.find(emp => emp.email === email);
  if (!employee) return undefined;

  return {
    id: employee.id,
    email: employee.email,
    role: employee.role,
    permissions: ROLE_PERMISSIONS[employee.role.toUpperCase() as keyof typeof ROLE_PERMISSIONS],
    firstName: employee.firstName,
    lastName: employee.lastName
  };
};

export const findProfileById = (id: string): EmployeeProfile | undefined => {
  return mockEmployees.find(employee => employee.id === id);
};

export const updateProfileById = (id: string, updateData: Partial<EmployeeProfile>): EmployeeProfile | undefined => {
  const employeeIndex = mockEmployees.findIndex(employee => employee.id === id);
  if (employeeIndex === -1) return undefined;

  mockEmployees[employeeIndex] = { ...mockEmployees[employeeIndex], ...updateData };
  return mockEmployees[employeeIndex];
};

export const createSession = (user: User): string => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  mockSessions.set(sessionId, user);
  return sessionId;
};

export const getSessionUser = (sessionId: string): User | undefined => {
  return mockSessions.get(sessionId);
};

export const removeSession = (sessionId: string): boolean => {
  return mockSessions.delete(sessionId);
};

// Helper function to get user's full name by ID
export const getUserFullName = (userId: string): string => {
  const employee = mockEmployees.find(emp => emp.id === userId);
  return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown User';
};

// Helper function to get feedback for a specific user
export const getFeedbackForUser = (userId: string): Feedback[] => {
  return mockFeedback.filter(f => f.toUserId === userId);
};

// Helper function to get feedback by a specific user
export const getFeedbackByUser = (userId: string): Feedback[] => {
  return mockFeedback.filter(f => f.fromUserId === userId);
};
