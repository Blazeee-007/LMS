
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Check, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  name: string;
  code: string;
  totalClasses: number;
  attendedClasses: number;
  requiredAttendance: number;
}

interface AttendanceRecord {
  id: string;
  date: string;
  status: "present" | "absent" | "excused";
  course: string;
  timestamp: string;
}

export const AttendanceTracker = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in a real app, this would come from an API
  const courses: Course[] = [
    {
      id: "c1",
      name: "Data Structures and Algorithms",
      code: "CS301",
      totalClasses: 45,
      attendedClasses: 38,
      requiredAttendance: 75
    },
    {
      id: "c2",
      name: "Database Management Systems",
      code: "CS302",
      totalClasses: 42,
      attendedClasses: 30,
      requiredAttendance: 75
    },
    {
      id: "c3",
      name: "Operating Systems",
      code: "CS303",
      totalClasses: 40,
      attendedClasses: 36,
      requiredAttendance: 75
    },
    {
      id: "c4",
      name: "Computer Networks",
      code: "CS304",
      totalClasses: 38,
      attendedClasses: 25,
      requiredAttendance: 75
    }
  ];

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: "a1",
      date: "2024-06-10",
      status: "present",
      course: "Data Structures and Algorithms",
      timestamp: "10:30 AM"
    },
    {
      id: "a2",
      date: "2024-06-10",
      status: "present",
      course: "Database Management Systems",
      timestamp: "11:30 AM"
    },
    {
      id: "a3",
      date: "2024-06-09",
      status: "absent",
      course: "Computer Networks",
      timestamp: "3:30 PM"
    },
    {
      id: "a4",
      date: "2024-06-08",
      status: "present",
      course: "Operating Systems",
      timestamp: "9:30 AM"
    },
    {
      id: "a5",
      date: "2024-06-08",
      status: "excused",
      course: "Computer Networks",
      timestamp: "2:30 PM"
    }
  ];

  const calculateAttendancePercentage = (attended: number, total: number) => {
    return Math.round((attended / total) * 100);
  };

  const getAttendanceStatus = (course: Course) => {
    const percentage = calculateAttendancePercentage(course.attendedClasses, course.totalClasses);
    if (percentage < course.requiredAttendance) {
      return "danger";
    } else if (percentage < course.requiredAttendance + 10) {
      return "warning";
    } else {
      return "safe";
    }
  };

  const getStatusColor = (status: "present" | "absent" | "excused") => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  const requestExcusedAbsence = () => {
    toast({
      title: "Request Submitted",
      description: "Your request for excused absence has been submitted for approval.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Attendance Tracker</h2>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {courses.map((course) => {
            const percentage = calculateAttendancePercentage(course.attendedClasses, course.totalClasses);
            const status = getAttendanceStatus(course);
            
            return (
              <Card key={course.id} className={
                status === "danger" ? "border-red-200" : 
                status === "warning" ? "border-yellow-200" : ""
              }>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </div>
                    {status === "danger" && (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Attendance Alert
                      </Badge>
                    )}
                    {status === "warning" && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Approaching Limit
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance: {percentage}%</span>
                      <span>Required: {course.requiredAttendance}%</span>
                    </div>
                    <Progress
                      value={percentage}
                      className={
                        status === "danger" ? "bg-red-100" : 
                        status === "warning" ? "bg-yellow-100" : "bg-gray-100"
                      }
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>Classes Attended: {course.attendedClasses}/{course.totalClasses}</span>
                      <span>
                        {course.totalClasses - course.attendedClasses > 0 ? 
                          `Absences: ${course.totalClasses - course.attendedClasses}` : 
                          'No Absences'
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
                {status === "danger" && (
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" onClick={requestExcusedAbsence}>
                      Request Excused Absence
                    </Button>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Your recent attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.course}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status === "present" ? (
                            <><Check className="h-3 w-3 mr-1" /> Present</>
                          ) : record.status === "absent" ? (
                            <><X className="h-3 w-3 mr-1" /> Absent</>
                          ) : (
                            <><Clock className="h-3 w-3 mr-1" /> Excused</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Alerts</CardTitle>
              <CardDescription>Courses where your attendance is below the required limit</CardDescription>
            </CardHeader>
            <CardContent>
              {courses.filter(course => getAttendanceStatus(course) === "danger").length > 0 ? (
                <div className="space-y-4">
                  {courses
                    .filter(course => getAttendanceStatus(course) === "danger")
                    .map(course => {
                      const percentage = calculateAttendancePercentage(course.attendedClasses, course.totalClasses);
                      return (
                        <div key={course.id} className="p-4 rounded-md bg-red-50 border border-red-200">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{course.name} ({course.code})</h4>
                              <p className="text-sm text-red-700">
                                Current Attendance: {percentage}% (Required: {course.requiredAttendance}%)
                              </p>
                              <p className="text-sm mt-1">
                                You need to attend the next {Math.ceil((course.requiredAttendance / 100 * course.totalClasses) - course.attendedClasses)} classes to meet the minimum requirement.
                              </p>
                            </div>
                            <Button variant="secondary" size="sm" onClick={requestExcusedAbsence}>
                              Request Exemption
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Check className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <p className="text-gray-500">Great job! You don't have any attendance alerts at the moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
