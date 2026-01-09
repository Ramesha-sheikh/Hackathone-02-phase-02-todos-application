/**
 * Task form component for creating and editing tasks
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TaskFormProps {
  initialData?: {
    id?: number;
    title: string;
    description: string | null;
    completed: boolean;
  };
  userId: string;
  onSubmit: (taskData: { title: string; description?: string; completed?: boolean }) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitButtonText: string;
}

export default function TaskForm({
  initialData,
  userId,
  onSubmit,
  onCancel,
  isSubmitting,
  submitButtonText
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const router = useRouter();

  const validate = () => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 1 || title.length > 200) {
      newErrors.title = 'Title must be between 1 and 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        title,
        description: description || undefined,
        completed: initialData ? completed : undefined
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`block w-full px-3 py-2 border ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            rows={4}
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {initialData && (
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="completed" className="font-medium text-gray-700">
              Completed
            </label>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : submitButtonText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}