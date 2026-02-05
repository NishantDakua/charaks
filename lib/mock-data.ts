
import { Doctor, RemarkHistory } from './types';

export const MOCK_DOCTORS: Doctor[] = [
    {
        id: "doc_001",
        fullName: "Dr. Rajesh Koothrappali",
        email: "rajesh.k@example.com",
        phoneNumber: "+91 98765 43210",
        profilePhoto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
        specialization: "Cardiologist",
        qualification: "MBBS, MD (Cardiology)",
        experienceYears: 8,
        registrationNumber: "MCI-2015-8976",
        address: {
            id: "addr_001",
            street: "45, Healthcare Avenue",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            country: "India"
        },
        languages: ["English", "Hindi", "Marathi"],
        about: "Specialist in interventional cardiology with a focus on preventive care.",
        status: "pending",
        aadhaarCardImage: "https://placehold.co/600x400/png?text=Aadhaar+Card",
        verificationDocuments: [
            "https://placehold.co/600x800/png?text=MBBS+Degree",
            "https://placehold.co/600x800/png?text=MD+Certificate"
        ],
        remarksHistory: [],
        createdAt: "2024-03-10T09:00:00Z",
        updatedAt: "2024-03-10T09:00:00Z"
    },
    {
        id: "doc_002",
        fullName: "Dr. Priya Sharma",
        email: "priya.sharma@example.com",
        phoneNumber: "+91 98765 12345",
        profilePhoto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
        specialization: "Dermatologist",
        qualification: "MBBS, DDVL",
        experienceYears: 5,
        registrationNumber: "DMC-2018-4532",
        address: {
            id: "addr_002",
            street: "12, Skin Care Lane",
            city: "Delhi",
            state: "Delhi",
            pincode: "110001",
            country: "India"
        },
        languages: ["English", "Hindi"],
        about: "Expert in clinical and aesthetic dermatology.",
        status: "approved",
        approvedAt: "2024-03-01T14:30:00Z",
        approvedBy: "Admin User",
        approvalRemarks: "Documents verified successfully.",
        aadhaarCardImage: "https://placehold.co/600x400/png?text=Aadhaar+Card",
        verificationDocuments: [
            "https://placehold.co/600x800/png?text=Medical+Reg+Cert"
        ],
        remarksHistory: [
            {
                id: "hist_001",
                action: "approve",
                remark: "Documents verified successfully.",
                timestamp: "2024-03-01T14:30:00Z",
                by: "Admin User"
            }
        ],
        createdAt: "2024-02-28T10:00:00Z",
        updatedAt: "2024-03-01T14:30:00Z"
    },
    {
        id: "doc_003",
        fullName: "Dr. Amit Patel",
        email: "amit.patel@example.com",
        phoneNumber: "+91 98765 67890",
        profilePhoto: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
        specialization: "Orthopedic Surgeon",
        qualification: "MBBS, MS (Ortho)",
        experienceYears: 12,
        registrationNumber: "GMC-2010-1234",
        address: {
            id: "addr_003",
            street: "78, Bone Joint Road",
            city: "Ahmedabad",
            state: "Gujarat",
            pincode: "380001",
            country: "India"
        },
        languages: ["English", "Hindi", "Gujarati"],
        about: "Specializing in joint replacement and sports injuries.",
        status: "rejected",
        rejectedAt: "2024-03-05T16:45:00Z",
        rejectedBy: "Admin User",
        rejectionRemarks: "Registration certificate expired. Please upload valid document.",
        aadhaarCardImage: "https://placehold.co/600x400/png?text=Aadhaar+Card",
        verificationDocuments: [
            "https://placehold.co/600x800/png?text=Expired+Reg+Cert"
        ],
        remarksHistory: [
            {
                id: "hist_002",
                action: "reject",
                remark: "Registration certificate expired. Please upload valid document.",
                timestamp: "2024-03-05T16:45:00Z",
                by: "Admin User"
            }
        ],
        createdAt: "2024-03-04T09:15:00Z",
        updatedAt: "2024-03-05T16:45:00Z"
    },
    {
        id: "doc_004",
        fullName: "Dr. Sarah Khan",
        email: "sarah.k@example.com",
        phoneNumber: "+91 99887 76655",
        profilePhoto: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
        specialization: "Pediatrician",
        qualification: "MBBS, MD (Pediatrics)",
        experienceYears: 4,
        registrationNumber: "KMC-2019-5678",
        address: {
            id: "addr_004",
            street: "22, Kids Care Plaza",
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560001",
            country: "India"
        },
        languages: ["English", "Hindi", "Kannada", "Urdu"],
        about: "Dedicated to child healthcare and vaccination.",
        status: "pending",
        aadhaarCardImage: "https://placehold.co/600x400/png?text=Aadhaar+Card",
        verificationDocuments: [
            "https://placehold.co/600x800/png?text=Degree+Certificate"
        ],
        remarksHistory: [],
        createdAt: "2024-03-11T11:20:00Z",
        updatedAt: "2024-03-11T11:20:00Z"
    },
    {
        id: "doc_005",
        fullName: "Dr. Vikram Singh",
        email: "vikram.s@example.com",
        phoneNumber: "+91 88997 76655",
        profilePhoto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
        specialization: "Neurologist",
        qualification: "MBBS, DM (Neurology)",
        experienceYears: 15,
        registrationNumber: "PMC-2008-3321",
        address: {
            id: "addr_005",
            street: "101, Brain Health Center",
            city: "Pune",
            state: "Maharashtra",
            pincode: "411001",
            country: "India"
        },
        languages: ["English", "Hindi", "Marathi"],
        about: "Expert in treating epilepsy, stroke, and headache disorders.",
        status: "pending",
        aadhaarCardImage: "https://placehold.co/600x400/png?text=Aadhaar+Card",
        verificationDocuments: [],
        remarksHistory: [
            {
                id: "hist_003",
                action: "reject",
                remark: "Blurry Aadhaar image. Re-upload requested.",
                timestamp: "2024-03-01T10:00:00Z",
                by: "Sub-Admin 1"
            }
        ],
        createdAt: "2024-02-20T14:00:00Z",
        updatedAt: "2024-03-01T10:00:00Z"
    }
];
