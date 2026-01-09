"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserCheck, Settings, BarChart3 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock data for doctor applications
const mockPendingDoctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@medical.com",
    applicationDate: "2026-01-08",
    specialization: "Cardiology",
    license: "MD-12345-CA",
    experience: "8 years",
    hospitalAffiliation: "City Hospital",
    details: "Requesting verification and approval for platform access",
    avatar: "",
    status: "pending" as const,
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@medical.com",
    applicationDate: "2026-01-09",
    specialization: "Pediatrics",
    license: "MD-67890-NY",
    experience: "5 years",
    details: "Applying for doctor account with telemedicine capability",
    avatar: "",
    status: "pending" as const,
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    email: "m.chen@medical.com",
    applicationDate: "2026-01-10",
    specialization: "Dermatology",
    license: "MD-11111-TX",
    experience: "12 years",
    details: "Request for professional verification and network access",
    avatar: "",
    status: "pending" as const,
  },
];

const mockApprovedDoctors = [
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    email: "emily.r@medical.com",
    applicationDate: "2026-01-05",
    approvedDate: "2026-01-06",
    specialization: "Internal Medicine",
    license: "MD-22222-FL",
    experience: "10 years",
    details: "Professional verification completed",
    avatar: "",
    status: "approved" as const,
  },
  {
    id: 5,
    name: "Dr. David Wilson",
    email: "d.wilson@medical.com",
    applicationDate: "2026-01-04",
    approvedDate: "2026-01-05",
    specialization: "Orthopedics",
    license: "MD-33333-CA",
    experience: "15 years",
    details: "Verification completed successfully",
    avatar: "",
    status: "approved" as const,
  },
];

type DoctorApplication = {
  id: number;
  name: string;
  email: string;
  applicationDate: string;
  approvedDate?: string;
  rejectedDate?: string;
  specialization: string;
  license: string;
  experience: string;
  details: string;
  avatar: string;
  status: "pending" | "approved" | "rejected";
  remarks?: string;
};

