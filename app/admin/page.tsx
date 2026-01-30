"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  Loader2, 
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  TrendingUp,
  FileText,
  Users,
  Briefcase,
  Globe,
  MapPin
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminApi } from "@/lib/api";
import { Doctor } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated } from "@/lib/auth-utils";

export default function AdminPanel() {
  const [pendingDoctors, setPendingDoctors] = useState<Doctor[]>([]);
  const [approvedDoctors, setApprovedDoctors] = useState<Doctor[]>([]);
  const [rejectedDoctors, setRejectedDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // Check authentication and fetch pending doctors on mount
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please login to access the admin dashboard.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }
    
    fetchAllDoctors();
  }, [router, toast]);

  const fetchAllDoctors = async () => {
    try {
      setIsLoading(true);
      
      // Fetch pending doctors
      const pendingRes = await adminApi.getPendingDoctors();
      
      if (pendingRes.success && pendingRes.data) {
        setPendingDoctors(pendingRes.data);
      }
      
      // Try to fetch approved and rejected doctors if backend supports it
      try {
        const approvedRes = await adminApi.getApprovedDoctors();
        if (approvedRes.success && approvedRes.data) {
          setApprovedDoctors(approvedRes.data);
        }
      } 
      catch (err) {
        // Backend doesn't support approved endpoint yet
        console.log('Approved doctors endpoint not available');
        
      }
      
      try {
        const rejectedRes = await adminApi.getRejectedDoctors();
        if (rejectedRes.success && rejectedRes.data) {
          setRejectedDoctors(rejectedRes.data);
        }
      } catch (err) {
        // Backend doesn't support rejected endpoint yet
        console.log('Rejected doctors endpoint not available');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch doctors. Please check your connection.",
        variant: "destructive",
      });
      console.error("Error fetching doctors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getPendingDoctors();
      
      if (response.success && response.data) {
        setPendingDoctors(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch pending doctors",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch pending doctors. Please check your connection.",
        variant: "destructive",
      });
      console.error("Error fetching pending doctors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openActionDialog = (doctor: Doctor, action: "approve" | "reject") => {
    setSelectedDoctor(doctor);
    setActionType(action);
    setRemarks("");
    setIsDialogOpen(true);
  };

  const handleDirectApprove = async (doctor: Doctor) => {
    try {
      setIsActionLoading(true);
      const response = await adminApi.approveDoctor(doctor.id);
      
      console.log('Approve response received:', response);
      
      if (response.success || response.data) {
        // Remove from pending
        setPendingDoctors(prev => prev.filter(d => d.id !== doctor.id));
        
        // Add to approved - use returned data if available, otherwise use local doctor object
        const approvedDoctor = response.data || { ...doctor, isApproved: true };
        setApprovedDoctors(prev => [...prev, approvedDoctor]);
        
        toast({
          title: "Success",
          description: `${doctor.fullName} has been approved successfully`,
        });
      } else {
        console.error('Unexpected response structure:', response);
        toast({
          title: "Error",
          description: response.message || "Failed to approve doctor",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to approve doctor",
        variant: "destructive",
      });
      console.error("Error approving doctor:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedDoctor || !actionType) return;
    
    // Only require remarks for rejection
    if (actionType === "reject" && !remarks.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a rejection reason",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsActionLoading(true);
      
      if (actionType === "reject") {
        const response = await adminApi.rejectDoctor(selectedDoctor.id, remarks.trim());
        
        if (response.success) {
          // Remove from pending
          setPendingDoctors(prev => prev.filter(d => d.id !== selectedDoctor.id));
          
          // Add to rejected
          setRejectedDoctors(prev => [
            ...prev,
            { ...selectedDoctor, isApproved: false, approvalRemark: remarks.trim() }
          ]);
          
          toast({
            title: "Success",
            description: `${selectedDoctor.fullName} has been rejected`,
          });
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to reject doctor",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
        variant: "destructive",
      });
      console.error("Error processing doctor action:", error);
    } finally {
      setIsActionLoading(false);
      setIsDialogOpen(false);
      setSelectedDoctor(null);
      setActionType(null);
      setRemarks("");
    }
  };

  const handleReject = (doctorId: string) => {
    const doctor = pendingDoctors.find(d => d.id === doctorId);
    if (doctor) {
      openActionDialog(doctor, "reject");
    }
  };

  const handleApprove = (doctor: Doctor) => {
    handleDirectApprove(doctor);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const getCurrentTabDoctors = (tab: string) => {
    switch(tab) {
      case 'pending': return pendingDoctors;
      case 'approved': return approvedDoctors;
      case 'rejected': return rejectedDoctors;
      default: return pendingDoctors;
    }
  };

  const filterDoctors = (doctors: Doctor[]) => {
    if (!searchQuery.trim()) return doctors;
    return doctors.filter(doctor => 
      doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.phoneNumber.includes(searchQuery)
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Enhanced Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200/50 dark:border-orange-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">Pending Review</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{pendingDoctors.length}</div>
            <p className="text-xs text-orange-700/70 dark:text-orange-300/70 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Approved</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{approvedDoctors.length}</div>
            <p className="text-xs text-green-700/70 dark:text-green-300/70 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Active professionals
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200/50 dark:border-red-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900 dark:text-red-100">Rejected</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
              <XCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-red-900 dark:text-red-100">{rejectedDoctors.length}</div>
            <p className="text-xs text-red-700/70 dark:text-red-300/70 mt-1 flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Declined applications
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Applications</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {pendingDoctors.length + approvedDoctors.length + rejectedDoctors.length}
            </div>
            <p className="text-xs text-blue-700/70 dark:text-blue-300/70 mt-1 flex items-center gap-1">
              <Users className="h-3 w-3" />
              All time submissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs Section */}
      <Tabs defaultValue="pending" className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11 bg-muted/50 p-1">
            <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white gap-2">
              <Clock className="h-4 w-4" />
              Pending
              <Badge variant="secondary" className="ml-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                {pendingDoctors.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-green-500 data-[state=active]:text-white gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Approved
              <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {approvedDoctors.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-red-500 data-[state=active]:text-white gap-2">
              <XCircle className="h-4 w-4" />
              Rejected
              <Badge variant="secondary" className="ml-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                {rejectedDoctors.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search doctors by name, reg. no, specialization..." 
              className="pl-9 h-11 bg-background border-border/60 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

          {/* Pending Doctor Applications Tab */}
          <TabsContent value="pending" className="space-y-4">
            {isLoading ? (
              <Card className="border-border/60 shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
                  <p className="text-muted-foreground font-medium">Loading pending applications...</p>
                </CardContent>
              </Card>
            ) : filterDoctors(pendingDoctors).length === 0 ? (
              <Card className="border-border/60 shadow-lg">
                <CardContent className="pt-6 text-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-orange-100 dark:bg-orange-950 rounded-full">
                      <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-lg">No Pending Applications</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                      {searchQuery ? "No results match your search criteria" : "All applications have been processed"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/60 shadow-lg">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-orange-50/50 dark:bg-orange-950/30">
                      <TableRow className="hover:bg-transparent border-b">
                        <TableHead className="w-[350px]">Doctor Details</TableHead>
                        <TableHead>Professional Info</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterDoctors(pendingDoctors).map((doctor) => (
                        <TableRow key={doctor.id} className="hover:bg-orange-50/30 dark:hover:bg-orange-950/20 group transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="h-12 w-12 border-2 border-orange-200 dark:border-orange-800">
                                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold">
                                    {getInitials(doctor.fullName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-orange-500 rounded-full ring-2 ring-background animate-pulse" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-sm">{doctor.fullName}</span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                  <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                                    {doctor.registrationNumber}
                                  </Badge>
                                  <span>{doctor.phoneNumber}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="h-3.5 w-3.5 text-blue-500" />
                                <span className="font-medium text-sm">{doctor.specialization}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Globe className="h-3 w-3" />
                                <span>{doctor.languages.join(', ')}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {doctor.address && (
                              <div className="flex items-center gap-1.5 text-sm">
                                <MapPin className="h-3.5 w-3.5 text-amber-500" />
                                <span>{doctor.address.city}, {doctor.address.state}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                              {doctor.experienceYears} years
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                onClick={() => handleApprove(doctor)}
                                disabled={isActionLoading}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                              >
                                {isActionLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                              </Button>
                              <Button
                                onClick={() => handleReject(doctor.id)}
                                disabled={isActionLoading}
                                size="sm"
                                variant="outline"
                                className="border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950 text-red-600"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Approved Doctors Tab */}
          <TabsContent value="approved" className="space-y-4">
            {filterDoctors(approvedDoctors).length === 0 ? (
              <Card className="border-border/60 shadow-lg">
                <CardContent className="pt-6 text-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-green-100 dark:bg-green-950 rounded-full">
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-lg">No Approved Doctors</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                      {searchQuery ? "No approved doctors match your search" : "No doctors have been approved yet"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/60 shadow-lg">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-green-50/50 dark:bg-green-950/30">
                      <TableRow className="hover:bg-transparent border-b">
                        <TableHead className="w-[350px]">Doctor Details</TableHead>
                        <TableHead>Professional Info</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterDoctors(approvedDoctors).map((doctor) => (
                        <TableRow key={doctor.id} className="hover:bg-green-50/30 dark:hover:bg-green-950/20 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12 border-2 border-green-200 dark:border-green-800">
                                <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold">
                                  {getInitials(doctor.fullName)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-semibold text-sm">{doctor.fullName}</span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                  <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                                    {doctor.registrationNumber}
                                  </Badge>
                                  <span>{doctor.phoneNumber}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="h-3.5 w-3.5 text-blue-500" />
                                <span className="font-medium text-sm">{doctor.specialization}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Globe className="h-3 w-3" />
                                <span>{doctor.languages.join(', ')}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {doctor.address && (
                              <div className="flex items-center gap-1.5 text-sm">
                                <MapPin className="h-3.5 w-3.5 text-amber-500" />
                                <span>{doctor.address.city}, {doctor.address.state}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                              {doctor.experienceYears} years
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Rejected Doctors Tab */}
          <TabsContent value="rejected" className="space-y-4">
            {filterDoctors(rejectedDoctors).length === 0 ? (
              <Card className="border-border/60 shadow-lg">
                <CardContent className="pt-6 text-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-red-100 dark:bg-red-950 rounded-full">
                      <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="font-semibold text-lg">No Rejected Applications</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                      {searchQuery ? "No rejected doctors match your search" : "No applications have been rejected"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/60 shadow-lg">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-red-50/50 dark:bg-red-950/30">
                      <TableRow className="hover:bg-transparent border-b">
                        <TableHead className="w-[350px]">Doctor Details</TableHead>
                        <TableHead>Professional Info</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Rejection Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterDoctors(rejectedDoctors).map((doctor) => (
                        <TableRow key={doctor.id} className="hover:bg-red-50/30 dark:hover:bg-red-950/20 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12 border-2 border-red-200 dark:border-red-800">
                                <AvatarFallback className="bg-gradient-to-br from-red-400 to-pink-500 text-white font-bold">
                                  {getInitials(doctor.fullName)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-semibold text-sm">{doctor.fullName}</span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                  <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                                    {doctor.registrationNumber}
                                  </Badge>
                                  <span>{doctor.phoneNumber}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="h-3.5 w-3.5 text-blue-500" />
                                <span className="font-medium text-sm">{doctor.specialization}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Globe className="h-3 w-3" />
                                <span>{doctor.languages.join(', ')}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {doctor.address && (
                              <div className="flex items-center gap-1.5 text-sm">
                                <MapPin className="h-3.5 w-3.5 text-amber-500" />
                                <span>{doctor.address.city}, {doctor.address.state}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                              {doctor.experienceYears} years
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {doctor.approvalRemark ? (
                                <div className="p-2 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded text-xs text-red-700 dark:text-red-300">
                                  {doctor.approvalRemark}
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">No reason provided</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Doctor Approval Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                Reject Doctor Application
              </DialogTitle>
              <DialogDescription>
                Please provide a detailed reason for rejecting this application. This will be communicated to the applicant.
              </DialogDescription>
            </DialogHeader>
            
            {selectedDoctor && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-lg border border-red-200 dark:border-red-800">
                  <Avatar className="h-12 w-12 ring-2 ring-red-500">
                    <AvatarFallback className="bg-gradient-to-br from-red-400 to-pink-500 text-white font-bold">
                      {getInitials(selectedDoctor.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base">{selectedDoctor.fullName}</h4>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialization}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {selectedDoctor.registrationNumber}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="remarks" className="text-sm font-semibold">
                    Rejection Reason <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="remarks"
                    placeholder="e.g., Invalid registration certificate, incomplete documentation, verification mismatch..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={4}
                    className="border-red-300 focus:border-red-500 dark:border-red-700 resize-none"
                  />
                  {!remarks.trim() && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      {/* <AlertCircle className="h-3 w-3" /> */}
                      A rejection reason is mandatory
                    </p>
                  )}
                </div>
              </div>
            )}
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)} 
                disabled={isActionLoading}
                className="border-border"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmAction}
                disabled={!remarks.trim() || isActionLoading}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg"
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Confirm Rejection
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
