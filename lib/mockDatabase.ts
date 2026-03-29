// Mock database - in production use a real database like MongoDB, PostgreSQL, etc.

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  grade: number;
  subscriptionStatus: 'free' | 'pro';
  isAdmin?: boolean;
  usageStats: {
    questionsUsed: number;
    notesUsed: number;
    paraphrasesUsed: number;
    mathUsed: number;
  };
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number; // in cents ($2.99 = 299)
  planType: 'pro';
  paymentStatus: 'completed' | 'pending' | 'failed';
  createdAt: Date;
}

export interface Deposit {
  id: string;
  amount: number; // in cents
  type: 'withdrawal' | 'deposit';
  status: 'pending' | 'completed' | 'failed';
  bankAccount?: string;
  description: string;
  createdAt: Date;
  completedAt?: Date;
}

export const users: User[] = [
  {
    id: 'admin-001',
    name: 'Admin User',
    email: 'jordanmbayolovy@gmaiil.com',
    password: '$2a$10$ZIoozq3pCTaLOPeWXlUJDO2XeNkJhSEqpbFxRfXH8fPrQ2Kx8vhZK', // hashed "admin123"
    grade: 12,
    subscriptionStatus: 'pro',
    isAdmin: true,
    usageStats: {
      questionsUsed: 0,
      notesUsed: 0,
      paraphrasesUsed: 0,
      mathUsed: 0,
    },
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '1',
    name: 'Demo Student',
    email: 'demo@example.com',
    password: '$2a$10$ZIoozq3pCTaLOPeWXlUJDO2XeNkJhSEqpbFxRfXH8fPrQ2Kx8vhZK', // hashed "demo123"
    grade: 10,
    subscriptionStatus: 'free',
    usageStats: {
      questionsUsed: 5,
      notesUsed: 3,
      paraphrasesUsed: 2,
      mathUsed: 4,
    },
    createdAt: new Date('2024-01-15'),
  },
];

// Payment history - tracks all Pro subscriptions
export const payments: Payment[] = [
  {
    id: 'pay_001',
    userId: '2',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    amount: 299,
    planType: 'pro',
    paymentStatus: 'completed',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 'pay_002',
    userId: '3',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    amount: 299,
    planType: 'pro',
    paymentStatus: 'completed',
    createdAt: new Date('2024-03-22'),
  },
  {
    id: 'pay_003',
    userId: '4',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    amount: 299,
    planType: 'pro',
    paymentStatus: 'completed',
    createdAt: new Date('2024-03-25'),
  },
];

// Deposit/Withdrawal history - tracks money withdrawals
export const deposits: Deposit[] = [
  {
    id: 'dep-001',
    amount: 89700,
    type: 'withdrawal',
    status: 'completed',
    bankAccount: 'Checking ****1234',
    description: 'Monthly earnings withdrawal',
    createdAt: new Date('2026-02-28'),
    completedAt: new Date('2026-03-01'),
  },
  {
    id: 'dep-002',
    amount: 59800,
    type: 'withdrawal',
    status: 'pending',
    bankAccount: 'Savings ****5678',
    description: 'Requested withdrawal',
    createdAt: new Date('2026-03-25'),
  },
];

export interface Subject {
  id: string;
  name: string;
  grades: number[];
  topics: string[];
}

export const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Math',
    grades: [6, 7, 8, 9, 10, 11, 12],
    topics: [
      'Algebra',
      'Geometry',
      'Trigonometry',
      'Calculus',
      'Statistics',
      'Fractions',
      'Decimals',
      'Percentages',
    ],
  },
  {
    id: 'science',
    name: 'Science',
    grades: [6, 7, 8, 9, 10, 11, 12],
    topics: [
      'Biology',
      'Chemistry',
      'Physics',
      'Earth Science',
      'Astronomy',
      'Genetics',
      'Ecology',
    ],
  },
  {
    id: 'english',
    name: 'English',
    grades: [6, 7, 8, 9, 10, 11, 12],
    topics: [
      'Literature',
      'Grammar',
      'Writing',
      'Composition',
      'Poetry',
      'Shakespeare',
      'Reading Comprehension',
    ],
  },
  {
    id: 'history',
    name: 'History',
    grades: [6, 7, 8, 9, 10, 11, 12],
    topics: [
      'World History',
      'US History',
      'Ancient Civilizations',
      'Medieval History',
      'Modern History',
      'Geography',
    ],
  },
];
