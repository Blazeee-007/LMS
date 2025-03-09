
import React from "react";
import { Header } from "@/components/Header";
import { FacultyApproval } from "@/components/FacultyApproval";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, CheckCheck, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FacultyDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
            <p className="text-gray-600">{user?.name} - {user?.department}</p>
          </div>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <FileText className="h-3 w-3 mr-1" />
                Require your review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <Users className="h-3 w-3 mr-1" />
                Across 4 courses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Leaves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <CheckCheck className="h-3 w-3 mr-1" />
                This semester
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Absences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                Across all courses
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leave-requests" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leave-requests">Leave Requests</TabsTrigger>
            <TabsTrigger value="attendance-overview">Attendance Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="leave-requests" className="mt-4">
            <FacultyApproval />
          </TabsContent>
          <TabsContent value="attendance-overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Class Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <p className="text-gray-500">Attendance overview feature coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FacultyDashboard;
