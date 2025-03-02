
import { useState } from "react";
import { Header } from "@/components/Header";
import { LeaveBalanceCard } from "@/components/LeaveBalanceCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, History, BarChart3, CalendarClock, BarChart, CheckCircle, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define the proper type for leave balances
type LeaveBalanceType = {
  type: "medical" | "personal" | "academic" | "emergency";
  used: number;
  total: number;
  color: string;
};

// Mock data for leave balances with proper typing
const studentLeaveBalances: LeaveBalanceType[] = [
  { type: "medical", used: 2, total: 10, color: "bg-blue-500" },
  { type: "personal", used: 3, total: 5, color: "bg-green-500" },
  { type: "academic", used: 1, total: 3, color: "bg-purple-500" },
  { type: "emergency", used: 0, total: 2, color: "bg-red-500" }
];

// Define type for leave history entries
type LeaveHistoryEntry = {
  id: string;
  type: "medical" | "personal" | "academic" | "emergency";
  startDate: string;
  endDate: string;
  status: "approved" | "rejected" | "pending";
  reason: string;
};

// Mock history data
const leaveHistory: LeaveHistoryEntry[] = [
  { 
    id: "LV-2023-001", 
    type: "medical", 
    startDate: "2023-08-15", 
    endDate: "2023-08-17", 
    status: "approved", 
    reason: "Medical appointment"
  },
  { 
    id: "LV-2023-002", 
    type: "personal", 
    startDate: "2023-09-05", 
    endDate: "2023-09-07", 
    status: "approved", 
    reason: "Family function"
  },
  { 
    id: "LV-2023-003", 
    type: "academic", 
    startDate: "2023-10-10", 
    endDate: "2023-10-10", 
    status: "approved", 
    reason: "Project presentation at another institute"
  },
  { 
    id: "LV-2024-001", 
    type: "personal", 
    startDate: "2024-01-20", 
    endDate: "2024-01-22", 
    status: "rejected", 
    reason: "Family vacation"
  },
  { 
    id: "LV-2024-002", 
    type: "emergency", 
    startDate: "2024-02-15", 
    endDate: "2024-02-16", 
    status: "approved", 
    reason: "Family emergency"
  },
  { 
    id: "LV-2024-003", 
    type: "medical", 
    startDate: "2024-04-05", 
    endDate: "2024-04-06", 
    status: "pending", 
    reason: "Medical procedure"
  }
];

// Phase 4 - Mock upcoming leave data
const upcomingLeaves: LeaveHistoryEntry[] = [
  { 
    id: "LV-2024-004", 
    type: "academic", 
    startDate: "2024-05-15", 
    endDate: "2024-05-17", 
    status: "approved", 
    reason: "Conference attendance"
  },
  { 
    id: "LV-2024-005", 
    type: "personal", 
    startDate: "2024-06-10", 
    endDate: "2024-06-12", 
    status: "pending", 
    reason: "Family event"
  }
];

// Phase 5 - Mock stats data
const leaveStats = {
  totalUsed: 6,
  totalAvailable: 14,
  approvalRate: 80,
  mostUsedType: "personal"
};

