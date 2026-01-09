/**
 * Tasks page for the Todo application
 * Displays all tasks for the authenticated user
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { todoAPI } from '../../lib/api';
import { isAuthenticated, getUserFromToken, getToken } from '../../lib/auth';
import TaskCard from '../../components/TaskCard';

interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for the component to mount on the client side
    const checkAuthAndLoadTasks = () => {
      console.log('Tasks page loaded, checking authentication...');
      // Check if user is authenticated
      if (!isAuthenticated()) {
        console.log('User not authenticated, redirecting to login...');
        router.push('/login');
        return;
      }
      console.log('User is authenticated, fetching tasks...');
      fetchTasks();
    };

    // Add a small delay to ensure client-side is fully loaded
    const timer = setTimeout(checkAuthAndLoadTasks, 100);

    return () => clearTimeout(timer);
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID from token
      const user = getUserFromToken();
      if (!user) {
        throw new Error('User not found');
      }

      // Get token from storage
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const userTasks = await todoAPI.getTasks(user.id, token);
      setTasks(userTasks);
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      // Get user ID from token
      const user = getUserFromToken();
      if (!user) {
        throw new Error('User not found');
      }

      // Get token from storage
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await todoAPI.deleteTask(user.id, taskId, token);
      // Refresh tasks list after deletion
      fetchTasks();
    } catch (err: any) {
      console.error('Error deleting task:', err);
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleToggleComplete = async (taskId: number) => {
    try {
      // Get user ID from token
      const user = getUserFromToken();
      if (!user) {
        throw new Error('User not found');
      }

      // Get token from storage
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await todoAPI.toggleTaskCompletion(user.id, taskId, token);
      // Refresh tasks list after toggle
      fetchTasks();
    } catch (err: any) {
      console.error('Error toggling task completion:', err);
      setError(err.message || 'Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner mr-3"></div>
        <p className="text-lg text-gray-600">Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-orange-50 p-6 border border-red-100 shadow-premium">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Error: {error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={fetchTasks}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Tasks</h1>
          <p className="mt-2 text-gray-600">
            Manage your tasks efficiently with our premium experience
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <a
            href="/tasks/new"
            className="button-primary"
          >
            <span className="mr-2">+</span> Add New Task
          </a>
        </div>
      </div>

      <div className="mt-8">
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <svg
                className="mx-auto h-16 w-16 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">No tasks yet</h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">Get started by creating your first task with our intuitive interface.</p>
            <div className="mt-8">
              <a
                href="/tasks/new"
                className="button-primary"
              >
                <span className="mr-2">✨</span> Create Your First Task
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}