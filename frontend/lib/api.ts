/**
 * API service for the Todo application
 * Connects to both auth and todo backends
 */

// Use Next.js API routes for proxying to backend services
const PROXY_AUTH_URL = '/api/auth';
const PROXY_TODO_URL = '/api/todo';

// Function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to get error data, but handle if response is not JSON
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use status text
      errorData = { detail: response.statusText || `HTTP error! status: ${response.status}` };
    }
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Authentication API functions
export const authAPI = {
  // Register a new user
  register: async (userData: { email: string; name: string; password: string }) => {
    const response = await fetch(`${PROXY_AUTH_URL}`, {
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

    const response = await fetch(`${PROXY_AUTH_URL}`, {
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
    const response = await fetch(`${PROXY_TODO_URL}?userId=${encodeURIComponent(userId)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Get a specific task for a user
  getTask: async (userId: string, taskId: number, token: string) => {
    const response = await fetch(`${PROXY_TODO_URL}?userId=${encodeURIComponent(userId)}&taskId=${taskId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Create a new task for a user
  createTask: async (userId: string, taskData: any, token: string) => {
    const response = await fetch(`${PROXY_TODO_URL}?userId=${encodeURIComponent(userId)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...taskData, user_id: userId }),
    });

    return handleResponse(response);
  },

  // Update a task
  updateTask: async (userId: string, taskId: number, taskData: any, token: string) => {
    const response = await fetch(`${PROXY_TODO_URL}?userId=${encodeURIComponent(userId)}&taskId=${taskId}`, {
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
    const response = await fetch(`${PROXY_TODO_URL}?userId=${encodeURIComponent(userId)}&taskId=${taskId}`, {
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
    const response = await fetch(`${PROXY_TODO_URL}?userId=${encodeURIComponent(userId)}&taskId=${taskId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },
};