"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  Loader2,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Users,
  Eye,
  ShieldCheck
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminApi, authApi } from "@/lib/api";
import { Doctor } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated, getCurrentUser } from "@/lib/auth-utils";
import { DoctorDetailsDialog } from "./_components/doctor-details-dialog";
import { format } from "date-fns";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("pending");
  const [doctors, setDoctors] = useState<{
    pending: Doctor[],
    approved: Doctor[],
    rejected: Doctor[]
  }>({ pending: [], approved: [], rejected: [] });

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null); // For details modal
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      // For demo, we might want to auto-login or redirect
      // Assuming mock-api handles simple login
      authApi.login({ username: "admin", password: "password" }).then(res => {
        if (res.success) fetchAllDoctors();
      });
    } else {
      fetchAllDoctors();
    }
  }, []);

  const fetchAllDoctors = async () => {
    try {
      setIsLoading(true);
      const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
        adminApi.getPendingDoctors(),
        adminApi.getApprovedDoctors(),
        adminApi.getRejectedDoctors()
      ]);

      setDoctors({
        pending: pendingRes.data || [],
        approved: approvedRes.data || [],
        rejected: rejectedRes.data || []
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch data. System is running in offline mode.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDoctors = (list: Doctor[]) => {
    if (!searchQuery) return list;
    const lowerQuery = searchQuery.toLowerCase();
    return list.filter(d =>
      d.fullName.toLowerCase().includes(lowerQuery) ||
      d.registrationNumber.toLowerCase().includes(lowerQuery) ||
      d.specialization.toLowerCase().includes(lowerQuery) ||
      d.phoneNumber.includes(lowerQuery)
    );
  };

  const handleActionClick = (doctor: Doctor, action: "approve" | "reject") => {
    setSelectedDoctor(doctor);
    setActionType(action);
    setRemarks("");
    setIsActionDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedDoctor || !actionType) return;
    
    // Validation: Remarks mandatory only for rejection
    if (actionType === 'reject' && !remarks.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a reason for rejecting the application.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsActionLoading(true);
      let response;
      
      if (actionType === "approve") {
        response = await adminApi.approveDoctor(selectedDoctor.id, remarks);
      } else {
        response = await adminApi.rejectDoctor(selectedDoctor.id, remarks);
      }

      if (response.success) {
        toast({
          title: "Success",
          description: `Doctor ${actionType}d successfully.`,
          variant: "default",
          className: actionType === 'approve' ? "bg-green-600 text-white" : "bg-red-600 text-white"
        });
        
        // Refresh Lists
        await fetchAllDoctors();
        
        // Close Dialogs
        setIsActionDialogOpen(false);
        setIsDetailsOpen(false); // Close details modal if open
        setSelectedDoctor(null);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Operation failed",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const openDetails = (doctor: Doctor) => {
    setViewDoctor(doctor);
    setIsDetailsOpen(true);
  };

  const totalDoctors = doctors.pending.length + doctors.approved.length + doctors.rejected.length;

  return (
    <div className="space-y-8 p-6 bg-slate-50/50 dark:bg-slate-950/20 min-h-screen">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage doctor verifications and system overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Logged in as:</span>
          <Badge variant="outline" className="gap-1 pl-1">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[10px] bg-slate-200">AD</AvatarFallback>
            </Avatar>
            {currentUser?.username || "Admin"}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Doctors"
          value={totalDoctors}
          icon={Users}
          trend="Total registered"
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Pending Queue"
          value={doctors.pending.length}
          icon={Clock}
          trend="Awaiting action"
          gradient="from-orange-400 to-pink-500"
        />
        <StatsCard
          title="Approved"
          value={doctors.approved.length}
          icon={CheckCircle2}
          trend="Active network"
          gradient="from-emerald-400 to-green-600"
        />
        <StatsCard
          title="Rejected"
          value={doctors.rejected.length}
          icon={XCircle}
          trend="Declined requests"
          gradient="from-red-500 to-red-700"
        />
      </div>

      {/* Main Content Areas */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="pending" className="gap-2">
                Pending <Badge className="bg-orange-500 hover:bg-orange-600">{doctors.pending.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved" className="gap-2">
                Approved <Badge variant="secondary">{doctors.approved.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="gap-2">
                Rejected <Badge variant="secondary">{doctors.rejected.length}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900">
          <CardHeader className="border-b bg-slate-50/40 px-6 py-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              {activeTab === 'pending' && <Clock className="h-5 w-5 text-orange-500" />}
              {activeTab === 'approved' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              {activeTab === 'rejected' && <XCircle className="h-5 w-5 text-red-500" />}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
                <p className="text-muted-foreground">Loading records...</p>
              </div>
            ) : (
              <DoctorTable
                data={filteredDoctors(doctors[activeTab as keyof typeof doctors])}
                type={activeTab}
                onView={openDetails}
                onApprove={(d: Doctor) => handleActionClick(d, 'approve')}
                onReject={(d: Doctor) => handleActionClick(d, 'reject')}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Doctor Details Modal */}
      <DoctorDetailsDialog
        doctor={viewDoctor}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onApprove={(d) => handleActionClick(d, 'approve')}
        onReject={(d) => handleActionClick(d, 'reject')}
      />

      {/* Action Confirmation Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className={`flex items-center gap-2 ${actionType === 'approve' ? 'text-green-600' : 'text-red-600'}`}>
              {actionType === 'approve' ? <ShieldCheck className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              {actionType === 'approve' ? 'Approve Doctor' : 'Reject Application'}
            </DialogTitle>
            <DialogDescription>
              Action for <span className="font-semibold text-foreground">{selectedDoctor?.fullName}</span>.
              <br />
              This action will be recorded in history.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
             <Label htmlFor="remarks">
               {actionType === 'approve' ? 'Approval Remarks (Optional)' : 'Rejection Reason'} 
               {actionType === 'reject' && <span className="text-red-500"> *</span>}
             </Label>
             <Textarea 
               id="remarks" 
               placeholder={actionType === 'approve' ? "Optional remarks..." : "State reason for rejection..."}
               value={remarks}
               onChange={(e) => setRemarks(e.target.value)}
               className="resize-none"
             />
          </div>

          <DialogFooter>
             <Button variant="outline" onClick={() => setIsActionDialogOpen(false)} disabled={isActionLoading}>Cancel</Button>
             <Button 
               onClick={handleConfirmAction} 
               disabled={isActionLoading || (actionType === 'reject' && !remarks.trim())}
               className={actionType === 'approve' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
             >
               {isActionLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
               Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

// Sub-Components

function StatsCard({ title, value, icon: Icon, trend, gradient }: any) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`p-2 rounded-full bg-muted/50`}>
            <Icon className="h-5 w-5 text-foreground/70" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> {trend}
        </p>
      </CardContent>
    </Card>
  );
}

function DoctorTable({ data, type, onView, onApprove, onReject }: any) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-slate-300" />
        </div>
        <p className="text-lg font-medium">No doctors found</p>
        <p className="text-sm">This list is currently empty.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
        <TableRow>
          <TableHead>Doctor</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Registration</TableHead>
          <TableHead>Applied Date</TableHead>
          {type !== 'pending' && <TableHead>Status</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((doctor: Doctor) => (
          <TableRow key={doctor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => onView(doctor)}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={doctor.profilePhoto} />
                  <AvatarFallback>{doctor.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{doctor.fullName}</p>
                  <p className="text-xs text-muted-foreground">{doctor.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{doctor.specialization}</span>
                <span className="text-xs text-muted-foreground">{doctor.experienceYears} Years Exp.</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="font-mono text-xs">{doctor.registrationNumber}</Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {format(new Date(doctor.createdAt), "dd MMM yyyy")}
            </TableCell>
            {type !== 'pending' && (
              <TableCell>
                <Badge className={type === 'approved' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>
                  {type === 'approved' ? 'Active' : 'Rejected'}
                </Badge>
              </TableCell>
            )}
            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                  onClick={() => onView(doctor)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {type === 'pending' && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:bg-green-50"
                      onClick={() => onApprove(doctor)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:bg-red-50"
                      onClick={() => onReject(doctor)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
