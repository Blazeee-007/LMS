import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LeaveBalanceCard } from "@/components/LeaveBalanceCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, History, BarChart3, CalendarClock, BarChart, 
  CheckCircle, X, Clock, PieChart, Award, AlertTriangle,
  Calendar as CalendarIcon, RefreshCw, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

type LeaveBalanceType = {
  type: "medical" | "personal" | "academic" | "emergency";
  used: number;
  total: number;
  color: string;
};

const studentLeaveBalances: LeaveBalanceType[] = [
  { type: "medical", used: 2, total: 10, color: "bg-blue-500" },
  { type: "personal", used: 3, total: 5, color: "bg-green-500" },
  { type: "academic", used: 1, total: 3, color: "bg-purple-500" },
  { type: "emergency", used: 0, total: 2, color: "bg-red-500" }
];

type LeaveHistoryEntry = {
  id: string;
  type: "medical" | "personal" | "academic" | "emergency";
  startDate: string;
  endDate: string;
  status: "approved" | "rejected" | "pending";
  reason: string;
};

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

const leaveStats = {
  totalUsed: 6,
  totalAvailable: 14,
  approvalRate: 80,
  mostUsedType: "personal"
};

const monthlyLeaveData = [
  { name: 'Jan', value: 1 },
  { name: 'Feb', value: 2 },
  { name: 'Mar', value: 0 },
  { name: 'Apr', value: 3 },
  { name: 'May', value: 0 },
  { name: 'Jun', value: 0 },
  { name: 'Jul', value: 0 },
  { name: 'Aug', value: 0 },
  { name: 'Sep', value: 0 },
  { name: 'Oct', value: 0 },
  { name: 'Nov', value: 0 },
  { name: 'Dec', value: 0 }
];

