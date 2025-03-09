
import React from "react";
import { Header } from "@/components/Header";
import { AttendanceTracker } from "@/components/AttendanceTracker";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const AttendanceView = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Attendance</h1>
            <p className="text-gray-600">Track your attendance and leave history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82.5%</div>
              <p className="text-xs text-muted-foreground">
                College requirement: 75%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Leave Days Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8 / 15</div>
              <p className="text-xs text-muted-foreground">
                Medical: 5, Personal: 3
              </p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                Attendance Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-md font-medium text-yellow-700">Computer Networks</div>
              <p className="text-xs text-muted-foreground">
                Currently at 68% (Required: 75%)
              </p>
            </CardContent>
          </Card>
        </div>

        <AttendanceTracker />
      </main>
    </div>
  );
};

export default AttendanceView;
