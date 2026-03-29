'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">⚙️ Settings</h1>

          {/* Account Section */}
          <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-bold mb-4">👤 Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-bold mb-4">🎓 Learning Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Grade Level</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option selected>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Subjects</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked /> Math
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked /> Science
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> English
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> History
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get updates about your usage</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get a weekly learning summary</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input type="checkbox" className="w-5 h-5" />
                <div>
                  <p className="font-medium">Promotional Emails</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn about new features & offers</p>
                </div>
              </label>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-bold mb-4">🔐 Privacy & Security</h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 bg-orange-50 dark:bg-orange-900 text-orange-600 dark:text-orange-200 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition text-left font-medium">
                🔄 Change Password
              </button>
              <button className="w-full px-4 py-3 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition text-left font-medium">
                🗑️ Delete Account
              </button>
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-xl font-bold mb-4">ℹ️ About</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2 text-sm">
              <p><strong>App Version:</strong> 1.0.0</p>
              <p><strong>Last Updated:</strong> March 2024</p>
              <p><strong>Support Email:</strong> support@studyhelper.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
