
import { useState } from "react";
import { Header } from "@/components/Header";
import { LeaveBalanceCard } from "@/components/LeaveBalanceCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, History, BarChart3 } from "lucide-react";

// Mock data for leave balances
const studentLeaveBalances = [
  { type: "medical", used: 2, total: 10, color: "bg-blue-500" },
  { type: "personal", used: 3, total: 5, color: "bg-green-500" },
  { type: "academic", used: 1, total: 3, color: "bg-purple-500" },
  { type: "emergency", used: 0, total: 2, color: "bg-red-500" }
];

// Mock history data
const leaveHistory = [
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
  }
];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
        
        <Tabs defaultValue="balance" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="balance" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Balance
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              History
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
                    <a 
                      href="/application" 
                      className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm text-center hover:bg-primary/90 transition-colors"
                    >
                      Start Application
                    </a>
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
                          <td className={`py-3 px-4 font-medium ${getStatusColor(leave.status)}`}>
                            {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="animate-fadeIn">
            <Card>
              <CardHeader>
                <CardTitle>Leave Calendar</CardTitle>
                <CardDescription>Visualize your leave applications on a calendar</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500">Calendar view coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LeaveBalance;
