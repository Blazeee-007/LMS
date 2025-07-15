
import { Shield, UserRound, Lock, Phone, Users, BarChart3, ClipboardList, FileClock } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <UserRound className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Profile</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/leave-balance")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Leave Balance
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6">
            <Card className="shadow-lg border-t-4 border-t-primary">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Personal Information</CardTitle>
                </div>
                <CardDescription>Your personal details are securely stored and protected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-gray-900 font-medium">{user?.name}</p>
                    </div>
                    {user?.facultyId && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Faculty ID</label>
                        <p className="mt-1 text-gray-900 font-medium">{user.facultyId}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900 font-medium">{user?.email}</p>
                    </div>
                    {user?.department && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <p className="mt-1 text-gray-900 font-medium">{user.department}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <p className="text-gray-900 font-medium">+91 7989788852</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {user?.role === "faculty" && (
              <Card className="shadow-lg border-t-4 border-t-primary/80">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Emergency Contact Information</CardTitle>
                  </div>
                  <CardDescription>Emergency contact details for faculty</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Emergency Contact Name</label>
                        <p className="mt-1 text-gray-900 font-medium">Spouse/Family Member</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Emergency Contact Mobile</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-primary" />
                          <p className="text-gray-900 font-medium">+91 9908910423</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Relationship</label>
                        <p className="mt-1 text-gray-900 font-medium">Spouse</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Work Extension</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-primary" />
                          <p className="text-gray-900 font-medium">Ext: 245</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-lg border-t-4 border-t-primary/60">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto hover:bg-primary hover:text-white transition-colors"
                  >
                    Change Password
                  </Button>
                  <div className="text-sm text-gray-600">
                    Last password change: 30 days ago
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-t-4 border-t-primary/40">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  <CardTitle>Quick Links</CardTitle>
                </div>
                <CardDescription>Access important features quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate("/")}
                  >
                    <ClipboardList className="h-6 w-6 mb-2" />
                    <span>New Application</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate("/dashboard")}
                  >
                    <FileClock className="h-6 w-6 mb-2" />
                    <span>My Applications</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate("/leave-balance")}
                  >
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Leave Balance</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate("/calendar")}
                  >
                    <Shield className="h-6 w-6 mb-2" />
                    <span>Calendar View</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
