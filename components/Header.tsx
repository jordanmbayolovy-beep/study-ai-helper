'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudentStore } from '@/lib/store';
import Logo from '@/components/Logo';

export default function Header() {
  const router = useRouter();
  const { userName, subscriptionStatus, logout } = useStudentStore();
  const [isUser, setIsUser] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsUser(!!user);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <Logo size={40} />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
            Study AI helper.com
          </h1>
        </Link>

        {/* Navigation */}
        {isUser && (
          <div className="flex items-center gap-4">
            {/* Subscription Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full text-sm font-semibold">
              {subscriptionStatus === 'pro' ? (
                <>
                  <span>⭐ Pro</span>
                </>
              ) : (
                <>
                  <span>📋 Free Plan</span>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {userName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium hidden sm:block">{userName}</span>
                <span className="text-lg">▼</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    👤 Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    ⚙️ Settings
                  </Link>
                  {/* Admin Link - Only for admin */}
                  {typeof window !== 'undefined' && localStorage.getItem('user') && 
                   JSON.parse(localStorage.getItem('user') || '{}').email === 'jordanmbayolovy@gmaiil.com' && (
                    <>
                      <hr className="my-2 dark:border-gray-600" />
                      <Link
                        href="/admin"
                        className="block px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-lg font-semibold"
                      >
                        💰 Admin Dashboard
                      </Link>
                    </>
                  )}
                  <hr className="my-2 dark:border-gray-600" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {!isUser && (
          <div className="flex gap-2">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
