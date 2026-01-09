/**
 * Page for creating new tasks
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { todoAPI } from '../../../lib/api';
import { getUserFromToken, getToken } from '../../../lib/auth';
import TaskForm from '../../../components/TaskForm';

export default function NewTaskPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (taskData: { title: string; description?: string; completed?: boolean }) => {
    try {
      setIsSubmitting(true);
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

      await todoAPI.createTask(user.id, taskData, token);

      // Redirect to tasks page after successful creation
      router.push('/tasks');
      router.refresh(); // Refresh to update UI state
    } catch (err: any) {
      console.error('Error creating task:', err);
      setError(err.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Create New Task
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
            userId={getUserFromToken()?.id || ''}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitButtonText="Create Task"
          />
        </div>
      </div>
    </div>
  );
}