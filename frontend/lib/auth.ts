/**
 * Authentication utilities for the Todo application
 * Handles JWT token management and user state
 */

// Function to save JWT token to localStorage
export const saveToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    console.log('Saving token to localStorage:', token.substring(0, 20) + '...');
    localStorage.setItem('jwt_token', token);
    console.log('Token saved, current length:', localStorage.getItem('jwt_token')?.length);
  }
};

// Function to get JWT token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwt_token');
    console.log('Retrieved token from localStorage:', token ? token.substring(0, 20) + '...' : 'null');
    return token;
  }
  return null;
};

// Function to remove JWT token from localStorage
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
};

// Function to decode JWT token and get user info
export const getUserFromToken = (): any => {
  const token = getToken();
  if (!token) {
    console.log('No token found when getting user info');
    return null;
  }

  try {
    // Split the token to get the payload part
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('Invalid JWT format when getting user info');
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    // Add padding if needed
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);

    // Safely decode base64
    let decodedPayload;
    try {
      decodedPayload = atob(paddedPayload);
    } catch (decodeError) {
      console.error('Error decoding base64 payload in getUserFromToken:', decodeError);
      return null;
    }

    let userData;
    try {
      userData = JSON.parse(decodedPayload);
    } catch (parseError) {
      console.error('Error parsing JSON payload in getUserFromToken:', parseError);
      return null;
    }

    console.log('Successfully decoded user info from token:', userData);

    // Ensure the user ID is available - check both user_id and id fields
    if (!userData.user_id && !userData.id) {
      console.error('Token does not contain user ID field (either user_id or id)');
      return null;
    }

    // Return a consistent format with both possible field names
    return {
      ...userData,
      id: userData.user_id || userData.id
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Function to logout user
export const logout = (): void => {
  removeToken();
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) {
    console.log('No token found in localStorage');
    return false;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('Invalid JWT format: not enough parts');
      return false;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    // Add padding if needed
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);

    // Safely decode base64
    let decodedPayload;
    try {
      decodedPayload = atob(paddedPayload);
    } catch (decodeError) {
      console.error('Error decoding base64 payload:', decodeError);
      return false;
    }

    let userData;
    try {
      userData = JSON.parse(decodedPayload);
    } catch (parseError) {
      console.error('Error parsing JSON payload:', parseError);
      return false;
    }

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (userData.exp && userData.exp < currentTime) {
      console.log('Token is expired, removing from localStorage');
      removeToken();
      return false;
    }

    console.log('Token is valid');
    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    // If there's an error decoding the token, remove it
    removeToken();
    return false;
  }
};

// Function to set up request headers with JWT token
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Function to create a mock JWT token with user data
export const createMockToken = (userData: any): string => {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const payload = JSON.stringify({
    ...userData,
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // Expire in 7 days
  });

  // Encode header and payload (in a real app, you'd sign with a secret)
  const encodedHeader = btoa(header);
  const encodedPayload = btoa(payload);

  // Mock signature (in a real app, this would be properly signed)
  const signature = 'mock_signature';

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};