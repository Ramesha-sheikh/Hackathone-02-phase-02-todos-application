/**
 * API service for the Todo application
 * Connects to both auth and todo backends
 */

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8001';
const TODO_BASE_URL = process.env.NEXT_PUBLIC_TODO_API_URL || 'http://localhost:8000';

// Function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Authentication API functions
export const authAPI = {
  // Register a new user
  register: async (userData: { email: string; name: string; password: string }) => {
    const response = await fetch(`${AUTH_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const formData = new URLSearchParams();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    return handleResponse(response);
  },
};

// Todo API functions
export const todoAPI = {
  // Get all tasks for a user
  getTasks: async (userId: string, token: string) => {
    const response = await fetch(`${TODO_BASE_URL}/api/${userId}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Get a specific task for a user
  getTask: async (userId: string, taskId: number, token: string) => {
    const response = await fetch(`${TODO_BASE_URL}/api/${userId}/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Create a new task for a user
  createTask: async (userId: string, taskData: any, token: string) => {
    const response = await fetch(`${TODO_BASE_URL}/api/${userId}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    return handleResponse(response);
  },

  // Update a task
  updateTask: async (userId: string, taskId: number, taskData: any, token: string) => {
    const response = await fetch(`${TODO_BASE_URL}/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    return handleResponse(response);
  },

  // Delete a task
  deleteTask: async (userId: string, taskId: number, token: string) => {
    const response = await fetch(`${TODO_BASE_URL}/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Toggle task completion
  toggleTaskCompletion: async (userId: string, taskId: number, token: string) => {
    const response = await fetch(`${TODO_BASE_URL}/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },
};