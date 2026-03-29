'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useStudentStore } from '@/lib/store';

export default function Profile() {
  const { userName, email, grade } = useStudentStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    useStudentStore.getState().loadUserFromStorage();
  }, []);

  const getGradeName = (g: number | null) => {
    if (!g) return 'Not selected';
    return `Grade ${g}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">👤 My Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isEditing ? '✓ Done' : '✏️ Edit'}
            </button>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-6xl mb-4">
                {userName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <p className="text-xl font-semibold">{userName || 'Student'}</p>
              <p className="text-gray-600 dark:text-gray-400">{email}</p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Grade Level</p>
                <p className="text-2xl font-bold">{getGradeName(grade)}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Subscription</p>
                <p className="text-2xl font-bold">Free Plan</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                <p className="text-2xl font-bold">Jan 2024</p>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="border-t border-gray-300 dark:border-gray-600 pt-8">
            <h2 className="text-xl font-bold mb-4">⚙️ Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span>Dark Mode</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span>Show Ads</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
