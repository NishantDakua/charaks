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
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  specialization: string;
  experienceYears: number;
  registrationNumber: string;
  qualification: string;
  address?: Address | null;
  education?: Education[];
  languages: string[];
  about: string;
  
  // Verification Documents
  aadhaarCardImage?: string;
  verificationDocuments?: string[];

  // Status & Actions
  status: 'pending' | 'approved' | 'rejected';
  
  // Approval Details
  approvedAt?: string;
  approvedBy?: string;
  approvalRemarks?: string;

  // Rejection Details
  rejectedAt?: string;
  rejectedBy?: string;
  rejectionRemarks?: string;

  // Remarks History
  remarksHistory?: RemarkHistory[];

  createdAt: string;
  updatedAt: string;
}

export interface RemarkHistory {
  id: string;
  action: 'approve' | 'reject';
  remark: string;
  timestamp: string;
  by: string; // Admin Name/ID
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
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      role: string;
    };
  };
  message?: string;
}
