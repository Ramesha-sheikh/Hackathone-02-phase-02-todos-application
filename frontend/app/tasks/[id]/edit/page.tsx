/**
 * Page for editing existing tasks
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { todoAPI } from '../../../../lib/api';
import { getUserFromToken } from '../../../../lib/auth';
import TaskForm from '../../../../components/TaskForm';

interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = parseInt(params.id as string, 10);

  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID from token
      const user = getUserFromToken();
      if (!user) {
        throw new Error('User not found');
      }

      const token = localStorage.getItem('jwt_token');
      const taskData = await todoAPI.getTask(user.id, taskId, token);
      setTask(taskData);
    } catch (err: any) {
      console.error('Error fetching task:', err);
      setError(err.message || 'Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (taskData: { title: string; description?: string; completed?: boolean }) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Get user ID from token
      const user = getUserFromToken();
      if (!user) {
        throw new Error('User not found');
      }

      const token = localStorage.getItem('jwt_token');
      await todoAPI.updateTask(user.id, taskId, taskData, token);

      // Redirect to tasks page after successful update
      router.push('/tasks');
      router.refresh(); // Refresh to update UI state
    } catch (err: any) {
      console.error('Error updating task:', err);
      setError(err.message || 'Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading task...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">
          <p>Error: {error}</p>
          <button
            onClick={fetchTask}
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="text-sm text-yellow-700">
          Task not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Edit Task
          </h1>
        </div>
      </div>

      <div className="mt-8">
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <TaskForm
            initialData={{
              id: task.id,
              title: task.title,
              description: task.description,
              completed: task.completed
            }}
            userId={task.user_id}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitButtonText="Update Task"
          />
        </div>
      </div>
    </div>
  );
}