import { ApiResponse, Doctor, LoginCredentials, AuthResponse } from './types';
import { setCurrentUser, clearCurrentUser } from './auth-utils';

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
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Login failed:', response.status, errorData);
      return {
        success: false,
        message: errorData.message || `Server error: ${response.status}`,
      };
    }

    const data = await response.json();
    console.log('Login response:', data);
    
    if (data.success && data.token) {
      setAuthToken(data.token);
      // Store user data if available
      if (data.user) {
        setCurrentUser(data.user);
      }
    }

    return data;
  },

  signup: async (signupData: any): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/admin/signup`, {
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
    clearCurrentUser();
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

  // Get all approved doctors
  getApprovedDoctors: async (): Promise<ApiResponse<Doctor[]>> => {
    try {
      const response = await fetchWithAuth('/admin/doctors/approved', {
        method: 'GET',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch approved doctors');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching approved doctors:', error);
      throw error;
    }
  },

  // Get all rejected doctors
  getRejectedDoctors: async (): Promise<ApiResponse<Doctor[]>> => {
    try {
      const response = await fetchWithAuth('/admin/doctors/rejected', {
        method: 'GET',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch rejected doctors');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching rejected doctors:', error);
      throw error;
    }
  },

  // Approve a doctor
  approveDoctor: async (doctorId: string): Promise<ApiResponse<Doctor>> => {
    try {
      const response = await fetchWithAuth(`/admin/doctors/${doctorId}/approve`, {
        method: 'PUT',
      });

      console.log('Approve doctor response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error response:', errorText);
        
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { message: errorText || `Server error: ${response.status}` };
        }
        
        throw new Error(error.message || error.error || 'Failed to approve doctor');
      }

      return response.json();
    } catch (error: any) {
      console.error('Error approving doctor:', error.message || error);
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
