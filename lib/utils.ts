// Utility functions for the Study AI helper.com app

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getGradeLabel = (grade: number): string => {
  const grades: { [key: number]: string } = {
    6: 'Grade 6 (11-12 years)',
    7: 'Grade 7 (12-13 years)',
    8: 'Grade 8 (13-14 years)',
    9: 'Grade 9 - Freshman',
    10: 'Grade 10 - Sophomore',
    11: 'Grade 11 - Junior',
    12: 'Grade 12 - Senior',
  };
  return grades[grade] || `Grade ${grade}`;
};

export const getSubjectIcon = (subject: string): string => {
  const icons: { [key: string]: string } = {
    math: '🔢',
    science: '🧪',
    english: '📖',
    history: '📜',
  };
  return icons[subject] || '📚';
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateUsagePercentage = (used: number, limit: number): number => {
  if (limit === 0) return 0;
  return Math.min((used / limit) * 100, 100);
};

export const getUsageStatus = (used: number, limit: number): 'low' | 'medium' | 'high' => {
  const percentage = generateUsagePercentage(used, limit);
  if (percentage < 50) return 'low';
  if (percentage < 80) return 'medium';
  return 'high';
};

export const formatGradeAdjustedText = (
  text: string,
  grade: number,
  includeExamples: boolean = true
): string => {
  let adjusted = text;

  // Lower grades get simpler language
  if (grade <= 8) {
    adjusted = adjusted
      .replace(/utilize/g, 'use')
      .replace(/investigate/g, 'study')
      .replace(/implement/g, 'use');
  }

  return adjusted;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

export const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

export const handleApiError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
