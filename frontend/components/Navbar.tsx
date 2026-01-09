/**
 * Navigation bar component for the Todo application
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserFromToken, logout } from '../lib/auth';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    // Check if user is authenticated
    const userData = getUserFromToken();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const linkVariants = {
    hover: { scale: 1.05, y: -1 }
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 ${
        darkMode
          ? 'bg-white/10 backdrop-blur-md shadow-sm border-b border-slate-700/50'
          : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50'
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className="text-2xl">✨</span> Premium Todo
            </Link>
          </div>

          <nav className="flex items-center space-x-1">
            <motion.div whileHover="hover" className="mr-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  darkMode
                    ? 'text-slate-200 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
            </motion.div>

            {user ? (
              <>
                <motion.div whileHover="hover" className="mr-4">
                  <Link
                    href="/tasks"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      darkMode
                        ? 'text-slate-200 hover:text-blue-400'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    My Tasks
                  </Link>
                </motion.div>

                <span className={`text-sm px-3 py-2 ${
                  darkMode ? 'text-slate-400 border-l border-slate-600' : 'text-gray-500 border-l border-gray-200'
                }`}>
                  {user.email || user.id}
                </span>

                <motion.div whileHover="hover">
                  <button
                    onClick={handleLogout}
                    className={`ml-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      darkMode
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-red-600 hover:text-red-800'
                    }`}
                  >
                    Logout
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover="hover" className="mr-4">
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      darkMode
                        ? 'text-slate-200 hover:text-blue-400'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Log In
                  </Link>
                </motion.div>

                <motion.div whileHover="hover">
                  <Link
                    href="/signup"
                    className={`font-medium px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`ml-4 p-2 rounded-full ${
                darkMode
                  ? 'bg-slate-700 text-amber-400 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}