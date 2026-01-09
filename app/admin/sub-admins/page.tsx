"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Settings, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock sub-admin data
const mockSubAdmins = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@admin.com",
    role: "Content Moderator",
    status: "active",
    joinDate: "2025-12-15",
    permissions: ["manage_users", "moderate_content"],
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@admin.com",
    role: "User Support",
    status: "active",
    joinDate: "2025-11-20",
    permissions: ["view_users", "handle_support"],
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james@admin.com",
    role: "Technical Admin",
    status: "inactive",
    joinDate: "2025-10-05",
    permissions: ["manage_system", "access_logs"],
  },
];

type SubAdmin = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  permissions: string[];
};

export default function SubAdminsPage() {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>(mockSubAdmins);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<SubAdmin | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.role) {
      const newSubAdmin: SubAdmin = {
        id: Date.now(),
        ...newAdmin,
        status: "active",
        joinDate: new Date().toISOString().split('T')[0],
        permissions: ["view_users"],
      };
      setSubAdmins([...subAdmins, newSubAdmin]);
      setNewAdmin({ name: "", email: "", role: "" });
      setIsDialogOpen(false);
    }
  };

  const handleRemoveAdmin = (admin: SubAdmin) => {
    setAdminToDelete(admin);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (adminToDelete) {
      setSubAdmins(subAdmins.filter(admin => admin.id !== adminToDelete.id));
      setAdminToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  const toggleStatus = (id: number) => {
    setSubAdmins(subAdmins.map(admin => 
      admin.id === id 
        ? { ...admin, status: admin.status === "active" ? "inactive" : "active" }
        : admin
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Sub Administrators</h1>
                <p className="text-muted-foreground">Manage sub-admin accounts and permissions</p>
              </div>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Sub Administrator</DialogTitle>
                  <DialogDescription>
                    Create a new sub-admin account with specific permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                      placeholder="e.g., Content Moderator"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAdmin}>Add Sub Admin</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Sub Admins</CardDescription>
              <CardTitle className="text-3xl">{subAdmins.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {subAdmins.filter(admin => admin.status === "active").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Inactive</CardDescription>
              <CardTitle className="text-3xl text-red-600">
                {subAdmins.filter(admin => admin.status === "inactive").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Sub Admin List */}
        <div className="space-y-4">
          {subAdmins.map((admin) => (
            <Card key={admin.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Admin Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{admin.name}</h3>
                        <Badge variant={admin.status === "active" ? "default" : "secondary"}>
                          {admin.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{admin.email}</p>
                      <p className="text-sm mb-2">Role: {admin.role}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Joined: {admin.joinDate}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(admin.id)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      {admin.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAdmin(admin)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Sub Admin</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this sub-admin account? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            {adminToDelete && (
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-red-200 text-red-700">
                    {adminToDelete.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{adminToDelete.name}</h4>
                  <p className="text-sm text-muted-foreground">{adminToDelete.role}</p>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete Admin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}