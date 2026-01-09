/**
 * Task card component for displaying individual tasks
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    onDelete(task.id);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className={`task-item rounded-xl transition-all duration-300 ${
        task.completed
          ? 'task-completed bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500'
          : 'bg-gradient-to-r from-white to-gray-50 border-l-4 border-blue-500 hover:shadow-lg'
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      layout
    >
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
          />
        </div>
        <div className="ml-4 flex-1 min-w-0">
          <h3 className={`text-base font-semibold mb-1 ${
            task.completed
              ? 'text-green-700 line-through decoration-green-500'
              : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mb-2 ${
              task.completed
                ? 'text-green-600 italic'
                : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {new Date(task.created_at).toLocaleDateString()}
            </span>
            {task.completed && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <motion.a
            href={`/tasks/${task.id}/edit`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit
          </motion.a>
        </div>

        <div>
          {showConfirmation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex space-x-2"
            >
              <motion.button
                onClick={confirmDelete}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm
              </motion.button>
              <motion.button
                onClick={cancelDelete}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              onClick={handleDeleteClick}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}