/**
 * Authentication utility functions
 */

/**
 * Check if user is authenticated
 * @returns true if auth token exists in localStorage
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * Get the current user data from localStorage
 * @returns user data or null if not authenticated
 */
export const getCurrentUser = (): any | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Store user data in localStorage
 * @param userData - User information to store
 */
export const setCurrentUser = (userData: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
};

/**
 * Clear user data from localStorage
 */
export const clearCurrentUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userData');
  }
};

/**
 * Logout user by clearing all authentication data
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }
};
