import { create } from 'zustand';

interface UsageStats {
  questionsUsed: number;
  notesUsed: number;
  paraphrasesUsed: number;
  mathUsed: number;
}

interface StudentStore {
  // User data
  userId: string | null;
  userName: string | null;
  email: string | null;
  grade: number | null;
  subscriptionStatus: 'free' | 'pro';
  usageStats: UsageStats;

  // UI state
  darkMode: boolean;
  chatOpen: boolean;

  // Actions
  setGrade: (grade: number) => void;
  setSubject: (subject: string) => void;
  setSubscriptionStatus: (status: 'free' | 'pro') => void;
  setUsageStats: (stats: UsageStats) => void;
  toggleDarkMode: () => void;
  loadUserFromStorage: () => void;
  logout: () => void;

  // Subject state
  subject: string | null;
}

export const useStudentStore = create<StudentStore>((set) => ({
  userId: null,
  userName: null,
  email: null,
  grade: null,
  subscriptionStatus: 'free',
  usageStats: {
    questionsUsed: 0,
    notesUsed: 0,
    paraphrasesUsed: 0,
    mathUsed: 0,
  },
  darkMode: false,
  chatOpen: false,
  subject: null,

  setGrade: (grade) => set({ grade }),
  setSubject: (subject) => set({ subject }),
  setSubscriptionStatus: (status) => set({ subscriptionStatus: status }),
  setUsageStats: (stats) => set({ usageStats: stats }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  loadUserFromStorage: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        set({
          userId: userData.id,
          userName: userData.name,
          email: userData.email,
          grade: userData.grade,
          subscriptionStatus: userData.subscriptionStatus || 'free',
        });
      }
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    set({
      userId: null,
      userName: null,
      email: null,
      grade: null,
      subscriptionStatus: 'free',
      usageStats: {
        questionsUsed: 0,
        notesUsed: 0,
        paraphrasesUsed: 0,
        mathUsed: 0,
      },
    });
  },
}));
