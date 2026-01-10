export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: number;
}

export interface Doctor {
  id: string;
  fullName: string;
  gender: string;
  specialization: string;
  experienceYears: number;
  registrationNumber: string;
  languages: string[];
  phoneNumber: string;
  about: string;
  isApproved: boolean;
  approvalRemark?: string | null;
  address?: Address | null;
  education?: Education[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
  message?: string;
}
