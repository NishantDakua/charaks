import { ApiResponse, Doctor, LoginCredentials, AuthResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper function to set auth token in localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

// Helper function to remove auth token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// Helper function to make API requests with auth
async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}

// Authentication APIs
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.success && data.token) {
      setAuthToken(data.token);
    }

    return data;
  },

  signup: async (signupData: any): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    return response.json();
  },

  logout: (): void => {
    removeAuthToken();
  },
};

// Admin APIs
export const adminApi = {
  // Get all pending doctors
  getPendingDoctors: async (): Promise<ApiResponse<Doctor[]>> => {
    try {
      const response = await fetchWithAuth('/admin/doctors/pending', {
        method: 'GET',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch pending doctors');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching pending doctors:', error);
      throw error;
    }
  },

  // Approve a doctor
  approveDoctor: async (doctorId: string): Promise<ApiResponse<Doctor>> => {
    try {
      const response = await fetchWithAuth(`/admin/doctors/${doctorId}/approve`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to approve doctor');
      }

      return response.json();
    } catch (error) {
      console.error('Error approving doctor:', error);
      throw error;
    }
  },

  // Reject a doctor with remark
  rejectDoctor: async (
    doctorId: string,
    remark: string
  ): Promise<ApiResponse<Doctor>> => {
    try {
      const response = await fetchWithAuth(`/admin/doctors/${doctorId}/reject`, {
        method: 'PUT',
        body: JSON.stringify({ remark }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reject doctor');
      }

      return response.json();
    } catch (error) {
      console.error('Error rejecting doctor:', error);
      throw error;
    }
  },
};

// Export API URL for direct use if needed
export { API_URL };
