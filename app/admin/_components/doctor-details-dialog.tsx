
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Building2,
    MapPin,
    GraduationCap,
    Calendar,
    Phone,
    Mail,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    History,
    ArrowUpRight
} from "lucide-react";
import { Doctor } from "@/lib/types";
import { format } from "date-fns";

interface DoctorDetailsDialogProps {
    doctor: Doctor | null;
    isOpen: boolean;
    onClose: () => void;
    onApprove: (doctor: Doctor) => void;
    onReject: (doctor: Doctor) => void;
}

export function DoctorDetailsDialog({
    doctor,
    isOpen,
    onClose,
    onApprove,
    onReject
}: DoctorDetailsDialogProps) {
    if (!doctor) return null;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
            case "rejected":
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pending</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "PP p");
        } catch {
            return "N/A";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <Avatar className="h-20 w-20 border-2 border-border">
                                <AvatarImage src={doctor.profilePhoto} alt={doctor.fullName} />
                                <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                                    {doctor.fullName.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <DialogTitle className="text-2xl font-bold">{doctor.fullName}</DialogTitle>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="font-medium text-foreground">{doctor.specialization}</span>
                                    <span>•</span>
                                    <span>{doctor.experienceYears} Years Exp.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{doctor.registrationNumber}</Badge>
                                    {getStatusBadge(doctor.status)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogDescription className="mt-2 text-base">
                        Detailed profile and verification information.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-6 p-6">
                        {/* Status Alert for Rejection/Approval */}
                        {doctor.status === 'rejected' && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3 text-red-800 dark:text-red-200">
                                <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-sm">Application Rejected</h4>
                                    <p className="text-sm mt-1">{doctor.rejectionRemarks}</p>
                                    <div className="text-xs text-red-600 dark:text-red-300 mt-2 flex gap-2">
                                        <span>By: {doctor.rejectedBy || 'Admin'}</span>
                                        <span>•</span>
                                        <span>{formatDate(doctor.rejectedAt || '')}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {doctor.status === 'approved' && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex gap-3 text-green-800 dark:text-green-200">
                                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-sm">Application Approved</h4>
                                    {doctor.approvalRemarks && <p className="text-sm mt-1">{doctor.approvalRemarks}</p>}
                                    <div className="text-xs text-green-600 dark:text-green-300 mt-2 flex gap-2">
                                        <span>By: {doctor.approvedBy || 'Admin'}</span>
                                        <span>•</span>
                                        <span>{formatDate(doctor.approvedAt || '')}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="flex flex-col h-full">
                                <h3 className="mb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Building2 className="h-4 w-4" /> Personal Details
                                </h3>
                                <div className="flex-1 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-0 flex flex-col">
                                    <div className="p-5 grid gap-y-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email Address</span>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md shrink-0">
                                                    <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <span className="text-sm font-medium break-all">{doctor.email}</span>
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-100 dark:bg-slate-800" />

                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone Number</span>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-md shrink-0">
                                                    <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <span className="text-sm font-medium">{doctor.phoneNumber}</span>
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-100 dark:bg-slate-800" />

                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Education</span>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-md shrink-0">
                                                    <GraduationCap className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <span className="text-sm font-medium">{doctor.qualification}</span>
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-100 dark:bg-slate-800" />

                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experience</span>
                                            <span className="text-sm font-medium pl-1">{doctor.experienceYears} Years</span>
                                        </div>

                                        <div className="h-px bg-slate-100 dark:bg-slate-800" />

                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Languages</span>
                                            <div className="flex flex-wrap gap-1">
                                                {doctor.languages.map(lang => (
                                                    <Badge key={lang} variant="secondary" className="text-xs font-normal border-slate-200 bg-slate-50 text-slate-600">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="flex flex-col h-full">
                                <h3 className="mb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <MapPin className="h-4 w-4" /> Clinic Location
                                </h3>
                                <div className="flex-1 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col relative group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <MapPin className="h-24 w-24" />
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col z-10">
                                        {doctor.address ? (
                                            <div className="h-full flex flex-col">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-base mb-1">{doctor.address.street}</h4>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        {doctor.address.city}, {doctor.address.state}
                                                    </p>

                                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                                                            <span className="text-xs text-muted-foreground block mb-1">Pincode</span>
                                                            <span className="text-sm font-semibold">{doctor.address.pincode}</span>
                                                        </div>
                                                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                                                            <span className="text-xs text-muted-foreground block mb-1">Country</span>
                                                            <span className="text-sm font-semibold">{doctor.address.country}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                                                <MapPin className="h-10 w-10 mb-3 opacity-20" />
                                                <p className="text-sm">No clinic address provided</p>
                                            </div>
                                        )}
                                    </div>

                                    {doctor.address && (
                                        <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 border-t border-slate-100 dark:border-slate-800 z-10 flex items-center justify-between">
                                            <span className="text-xs font-medium text-muted-foreground">Registered Clinic</span>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full" asChild>
                                                <a
                                                    href={`https://maps.google.com/?q=${encodeURIComponent(`${doctor.address.street}, ${doctor.address.city}, ${doctor.address.state}`)}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="View on Google Maps"
                                                >
                                                    <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                                                </a>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Verification Documents
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Aadhaar Card */}
                                <div className="group relative border rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
                                    <div className="aspect-[4/3] relative flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                                        {doctor.aadhaarCardImage ? (
                                            <img
                                                src={doctor.aadhaarCardImage}
                                                alt="Aadhaar Card"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FileText className="h-12 w-12 text-slate-300" />
                                        )}
                                        {doctor.aadhaarCardImage && (
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button size="sm" variant="secondary" onClick={() => window.open(doctor.aadhaarCardImage, '_blank')}>
                                                    View Document
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 border-t bg-white dark:bg-slate-900">
                                        <p className="font-medium text-sm">Aadhaar Card</p>
                                        <p className="text-xs text-muted-foreground">Identity Proof</p>
                                    </div>
                                </div>

                                {/* Other Documents */}
                                {doctor.verificationDocuments?.map((doc, index) => (
                                    <div key={index} className="group relative border rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
                                        <div className="aspect-[4/3] relative flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                                            <img
                                                src={doc}
                                                alt={`Document ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button size="sm" variant="secondary" onClick={() => window.open(doc, '_blank')}>
                                                    View Document
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-3 border-t bg-white dark:bg-slate-900">
                                            <p className="font-medium text-sm">Supporting Doc {index + 1}</p>
                                            <p className="text-xs text-muted-foreground">Additional Verification</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity/History */}
                        {(doctor.remarksHistory && doctor.remarksHistory.length > 0) && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <History className="h-4 w-4" /> Application History
                                </h3>
                                <div className="border rounded-xl bg-white dark:bg-slate-900 shadow-sm divide-y">
                                    {doctor.remarksHistory.map((history) => (
                                        <div key={history.id} className="p-4 flex gap-4">
                                            <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${history.action === 'approve' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <span className={`font-medium text-sm ${history.action === 'approve' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                                        {history.action === 'approve' ? 'Approved Application' : 'Rejected Application'}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">{formatDate(history.timestamp)}</span>
                                                </div>
                                                <p className="text-sm text-foreground/80">{history.remark}</p>
                                                <div className="text-xs text-muted-foreground pt-1">
                                                    Action performed by <span className="font-medium text-foreground">{history.by}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="shrink-0 p-4 border-t bg-muted/20 gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose} className="mr-auto">
                        Close
                    </Button>

                    {doctor.status === 'pending' && (
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button
                                variant="destructive"
                                className="flex-1 sm:flex-none"
                                onClick={() => onReject(doctor)}
                            >
                                <XCircle className="h-4 w-4 mr-2" /> Reject
                            </Button>
                            <Button
                                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                                onClick={() => onApprove(doctor)}
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
