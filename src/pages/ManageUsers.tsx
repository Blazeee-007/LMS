import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Users, 
  UserCheck, 
  UserX, 
  Eye, 
  RefreshCw,
  Shield,
  Mail,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: "admin" | "faculty";
  department?: string;
  facultyId?: string;
  isConnected: boolean;
  lastActive: string;
  joinedDate: string;
  status: "active" | "inactive" | "suspended";
}

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "faculty">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "suspended">("all");

  // Mock user data - in real app, this would come from Supabase
  const users: UserInfo[] = [
    {
      id: "f1",
      name: "Dr. Mohan Kumar",
      email: "mohankumar@college.edu",
      role: "faculty",
      department: "Computer Science",
      facultyId: "FAC001",
      isConnected: true,
      lastActive: "2024-02-20T10:30:00Z",
      joinedDate: "2024-01-15T09:00:00Z",
      status: "active"
    },
    {
      id: "f2",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@college.edu",
      role: "faculty",
      department: "Mathematics",
      facultyId: "FAC002",
      isConnected: false,
      lastActive: "2024-02-15T14:20:00Z",
      joinedDate: "2024-01-10T09:00:00Z",
      status: "active"
    },
    {
      id: "f3",
      name: "Prof. Michael Chen",
      email: "michael.chen@college.edu",
      role: "faculty",
      department: "Physics",
      facultyId: "FAC003",
      isConnected: true,
      lastActive: "2024-02-19T16:45:00Z",
      joinedDate: "2024-01-08T09:00:00Z",
      status: "active"
    },
    {
      id: "a1",
      name: "Admin User",
      email: "admin@college.edu",
      role: "admin",
      isConnected: true,
      lastActive: "2024-02-20T11:00:00Z",
      joinedDate: "2024-01-01T09:00:00Z",
      status: "active"
    },
    {
      id: "f4",
      name: "Dr. Lisa Brown",
      email: "lisa.brown@college.edu",
      role: "faculty",
      department: "Chemistry",
      facultyId: "FAC004",
      isConnected: false,
      lastActive: "2024-02-10T09:30:00Z",
      joinedDate: "2024-01-20T09:00:00Z",
      status: "inactive"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.facultyId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    return role === "admin" ? (
      <Badge variant="default" className="bg-purple-100 text-purple-800">
        <Shield className="h-3 w-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="outline">Faculty</Badge>
    );
  };

  const getConnectionStatus = (isConnected: boolean) => {
    return isConnected ? (
      <div className="flex items-center gap-1 text-green-600">
        <UserCheck className="h-4 w-4" />
        <span className="text-sm">Connected</span>
      </div>
    ) : (
      <div className="flex items-center gap-1 text-red-600">
        <UserX className="h-4 w-4" />
        <span className="text-sm">Disconnected</span>
      </div>
    );
  };

  const connectedUsers = users.filter(user => user.isConnected).length;
  const totalUsers = users.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold">Manage Users</h1>
              <p className="text-gray-600">Monitor user connections and manage access</p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <UserCheck className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Connected</p>
                    <p className="text-2xl font-bold">{connectedUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <UserX className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Disconnected</p>
                    <p className="text-2xl font-bold">{totalUsers - connectedUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Admins</p>
                    <p className="text-2xl font-bold">{users.filter(u => u.role === "admin").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Monitor and manage user connections</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as typeof roleFilter)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users List */}
              <div className="space-y-4">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white p-6 rounded-lg border">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            {getRoleBadge(user.role)}
                            {getStatusBadge(user.status)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                          {user.department && (
                            <div className="text-sm text-gray-600">
                              Department: {user.department}
                              {user.facultyId && ` • ID: ${user.facultyId}`}
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Joined: {format(new Date(user.joinedDate), 'MMM dd, yyyy')}</span>
                            </div>
                            <span>Last active: {format(new Date(user.lastActive), 'MMM dd, yyyy HH:mm')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {getConnectionStatus(user.isConnected)}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No users found matching your filters.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;