export default function AdminPanel() {
  const [pendingDoctors, setPendingDoctors] = useState<DoctorApplication[]>(mockPendingDoctors);
  const [approvedDoctors, setApprovedDoctors] = useState<DoctorApplication[]>(mockApprovedDoctors);
  const [rejectedDoctors, setRejectedDoctors] = useState<DoctorApplication[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorApplication | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const openActionDialog = (doctor: DoctorApplication, action: "approve" | "reject") => {
    setSelectedDoctor(doctor);
    setActionType(action);
    setRemarks("");
    setIsDialogOpen(true);
  };

  const handleDirectApprove = (doctor: DoctorApplication) => {
    console.log("Approving doctor:", doctor.name);
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Remove from pending using functional update
    setPendingDoctors(prev => {
      console.log("Previous pending:", prev.length);
      const filtered = prev.filter(d => d.id !== doctor.id);
      console.log("After filter:", filtered.length);
      return filtered;
    });
    
    // Add to approved directly without dialog using functional update
    setApprovedDoctors(prev => {
      console.log("Previous approved:", prev.length);
      const updated = [
        ...prev,
        { 
          ...doctor, 
          approvedDate: currentDate,
          status: "approved" as const
        }
      ];
      console.log("After adding:", updated.length);
      return updated;
    });
  };

  const handleConfirmAction = () => {
    if (!selectedDoctor || !actionType) return;
    
    // Only require remarks for rejection
    if (actionType === "reject" && !remarks.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    console.log("Rejecting doctor:", selectedDoctor.name);
    const currentDate = new Date().toISOString().split('T')[0];

    if (actionType === "reject") {
      // Remove from pending using functional update
      setPendingDoctors(prev => {
        console.log("Previous pending:", prev.length);
        const filtered = prev.filter(d => d.id !== selectedDoctor.id);
        console.log("After filter:", filtered.length);
        return filtered;
      });
      
      // Add to rejected with required remarks using functional update
      setRejectedDoctors(prev => {
        console.log("Previous rejected:", prev.length);
        const updated = [
          ...prev,
          { 
            ...selectedDoctor, 
            rejectedDate: currentDate,
            status: "rejected" as const,
            remarks: remarks.trim()
          }
        ];
        console.log("After adding:", updated.length);
        return updated;
      });
    }

    // Close dialog and reset state
    setIsDialogOpen(false);
    setSelectedDoctor(null);
    setActionType(null);
    setRemarks("");
  };

  const handleReject = (doctorId: number) => {
    console.log("Reject button clicked for doctor ID:", doctorId);
    const doctor = pendingDoctors.find(d => d.id === doctorId);
    if (doctor) {
      console.log("Found doctor:", doctor.name);
      openActionDialog(doctor, "reject");
    } else {
      console.log("Doctor not found!");
    }
  };

  const handleApprove = (doctor: DoctorApplication) => {
    console.log("Approve button clicked for:", doctor.name);
    handleDirectApprove(doctor);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Header */}
      <div className="relative border-b border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Doctor Verification & Approval</h1>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Manage doctor applications and professional verifications
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => router.push("/admin/sub-admins")}
                className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-md border border-blue-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-gray-900 dark:text-gray-100 font-medium"
              >
                <Users className="h-4 w-4 mr-2" />
                Sub Admins
              </Button>
              <Button 
                onClick={() => router.push("/admin/features")}
                className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-md border border-purple-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-gray-900 dark:text-gray-100 font-medium"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Features
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="group cursor-pointer bg-white/80 dark:bg-gray-900/80 hover:bg-white/95 dark:hover:bg-gray-900/95 backdrop-blur-xl border-white/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader className="pb-4 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-linear-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <CardDescription className="text-xs font-medium text-gray-600 dark:text-gray-400">Pending Applications</CardDescription>
                  <CardTitle className="text-4xl font-bold bg-linear-to-br from-orange-600 to-red-600 bg-clip-text text-transparent mt-1">{pendingDoctors.length}</CardTitle>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            </CardHeader>
          </Card>
          
          <Card className="group cursor-pointer bg-white/80 dark:bg-gray-900/80 hover:bg-white/95 dark:hover:bg-gray-900/95 backdrop-blur-xl border-white/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader className="pb-4 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <CardDescription className="text-xs font-medium text-gray-600 dark:text-gray-400">Approved Doctors</CardDescription>
                  <CardTitle className="text-4xl font-bold bg-linear-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent mt-1">{approvedDoctors.length}</CardTitle>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
            </CardHeader>
          </Card>
          
          <Card className="group cursor-pointer bg-white/80 dark:bg-gray-900/80 hover:bg-white/95 dark:hover:bg-gray-900/95 backdrop-blur-xl border-white/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader className="pb-4 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-linear-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <CardDescription className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Doctors</CardDescription>
                  <CardTitle className="text-4xl font-bold bg-linear-to-br from-purple-600 to-indigo-600 bg-clip-text text-transparent mt-1">{approvedDoctors.length + pendingDoctors.length + rejectedDoctors.length}</CardTitle>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
            </CardHeader>
          </Card>
        </div>

        {/* Tabs for Doctor Applications */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pendingDoctors.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedDoctors.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedDoctors.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Doctor Applications Tab */}
          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingDoctors.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No pending doctor applications at the moment
                </CardContent>
              </Card>
            ) : (
              pendingDoctors.map((doctor) => (
                <Card key={doctor.id} className="group overflow-hidden bg-white/80 dark:bg-gray-900/80 hover:bg-white/95 dark:hover:bg-gray-900/95 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-orange-400 via-red-400 to-pink-400 pointer-events-none" />
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      {/* Doctor Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="relative">
                          <Avatar className="h-16 w-16 ring-4 ring-orange-100 dark:ring-orange-900">
                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                            <AvatarFallback className="bg-linear-to-br from-orange-400 to-orange-600 text-white text-lg font-bold">{getInitials(doctor.name)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-xl bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{doctor.name}</h3>
                            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-orange-300">Pending Review</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            {doctor.email}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center gap-2 p-2 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                              <div>
                                <p className="text-xs text-muted-foreground">Specialization</p>
                                <p className="font-semibold text-sm">{doctor.specialization}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">L</div>
                              <div>
                                <p className="text-xs text-muted-foreground">License</p>
                                <p className="font-semibold text-sm">{doctor.license}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-linear-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">E</div>
                              <div>
                                <p className="text-xs text-muted-foreground">Experience</p>
                                <p className="font-semibold text-sm">{doctor.experience}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">📅</div>
                              <div>
                                <p className="text-xs text-muted-foreground">Applied</p>
                                <p className="font-semibold text-sm">{doctor.applicationDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 md:flex-col">
                        <Button
                          onClick={() => {
                            console.log("Button clicked!", doctor);
                            handleApprove(doctor);
                          }}
                          className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                          size="lg"
                        >
                          ✓ Approve
                        </Button>
                        <Button
                          onClick={() => {
                            console.log("Reject button clicked!", doctor.id);
                            handleReject(doctor.id);
                          }}
                          variant="outline"
                          className="flex-1 md:flex-none border-2 border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-950 text-red-600 dark:text-red-400 font-semibold"
                          size="lg"
                        >
                          ✕ Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Approved Doctors Tab */}
          <TabsContent value="approved" className="space-y-4 mt-6">
            {approvedDoctors.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No approved doctors yet
                </CardContent>
              </Card>
            ) : (
              approvedDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-14 w-14 ring-4 ring-green-100 dark:ring-green-900">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback className="bg-linear-to-br from-green-400 to-green-600 text-white font-bold">{getInitials(doctor.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{doctor.name}</h3>
                            <Badge className="bg-linear-to-r from-green-500 to-green-600 text-white border-0 shadow-sm">✓ Approved</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{doctor.email}</p>
                          <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                            <div className="p-2 bg-green-50 dark:bg-green-950 rounded"><span className="font-medium">Specialization:</span> {doctor.specialization}</div>
                            <div className="p-2 bg-green-50 dark:bg-green-950 rounded"><span className="font-medium">License:</span> {doctor.license}</div>
                            <div className="p-2 bg-green-50 dark:bg-green-950 rounded"><span className="font-medium">Experience:</span> {doctor.experience}</div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p className="flex items-center gap-2"><span className="text-green-500">●</span> Applied: {doctor.applicationDate}</p>
                            {doctor.approvedDate && <p className="flex items-center gap-2"><span className="text-green-500">✓</span> Approved: {doctor.approvedDate}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Rejected Doctors Tab */}
          <TabsContent value="rejected" className="space-y-4 mt-6">
            {rejectedDoctors.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No rejected doctors yet
                </CardContent>
              </Card>
            ) : (
              rejectedDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-14 w-14 ring-4 ring-red-100 dark:ring-red-900">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback className="bg-linear-to-br from-red-400 to-red-600 text-white font-bold">{getInitials(doctor.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{doctor.name}</h3>
                            <Badge className="bg-linear-to-r from-red-500 to-red-600 text-white border-0 shadow-sm">✕ Rejected</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{doctor.email}</p>
                          <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                            <div className="p-2 bg-red-50 dark:bg-red-950 rounded"><span className="font-medium">Specialization:</span> {doctor.specialization}</div>
                            <div className="p-2 bg-red-50 dark:bg-red-950 rounded"><span className="font-medium">License:</span> {doctor.license}</div>
                            <div className="p-2 bg-red-50 dark:bg-red-950 rounded"><span className="font-medium">Experience:</span> {doctor.experience}</div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-2">
                            <p className="flex items-center gap-2"><span className="text-red-500">●</span> Applied: {doctor.applicationDate}</p>
                            {doctor.rejectedDate && <p className="flex items-center gap-2"><span className="text-red-500">✕</span> Rejected: {doctor.rejectedDate}</p>}
                            {doctor.remarks && (
                              <div className="mt-3 p-3 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded">
                                <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Rejection Reason:</p>
                                <p className="text-sm text-red-700 dark:text-red-300">{doctor.remarks}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Doctor Approval Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reject Doctor Application</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this doctor's application.
              </DialogDescription>
            </DialogHeader>
            
            {selectedDoctor && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                    <AvatarFallback>{getInitials(selectedDoctor.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedDoctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialization}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="remarks">Rejection Reason *</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Please specify the reason for rejection (required)..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                    className="border-red-300 focus:border-red-500"
                  />
                  {!remarks.trim() && (
                    <p className="text-xs text-red-500">Rejection reason is required</p>
                  )}
                </div>
              </div>
            )}
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmAction}
                disabled={!remarks.trim()}
                className="bg-red-500 hover:bg-red-600"
              >
                ✕ Reject Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
