'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { darkMode, toggleDarkMode } = useTheme();

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

  return (
    <motion.footer
      className={`mt-16 py-8 px-4 border-t ${
        darkMode
          ? 'border-slate-700 bg-gradient-to-t from-slate-900 to-slate-800'
          : 'border-gray-200 bg-gradient-to-t from-gray-50 to-white'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants} transition={{ type: 'spring', stiffness: 100 }} className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">✨</span>
              <h3 className={`text-xl font-bold ${
                darkMode ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Premium Todo
              </h3>
            </div>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-gray-600'
            } max-w-md`}>
              Elevate your productivity with our premium task management solution.
              Secure, intuitive, and designed for excellence.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} transition={{ type: 'spring', stiffness: 100 }}>
            <h4 className={`font-semibold mb-4 ${
              darkMode ? 'text-slate-200' : 'text-gray-900'
            }`}>Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Integrations', 'Updates'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-sm transition-colors duration-200 hover:${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} transition={{ type: 'spring', stiffness: 100 }}>
            <h4 className={`font-semibold mb-4 ${
              darkMode ? 'text-slate-200' : 'text-gray-900'
            }`}>Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-sm transition-colors duration-200 hover:${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <p className={`text-sm ${
            darkMode ? 'text-slate-500' : 'text-gray-500'
          }`}>
            © 2026 Premium Todo. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? 'bg-slate-700 text-amber-400 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>

            <div className="flex space-x-4">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -2 }}
                  className={`text-sm ${
                    darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors duration-200`}
                >
                  {social.charAt(0).toUpperCase() + social.slice(1)}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;