"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Shield, 
  MoreHorizontal, 
  Search, 
  UserCog, 
  ShieldAlert, 
  Mail,
  Users,
  Activity,
  TrendingUp,
  Eye,
  Settings2,
  Lock,
  Unlock,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock sub-admin data
const mockSubAdmins = [
  { id: 1, name: "Alex Johnson", username: "alex_moderator", email: "alex@admin.com", role: "Content Moderator", status: "active", joinDate: "2025-12-15", permissions: ["manage_users", "moderate_content"] },
  { id: 2, name: "Maria Garcia", username: "maria_support", email: "maria@admin.com", role: "User Support", status: "active", joinDate: "2025-11-20", permissions: ["view_users", "handle_support"] },
  { id: 3, name: "James Wilson", username: "james_tech_admin", email: "james@admin.com", role: "Technical Admin", status: "inactive", joinDate: "2025-10-05", permissions: ["manage_system", "access_logs", "manage_content"] },
  { id: 4, name: "Sarah Connor", username: "sarah_security", email: "sarah@admin.com", role: "Security Officer", status: "active", joinDate: "2026-01-10", permissions: ["manage_content", "view_audit_logs"] },
];

type SubAdmin = { id: number; name: string; username: string; email: string; role: string; status: string; joinDate: string; permissions: string[] };

const ALL_PERMISSIONS = [
  { id: "manage_users", label: "Manage Users" },
  { id: "moderate_content", label: "Moderate Content" },
  { id: "view_users", label: "View Users" },
  { id: "handle_support", label: "Handle Support" },
  { id: "manage_system", label: "Manage System" },
  { id: "access_logs", label: "Access Logs" },
];

