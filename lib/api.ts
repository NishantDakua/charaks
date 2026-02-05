
import { ApiResponse, Doctor, LoginCredentials, AuthResponse } from './types';
import { setCurrentUser, clearCurrentUser } from './auth-utils';
import { MOCK_DOCTORS } from './mock-data';

// Export API URL for direct use if needed (even though we mock)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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

// In-memory store for the session
let doctors = [...MOCK_DOCTORS];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication APIs (Mock)
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800); // Simulate network
    // Mock successful login for any non-empty credentials
    if (credentials.username && credentials.password) {
      const token = "mock-jwt-token-" + Math.random().toString(36).substring(7);
      const user = {
        id: "admin-user-1",
        username: credentials.username,
        role: "admin" // Default to admin for demo
      };

      setAuthToken(token);
      setCurrentUser(user);

      return {
        success: true,
        token,
        user,
        message: "Login successful"
      };
    }
    return {
      success: false,
      message: "Invalid credentials"
    };
  },

  signup: async (signupData: any): Promise<AuthResponse> => {
    await delay(800);
    return {
      success: true,
      message: "Signup successful"
    };
  },

  logout: (): void => {
    removeAuthToken();
    clearCurrentUser();
  },
};

// Admin APIs (Mock)
export const adminApi = {
  // Get all pending doctors
  getPendingDoctors: async (): Promise<ApiResponse<Doctor[]>> => {
    await delay(600);
    const pending = doctors.filter(d => d.status === 'pending');
    return {
      success: true,
      data: pending,
      count: pending.length
    };
  },

  // Get all approved doctors
  getApprovedDoctors: async (): Promise<ApiResponse<Doctor[]>> => {
    await delay(600);
    const approved = doctors.filter(d => d.status === 'approved');
    return {
      success: true,
      data: approved,
      count: approved.length
    };
  },

  // Get all rejected doctors
  getRejectedDoctors: async (): Promise<ApiResponse<Doctor[]>> => {
    await delay(600);
    const rejected = doctors.filter(d => d.status === 'rejected');
    return {
      success: true,
      data: rejected,
      count: rejected.length
    };
  },

  // Approve a doctor
  approveDoctor: async (doctorId: string, remarks?: string): Promise<ApiResponse<Doctor>> => {
    await delay(800);
    const doctorIndex = doctors.findIndex(d => d.id === doctorId);

    if (doctorIndex === -1) {
      throw new Error("Doctor not found");
    }

    const doctor = doctors[doctorIndex];
    const timestamp = new Date().toISOString();
    const adminName = "Admin User"; // Mock admin name

    // Update doctor object
    const updatedDoctor: Doctor = {
      ...doctor,
      status: 'approved',
      approvedAt: timestamp,
      approvedBy: adminName,
      approvalRemarks: remarks || "Approved via Admin Dashboard",
      updatedAt: timestamp,
      remarksHistory: [
        ...(doctor.remarksHistory || []),
        {
          id: `hist_${Date.now()}`,
          action: 'approve',
          remark: remarks || "Approved via Admin Dashboard",
          timestamp,
          by: adminName
        }
      ]
    };

    doctors[doctorIndex] = updatedDoctor;

    return {
      success: true,
      data: updatedDoctor,
      message: "Doctor approved successfully"
    };
  },

  // Reject a doctor with remark
  rejectDoctor: async (
    doctorId: string,
    remark: string
  ): Promise<ApiResponse<Doctor>> => {
    await delay(800);
    const doctorIndex = doctors.findIndex(d => d.id === doctorId);

    if (doctorIndex === -1) {
      throw new Error("Doctor not found");
    }

    const doctor = doctors[doctorIndex];
    const timestamp = new Date().toISOString();
    const adminName = "Admin User";

    const updatedDoctor: Doctor = {
      ...doctor,
      status: 'rejected',
      rejectedAt: timestamp,
      rejectedBy: adminName,
      rejectionRemarks: remark,
      updatedAt: timestamp,
      remarksHistory: [
        ...(doctor.remarksHistory || []),
        {
          id: `hist_${Date.now()}`,
          action: 'reject',
          remark: remark,
          timestamp,
          by: adminName
        }
      ]
    };

    doctors[doctorIndex] = updatedDoctor;

    return {
      success: true,
      data: updatedDoctor,
      message: "Doctor rejected successfully"
    };
  },
};