const LeaveBalance = () => {
  const [activeTab, setActiveTab] = useState("balance");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      default: return "text-gray-500";
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
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case "medical": return "bg-blue-100 text-blue-800";
      case "personal": return "bg-green-100 text-green-800";
      case "academic": return "bg-purple-100 text-purple-800";
      case "emergency": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleCancel = (id: string) => {
    toast({
      title: "Leave application cancelled",
      description: `Leave application ${id} has been cancelled.`,
    });
  };
  
  const handleReschedule = (id: string) => {
    toast({
      title: "Reschedule requested",
      description: `Reschedule request for leave application ${id} has been sent.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-mobile-footer">
      <Header />
      
      <main className="container mx-auto py-8 px-4 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">Leave Management</h1>
          <Link 
            to="/application" 
            className="mt-2 md:mt-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors rounded-md px-4 py-2 text-sm inline-flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Apply for Leave
          </Link>
        </div>
        
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
          
          <TabsContent value="balance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <LeaveBalanceCard balances={studentLeaveBalances} />
              </div>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Apply for Leave</CardTitle>
                  <CardDescription>Submit a new leave application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <p className="text-sm text-gray-500">
                      Need time off? Submit a new leave request using our application form.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link 
                    to="/application" 
                    className="w-full bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm text-center hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Start Application
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Leave Policy Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full h-fit">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Apply in Advance</h3>
                      <p className="text-sm text-gray-500">Applications should be submitted at least 3 working days in advance except for emergency leaves.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full h-fit">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Documentation</h3>
                      <p className="text-sm text-gray-500">Medical and academic leaves require supporting documentation to be approved.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full h-fit">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Cancellation</h3>
                      <p className="text-sm text-gray-500">Approved leaves can be cancelled up to 24 hours before the start date.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="animate-fadeIn">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Leave History
                </CardTitle>
                <CardDescription>View your past leave applications and their statuses</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                  </div>
                ) : (
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
                          <tr key={leave.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4">{leave.id}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(leave.type)}`}>
                                {getTypeLabel(leave.type)}
                              </span>
                            </td>
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
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <div className="text-sm text-gray-500">
                  Page 1 of 1
                </div>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming" className="animate-fadeIn">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarClock className="h-5 w-5 mr-2" />
                  Upcoming Leaves
                </CardTitle>
                <CardDescription>View your approved and pending upcoming leaves</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                  </div>
                ) : upcomingLeaves.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingLeaves.map((leave) => (
                      <div key={leave.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-all hover:shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{getTypeLabel(leave.type)}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                leave.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {getStatusIcon(leave.status)}
                                <span className="ml-1">{leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}</span>
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md text-sm">
                          <p className="text-gray-600 font-medium mb-1">Reason:</p>
                          <p className="text-gray-800">{leave.reason}</p>
                        </div>
                        {leave.status === 'pending' && (
                          <div className="mt-3 flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleCancel(leave.id)}>
                              <X className="h-3 w-3 mr-1" /> Cancel
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleReschedule(leave.id)}>
                              <RefreshCw className="h-3 w-3 mr-1" /> Reschedule
                            </Button>
                          </div>
                        )}
                        {leave.status === 'approved' && (
                          <div className="mt-3 border-t pt-3">
                            <p className="text-xs text-gray-500">This leave has been approved. If you need to make changes, please contact the administration.</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex justify-center mt-6">
                      <Link 
                        to="/application" 
                        className="inline-flex items-center justify-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Apply for New Leave
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <CalendarClock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No upcoming leaves scheduled</h3>
                    <p className="text-gray-500 mb-4 max-w-md mx-auto">You don't have any upcoming leaves scheduled. Plan ahead by applying for a new leave.</p>
                    <Link 
                      to="/application" 
                      className="inline-block mt-2 bg-primary text-primary-foreground rounded-md px-6 py-2 text-sm hover:bg-primary/90 transition-colors"
                    >
                      Apply for Leave
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2" />
                    Leave Usage Statistics
                  </CardTitle>
                  <CardDescription>Overview of your leave usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-blue-600 mb-1">Total Used</p>
                          <p className="text-2xl font-bold text-blue-700">{leaveStats.totalUsed}</p>
                          <p className="text-xs text-blue-500">days</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-green-600 mb-1">Available</p>
                          <p className="text-2xl font-bold text-green-700">{leaveStats.totalAvailable}</p>
                          <p className="text-xs text-green-500">days</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-purple-600 mb-1">Approval Rate</p>
                          <p className="text-2xl font-bold text-purple-700">{leaveStats.approvalRate}%</p>
                          <p className="text-xs text-purple-500">success rate</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-2 font-medium">Usage by Type</p>
                        <div className="space-y-4">
                          {studentLeaveBalances.map((balance) => (
                            <div key={balance.type} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{getTypeLabel(balance.type)}</span>
                                <span>{balance.used} of {balance.total} days</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${balance.color} transition-all duration-1000 ease-in-out`} 
                                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-2 font-medium">Monthly Distribution</p>
                        <div className="h-32 flex items-end gap-1">
                          {monthlyLeaveData.map((month, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <div 
                                className={`w-full ${month.value > 0 ? 'bg-primary' : 'bg-gray-200'} rounded-sm transition-all duration-500 hover:opacity-80`} 
                                style={{ height: `${month.value > 0 ? (month.value * 20) + 20 : 4}px` }}
                              ></div>
                              <span className="text-xs mt-1 text-gray-500">{month.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Leave Insights
                  </CardTitle>
                  <CardDescription>Smart analytics about your leave patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-blue-50 hover:shadow-sm transition-shadow">
                        <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                          <PieChart className="h-4 w-4 mr-2" />
                          Most Used Leave Type
                        </h3>
                        <p className="text-sm text-blue-700">You've utilized <span className="font-semibold">{leaveStats.mostUsedType}</span> leave the most. Consider planning your future leaves accordingly.</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-green-50 hover:shadow-sm transition-shadow">
                        <h3 className="font-medium text-green-800 mb-2 flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Leaves By Status
                        </h3>
                        <div className="flex justify-between text-sm mt-4">
                          <div className="flex flex-col items-center">
                            <div className="h-24 w-16 bg-green-200 rounded-md flex items-end justify-center mb-2 overflow-hidden">
                              <div className="bg-green-500 w-10 rounded-t-md transition-all duration-1000 ease-out" style={{ height: '60%' }}></div>
                            </div>
                            <span className="text-green-800">Approved</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-24 w-16 bg-amber-200 rounded-md flex items-end justify-center mb-2 overflow-hidden">
                              <div className="bg-amber-500 w-10 rounded-t-md transition-all duration-1000 ease-out" style={{ height: '20%' }}></div>
                            </div>
                            <span className="text-amber-800">Pending</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-24 w-16 bg-red-200 rounded-md flex items-end justify-center mb-2 overflow-hidden">
                              <div className="bg-red-500 w-10 rounded-t-md transition-all duration-1000 ease-out" style={{ height: '20%' }}></div>
                            </div>
                            <span className="text-red-800">Rejected</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-purple-50 hover:shadow-sm transition-shadow">
                        <h3 className="font-medium text-purple-800 mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          Planning Recommendation
                        </h3>
                        <p className="text-sm text-purple-700 mb-2">You have <span className="font-semibold">{leaveStats.totalAvailable} days</span> of leave available. Consider planning your upcoming vacations and appointments.</p>
                        <Separator className="my-2" />
                        <div className="flex justify-center mt-3">
                          <Link 
                            to="/application" 
                            className="inline-flex items-center justify-center text-sm text-purple-700 hover:text-purple-900 transition-colors"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule a Leave
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="animate-fadeIn">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Leave Calendar
                </CardTitle>
                <CardDescription>Visualize your leave applications on a calendar</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <div className="w-full text-center space-y-4">
                  <div className="inline-block p-6 border-2 border-dashed rounded-lg bg-gray-50">
                    <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Calendar view coming soon</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">We're working on an interactive calendar to help you visualize and plan your leaves more effectively.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center border-t pt-4">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check Back Later
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LeaveBalance;
