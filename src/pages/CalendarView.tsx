
import { Header } from "@/components/Header";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Calendar, CalendarDays, Filter, Users } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const CalendarView = () => {
  const [viewMode, setViewMode] = useState<string>("calendar");
  const [periodFilter, setPeriodFilter] = useState<string>("month");
  const navigate = useNavigate();

  // Mock data for leave conflicts
  const upcomingConflicts = [
    {
      id: 1,
      date: "May 25, 2024",
      event: "Mid-term Examination",
      affectedFaculty: 5,
    },
    {
      id: 2,
      date: "Jun 10, 2024",
      event: "Project Presentation",
      affectedFaculty: 3,
    },
  ];

  // Mock data for department statistics
  const departmentStats = [
    { name: "Computer Science", onLeave: 12, total: 120, percentage: 10 },
    { name: "Electrical Engineering", onLeave: 8, total: 110, percentage: 7.3 },
    { name: "Mechanical Engineering", onLeave: 5, total: 100, percentage: 5 },
    { name: "Civil Engineering", onLeave: 3, total: 90, percentage: 3.3 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Academic Calendar</h1>
            <p className="text-gray-600">View academic events and leave requests</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              <Users className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant="default"
              onClick={() => navigate("/")}
            >
              New Application
            </Button>
          </div>
        </div>

        <Tabs defaultValue="calendar" className="mb-8">
          <div className="flex justify-between items-center">
            <TabsList className="w-auto">
              <TabsTrigger value="calendar" onClick={() => setViewMode("calendar")}>
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </TabsTrigger>
              <TabsTrigger value="conflicts" onClick={() => setViewMode("conflicts")}>
                <AlertCircle className="h-4 w-4 mr-2" />
                Leave Conflicts
              </TabsTrigger>
              <TabsTrigger value="statistics" onClick={() => setViewMode("statistics")}>
                <Users className="h-4 w-4 mr-2" />
                Department Statistics
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Select 
                value={periodFilter} 
                onValueChange={setPeriodFilter}
              >
                <SelectTrigger className="w-36">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="semester">Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="calendar" className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Faculty Leave Calendar</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Academic calendar integration for faculty leave management will be available soon.
          </p>
        </div>
          </TabsContent>
          
          <TabsContent value="conflicts" className="mt-6">
            <div className="space-y-6">
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  There are {upcomingConflicts.length} upcoming events that conflict with current leave requests.
                </AlertDescription>
              </Alert>
              
              <div className="grid md:grid-cols-2 gap-4">
                {upcomingConflicts.map(conflict => (
                  <Card key={conflict.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <CalendarDays className="h-5 w-5 mr-2 text-red-500" />
                        {conflict.date}
                      </CardTitle>
                      <CardDescription>
                        Event: {conflict.event}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Affected Faculty:</span>
                          <span className="font-semibold">{conflict.affectedFaculty}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Faculty with approved leave during this event will need to be notified.
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View Faculty
                          </Button>
                          <Button variant="default" size="sm">
                            Send Notification
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Button variant="outline">
                  View All Conflicts
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="statistics" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Leave Statistics</CardTitle>
                  <CardDescription>
                    Current faculty leave distribution by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentStats.map((dept, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{dept.name}</span>
                          <span>{dept.onLeave} / {dept.total} faculty ({dept.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${dept.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Leave Types Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of leave requests by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      [Chart Placeholder]
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trend</CardTitle>
                    <CardDescription>
                      Leave requests over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      [Chart Placeholder]
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CalendarView;
