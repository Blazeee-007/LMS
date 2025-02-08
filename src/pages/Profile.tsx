
import { Shield, UserRound, Lock, Phone, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <UserRound className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Profile</h1>
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
                      <p className="mt-1 text-gray-900 font-medium">John Doe</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Student ID</label>
                      <p className="mt-1 text-gray-900 font-medium">STU123456</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900 font-medium">john.doe@example.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Department</label>
                      <p className="mt-1 text-gray-900 font-medium">Computer Science</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <p className="text-gray-900 font-medium">+91 9876543210</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-t-4 border-t-primary/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Parent/Guardian Information</CardTitle>
                </div>
                <CardDescription>Parent or guardian contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Father's Name</label>
                      <p className="mt-1 text-gray-900 font-medium">Robert Doe</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Father's Mobile</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <p className="text-gray-900 font-medium">+91 9876543211</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Mother's Name</label>
                      <p className="mt-1 text-gray-900 font-medium">Sarah Doe</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Mother's Mobile</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <p className="text-gray-900 font-medium">+91 9876543212</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
