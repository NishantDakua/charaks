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
    hospitalAffiliation: "Children's Healthcare",
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
    hospitalAffiliation: "Medical Center",
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
    hospitalAffiliation: "Regional Hospital",
    details: "Professional verification completed",
    avatar: "",
    status: "approved" as const,
    remarks: "All documents verified and credentials confirmed",
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
    hospitalAffiliation: "Trauma Center",
    details: "Verification completed successfully",
    avatar: "",
    status: "approved" as const,
    remarks: "License and credentials verified. Account activated.",
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
  hospitalAffiliation: string;
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

  const handleConfirmAction = () => {
    if (!selectedDoctor || !actionType || !remarks.trim()) return;

    const currentDate = new Date().toISOString().split('T')[0];

    if (actionType === "approve") {
      // Remove from pending
      setPendingDoctors(pendingDoctors.filter(d => d.id !== selectedDoctor.id));
      
      // Add to approved with remarks
      setApprovedDoctors([
        ...approvedDoctors,
        { 
          ...selectedDoctor, 
          approvedDate: currentDate,
          status: "approved" as const,
          remarks: remarks.trim()
        }
      ]);
    } else if (actionType === "reject") {
      // Remove from pending
      setPendingDoctors(pendingDoctors.filter(d => d.id !== selectedDoctor.id));
      
      // Add to rejected with remarks
      setRejectedDoctors([
        ...rejectedDoctors,
        { 
          ...selectedDoctor, 
          rejectedDate: currentDate,
          status: "rejected" as const,
          remarks: remarks.trim()
        }
      ]);
    }

    // Close dialog and reset state
    setIsDialogOpen(false);
    setSelectedDoctor(null);
    setActionType(null);
    setRemarks("");
  };

  const handleReject = (doctorId: number) => {
    const doctor = pendingDoctors.find(d => d.id === doctorId);
    if (doctor) {
      openActionDialog(doctor, "reject");
    }
  };

  const handleApprove = (doctor: DoctorApplication) => {
    openActionDialog(doctor, "approve");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Doctor Verification & Approval</h1>
              <p className="text-muted-foreground">Manage doctor applications and professional verifications</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/admin/sub-admins")}>
                <Users className="h-4 w-4 mr-2" />
                Sub Admins
              </Button>
              <Button variant="outline" onClick={() => router.push("/admin/features")}>
                Manage Features
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                <CardDescription>Pending Applications</CardDescription>
              </div>
              <CardTitle className="text-3xl">{pendingDoctors.length}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-500" />
                <CardDescription>Approved Doctors</CardDescription>
              </div>
              <CardTitle className="text-3xl">{approvedDoctors.length}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                <CardDescription>Total Doctors</CardDescription>
              </div>
              <CardTitle className="text-3xl">{approvedDoctors.length + pendingDoctors.length + rejectedDoctors.length}</CardTitle>
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
                <Card key={doctor.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Doctor Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{doctor.email}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                            <div>
                              <span className="font-medium">Specialization:</span> {doctor.specialization}
                            </div>
                            <div>
                              <span className="font-medium">License:</span> {doctor.license}
                            </div>
                            <div>
                              <span className="font-medium">Experience:</span> {doctor.experience}
                            </div>
                            <div>
                              <span className="font-medium">Hospital:</span> {doctor.hospitalAffiliation}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Applied on: {doctor.applicationDate}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 md:flex-col lg:flex-row">
                        <Button
                          onClick={() => handleApprove(doctor)}
                          className="flex-1 md:flex-none bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(doctor.id)}
                          variant="outline"
                          className="flex-1 md:flex-none"
                        >
                          Reject
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
                <Card key={doctor.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{doctor.email}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                            <div><span className="font-medium">Specialization:</span> {doctor.specialization}</div>
                            <div><span className="font-medium">License:</span> {doctor.license}</div>
                            <div><span className="font-medium">Experience:</span> {doctor.experience}</div>
                            <div><span className="font-medium">Hospital:</span> {doctor.hospitalAffiliation}</div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Applied: {doctor.applicationDate}</p>
                            {doctor.approvedDate && <p>Approved: {doctor.approvedDate}</p>}
                            {doctor.remarks && <p className="text-green-600 dark:text-green-400 mt-2 text-sm font-medium">Approval Notes: {doctor.remarks}</p>}
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
                <Card key={doctor.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{doctor.email}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                            <div><span className="font-medium">Specialization:</span> {doctor.specialization}</div>
                            <div><span className="font-medium">License:</span> {doctor.license}</div>
                            <div><span className="font-medium">Experience:</span> {doctor.experience}</div>
                            <div><span className="font-medium">Hospital:</span> {doctor.hospitalAffiliation}</div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Applied: {doctor.applicationDate}</p>
                            {doctor.rejectedDate && <p>Rejected: {doctor.rejectedDate}</p>}
                            {doctor.remarks && <p className="text-red-600 dark:text-red-400 mt-2 text-sm font-medium">Rejection Reason: {doctor.remarks}</p>}
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
              <DialogTitle>
                {actionType === "approve" ? "Approve Doctor Application" : "Reject Doctor Application"}
              </DialogTitle>
              <DialogDescription>
                {actionType === "approve" 
                  ? "Please provide verification notes or approval reason for this doctor."
                  : "Please provide reason for rejecting this doctor's application."
                }
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
                  <Label htmlFor="remarks">
                    {actionType === "approve" ? "Verification Notes *" : "Rejection Reason *"}
                  </Label>
                  <Textarea
                    id="remarks"
                    placeholder={`Enter your ${actionType === "approve" ? "approval notes" : "rejection reason"}...`}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                  />
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
                className={actionType === "reject" ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}
              >
                {actionType === "approve" ? "Approve Doctor" : "Reject Application"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
