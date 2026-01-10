/**
 * API Error Handler
 * Provides standardized error messages for common API errors
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getErrorMessage = (error: any): string => {
  // Network error
  if (error.message === 'Failed to fetch' || !navigator.onLine) {
    return 'Network error. Please check your internet connection and try again.';
  }

  // API Error with message
  if (error.message) {
    return error.message;
  }

  // HTTP Status errors
  if (error.statusCode) {
    switch (error.statusCode) {
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return 'Resource not found.';
      case 409:
        return 'Conflict. This resource already exists.';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return `Error ${error.statusCode}: Something went wrong.`;
    }
  }

  return 'An unexpected error occurred. Please try again.';
};

export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: getErrorMessage(error),
    error: error.message || 'Unknown error',
  };
};