const LeaveBalance = () => {
  const [activeTab, setActiveTab] = useState("balance");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "approved": return "text-green-600";
      case "rejected": return "text-red-600";
      case "pending": return "text-amber-600";
      default: return "text-gray-600";
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch(type) {
      case "medical": return "Medical Leave";
      case "personal": return "Personal Leave";
      case "academic": return "Academic Leave";
      case "emergency": return "Emergency Leave";
      default: return type;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected": return <X className="h-4 w-4 text-red-600" />;
      case "pending": return <Clock className="h-4 w-4 text-amber-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
        
        <Tabs defaultValue="balance" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5 mb-8">
            <TabsTrigger value="balance" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Balance
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center">
              <CalendarClock className="h-4 w-4 mr-2" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="balance" className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <LeaveBalanceCard balances={studentLeaveBalances} />
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Apply for Leave</CardTitle>
                  <CardDescription>Submit a new leave application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <p className="text-sm text-gray-500">
                      Need time off? Submit a new leave request using our application form.
                    </p>
                    <Link 
                      to="/application" 
                      className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm text-center hover:bg-primary/90 transition-colors"
                    >
                      Start Application
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="animate-fadeIn">
            <Card>
              <CardHeader>
                <CardTitle>Leave History</CardTitle>
                <CardDescription>View your past leave applications and their statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Date Range</th>
                        <th className="text-left py-3 px-4 font-medium">Reason</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveHistory.map((leave) => (
                        <tr key={leave.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{leave.id}</td>
                          <td className="py-3 px-4">{getTypeLabel(leave.type)}</td>
                          <td className="py-3 px-4">
                            {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                          </td>
                          <td className="py-3 px-4">{leave.reason}</td>
                          <td className={`py-3 px-4 font-medium ${getStatusColor(leave.status)} flex items-center`}>
                            {getStatusIcon(leave.status)}
                            <span className="ml-1">{leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Phase 4 - Upcoming Tab */}
          <TabsContent value="upcoming" className="animate-fadeIn">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Leaves</CardTitle>
                <CardDescription>View your approved and pending upcoming leaves</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingLeaves.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingLeaves.map((leave) => (
                      <div key={leave.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{getTypeLabel(leave.type)}</h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                            </p>
                          </div>
                          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            leave.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {getStatusIcon(leave.status)}
                            <span className="ml-1">{leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}</span>
                          </div>
                        </div>
                        <p className="text-sm">{leave.reason}</p>
                        {leave.status === 'pending' && (
                          <div className="mt-3 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <X className="h-3 w-3 mr-1" /> Cancel
                            </Button>
                            <Button variant="outline" size="sm">
                              <CalendarClock className="h-3 w-3 mr-1" /> Reschedule
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming leaves scheduled</p>
                    <Link 
                      to="/application" 
                      className="inline-block mt-4 bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm hover:bg-primary/90 transition-colors"
                    >
                      Apply for Leave
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Phase 5 - Stats Tab */}
          <TabsContent value="stats" className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Usage Statistics</CardTitle>
                  <CardDescription>Overview of your leave usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Used</p>
                        <p className="text-2xl font-bold">{leaveStats.totalUsed} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Available</p>
                        <p className="text-2xl font-bold">{leaveStats.totalAvailable} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Approval Rate</p>
                        <p className="text-2xl font-bold">{leaveStats.approvalRate}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Usage by Type</p>
                      <div className="space-y-2">
                        {studentLeaveBalances.map((balance) => (
                          <div key={balance.type} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{getTypeLabel(balance.type)}</span>
                              <span>{balance.used} of {balance.total} days</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${balance.color}`} 
                                style={{ width: `${(balance.used / balance.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Leave Insights</CardTitle>
                  <CardDescription>Smart analytics about your leave patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <h3 className="font-medium text-blue-800 mb-2">Most Used Leave Type</h3>
                      <p className="text-sm">You've utilized {leaveStats.mostUsedType} leave the most. Consider planning your future leaves accordingly.</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h3 className="font-medium text-green-800 mb-2">Leaves By Status</h3>
                      <div className="flex justify-between text-sm">
                        <div className="flex flex-col items-center">
                          <div className="h-16 w-12 bg-green-200 rounded-md flex items-end justify-center mb-1">
                            <div className="bg-green-500 w-8 rounded-md" style={{ height: '60%' }}></div>
                          </div>
                          <span>Approved</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-16 w-12 bg-amber-200 rounded-md flex items-end justify-center mb-1">
                            <div className="bg-amber-500 w-8 rounded-md" style={{ height: '20%' }}></div>
                          </div>
                          <span>Pending</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-16 w-12 bg-red-200 rounded-md flex items-end justify-center mb-1">
                            <div className="bg-red-500 w-8 rounded-md" style={{ height: '20%' }}></div>
                          </div>
                          <span>Rejected</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-purple-50">
                      <h3 className="font-medium text-purple-800 mb-2">Planning Recommendation</h3>
                      <p className="text-sm">You have {leaveStats.totalAvailable} days of leave available. Consider planning your upcoming vacations and appointments.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="animate-fadeIn">
            <Card>
              <CardHeader>
                <CardTitle>Leave Calendar</CardTitle>
                <CardDescription>Visualize your leave applications on a calendar</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <div className="w-full text-center space-y-4">
                  <p className="text-gray-500">Calendar view coming soon</p>
                  <p className="text-sm text-gray-400">This feature will allow you to visualize your leaves on an interactive calendar view.</p>
                  <div className="inline-block p-2 border rounded bg-gray-50">
                    <Calendar className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LeaveBalance;
