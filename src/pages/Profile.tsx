import { Shield, UserRound, Lock } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <UserRound className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Profile</h1>
          </div>
          
          <div className="grid gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Personal Information</CardTitle>
                </div>
                <CardDescription>Your personal details are securely stored and protected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
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
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full sm:w-auto">
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