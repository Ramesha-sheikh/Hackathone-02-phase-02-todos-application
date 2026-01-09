/**
 * Home page for the Todo application
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromToken } from '../lib/auth';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const userData = getUserFromToken();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={itemVariants} transition={{ type: 'spring', stiffness: 100 }}>
        <motion.div
          className="inline-block p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="bg-white rounded-full px-6 py-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Premium Task Manager
            </h1>
          </div>
        </motion.div>

        <motion.p
          className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          variants={itemVariants}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {user
            ? (
              <span className="text-gray-800">
                Welcome back, <span className="font-semibold text-blue-600">{user.email || user.id}</span>!
                <br />Manage your tasks securely with our premium experience.
              </span>
            )
            : (
              <span>
                Streamline your productivity with our secure, elegant task management solution.
              </span>
            )
          }
        </motion.p>
      </motion.div>

      {!user && (
        <motion.div className="mt-12 text-center" variants={itemVariants} transition={{ type: 'spring', stiffness: 100 }}>
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-premium p-8 max-w-md mx-auto border border-gray-200/50"
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Get Started Today
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-8"
              variants={itemVariants}
            >
              Join thousands of professionals who trust our platform for their daily task management needs.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => router.push('/login')}
                className="button-primary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Log In
              </motion.button>
              <motion.button
                onClick={() => router.push('/signup')}
                className="button-secondary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Create Account
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {user && (
        <motion.div className="mt-12 text-center" variants={itemVariants} transition={{ type: 'spring', stiffness: 100 }}>
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-premium p-8 max-w-md mx-auto border border-blue-100/50"
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Ready to Boost Productivity?
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6"
              variants={itemVariants}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              Your tasks are waiting. Let's get started!
            </motion.p>

            <motion.button
              onClick={() => router.push('/tasks')}
              className="button-primary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              View My Tasks
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <motion.div className="mt-16 max-w-5xl mx-auto" variants={itemVariants} transition={{ type: 'spring', stiffness: 100 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            icon: '🔒',
            title: 'Secure & Private',
            description: 'Enterprise-grade security with JWT authentication and user data isolation.'
          }, {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Optimized performance with modern technologies for instant task management.'
          }, {
            icon: '📱',
            title: 'Fully Responsive',
            description: 'Access your tasks anywhere, anytime on any device with our responsive design.'
          }].map((feature, index) => (
            <motion.div
              key={index}
              className="card p-6 text-center"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="text-3xl mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}