export default function SubAdminsPage() {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>(mockSubAdmins);
  const [newAdmin, setNewAdmin] = useState({ name: "", username: "", email: "", role: "", permissions: [] as string[] });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const generatedUsername = newAdmin.username || newAdmin.name.toLowerCase().replace(/\s+/g, '_') + '_admin';
    const newSubAdmin: SubAdmin = {
      id: Date.now(),
      ...newAdmin,
      username: generatedUsername,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
      permissions: newAdmin.permissions.length > 0 ? newAdmin.permissions : ["view_users"],
    };
    
    setSubAdmins([...subAdmins, newSubAdmin]);
    setNewAdmin({ name: "", username: "", email: "", role: "", permissions: [] });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "New sub-admin account created successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setSubAdmins(subAdmins.filter(a => a.id !== id));
    toast({
      title: "Deleted",
      description: "Sub-admin account removed.",
    });
  };

  const toggleStatus = (id: number) => {
    setSubAdmins(subAdmins.map(admin => 
      admin.id === id ? { ...admin, status: admin.status === "active" ? "inactive" : "active" } : admin
    ));
    toast({
      title: "Status Updated",
      description: "Sub-admin status has been changed.",
    });
  };

  const filteredAdmins = subAdmins.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Enhanced Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Administrators</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{subAdmins.length}</div>
            <p className="text-xs text-blue-700/70 dark:text-blue-300/70 mt-1 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              All team members
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Active Accounts</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              {subAdmins.filter(a => a.status === 'active').length}
            </div>
            <p className="text-xs text-green-700/70 dark:text-green-300/70 mt-1 flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100">High Privilege</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">
              {subAdmins.filter(a => a.role.toLowerCase().includes('security') || a.role.toLowerCase().includes('tech')).length}
            </div>
            <p className="text-xs text-amber-700/70 dark:text-amber-300/70 mt-1 flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Security roles
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Activity Rate</CardTitle>
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {subAdmins.length > 0 ? Math.round((subAdmins.filter(a => a.status === 'active').length / subAdmins.length) * 100) : 0}%
            </div>
            <p className="text-xs text-purple-700/70 dark:text-purple-300/70 mt-1 flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Engagement score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Header with Search */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Directory</h2>
          <p className="text-sm text-muted-foreground">Manage administrator accounts, roles, and permissions</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email, or role..." 
              className="pl-9 h-11 bg-background border-border/60 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg h-11"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Admin
          </Button>
        </div>
      </div>

      {/* Enhanced Table Card */}
      <Card className="border-border/60 shadow-lg">
        <CardContent className="p-0">
          <div className="rounded-md border-t border-border/60">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="w-[300px]">Admin Profile</TableHead>
                  <TableHead>Role & Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.length === 0 ? (
                  <TableRow>
                     <TableCell colSpan={5} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                          <UserCog className="h-10 w-10 opacity-40" />
                          <p className="font-medium">
                            {searchQuery ? "No team members match your search" : "No administrators found"}
                          </p>
                        </div>
                     </TableCell>
                  </TableRow>
                ) : filteredAdmins.map((admin) => (
                  <TableRow key={admin.id} className="hover:bg-muted/30 transition-colors border-b group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-11 w-11 border-2 border-border shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold text-sm">
                              {getInitials(admin.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background ${
                            admin.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{admin.name}</span>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <Mail className="h-3 w-3" />
                            <span>{admin.email}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Badge 
                          variant="outline" 
                          className="w-fit text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800"
                        >
                          {admin.role}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Shield className="h-3 w-3" />
                          <span>{admin.permissions.length} permission{admin.permissions.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`font-medium ${
                          admin.status === 'active' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {admin.status === 'active' ? (
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                            Inactive
                          </span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(admin.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Account Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-3.5 w-3.5" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-3.5 w-3.5" />
                            Edit Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(admin.id)} className="gap-2">
                            {admin.status === 'active' ? (
                              <>
                                <Lock className="h-3.5 w-3.5" />
                                Deactivate Account
                              </>
                            ) : (
                              <>
                                <Unlock className="h-3.5 w-3.5" />
                                Activate Account
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Settings2 className="h-3.5 w-3.5" />
                            View Audit Logs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 gap-2" 
                            onClick={() => handleDelete(admin.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Add Admin Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                <UserCog className="h-5 w-5 text-white" />
              </div>
              Create Administrator Account
            </DialogTitle>
            <DialogDescription>
              Add a new team member with specific roles and permissions. They'll receive credentials via email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="name" 
                placeholder="e.g., Sarah Connor" 
                value={newAdmin.name} 
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} 
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="sarah.connor@company.com" 
                value={newAdmin.email} 
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} 
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role" className="text-sm font-semibold">
                Role Assignment <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={newAdmin.role} 
                onValueChange={(val) => setNewAdmin({ ...newAdmin, role: val })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose a role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Content Moderator">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-blue-500" />
                      Content Moderator
                    </div>
                  </SelectItem>
                  <SelectItem value="User Support">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-green-500" />
                      User Support
                    </div>
                  </SelectItem>
                  <SelectItem value="Technical Admin">
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-3.5 w-3.5 text-purple-500" />
                      Technical Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="Security Officer">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                      Security Officer
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-semibold">Access Permissions</Label>
              <div className="grid grid-cols-2 gap-3 border rounded-lg p-4 max-h-[160px] overflow-y-auto bg-muted/20">
                {ALL_PERMISSIONS.map((perm) => (
                  <div key={perm.id} className="flex items-start space-x-2">
                    <Checkbox 
                      id={`perm-${perm.id}`} 
                      className="mt-0.5"
                      onCheckedChange={(checked) => {
                         if (checked) {
                            setNewAdmin({ ...newAdmin, permissions: [...newAdmin.permissions, perm.id] });
                         } else {
                            setNewAdmin({ ...newAdmin, permissions: newAdmin.permissions.filter(p => p !== perm.id) });
                         }
                      }}
                    />
                    <label
                      htmlFor={`perm-${perm.id}`}
                      className="text-sm font-medium leading-tight cursor-pointer select-none"
                    >
                      {perm.label}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Select permissions carefully based on role requirements
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
              Cancel
            </Button>
            <Button 
              onClick={handleAddAdmin}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              <UserCog className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
