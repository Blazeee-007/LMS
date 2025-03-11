
// Import statements should be fixed to avoid conflicts with local declarations
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { UserWelcomeCard } from '@/components/UserWelcomeCard';
import { LeaveBalanceCard } from '@/components/LeaveBalanceCard';
import { MobileFooter } from '@/components/MobileFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, FileText, CheckCircle, 
  X, AlertCircle, BarChart3, User, 
  PlusCircle, Filter, ChevronDown, ChevronRight,
  Calendar as CalendarIcon, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { format, parseISO, isAfter, isBefore, isToday } from 'date-fns';
import { LeaveCalendarPreview } from '@/components/LeaveCalendarPreview';
import { useToast } from '@/components/ui/use-toast';
import { ApplicationForm } from '@/components/ApplicationForm';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// We're renaming the imported types to avoid conflicts
import { 
  StatusType as StatusTypeImport, 
  LeaveType as LeaveTypeImport 
} from '@/types/leave';

// Now define local aliases to use in this file
type LeaveStatusType = StatusTypeImport;
type LeaveCategory = LeaveTypeImport;

interface LeaveApplication {
  id: number;
  title: string;
  leaveType: LeaveCategory;
  fromDate: string;
  toDate: string;
  status: LeaveStatusType;
  reason: string;
  days: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setLeaveApplications([
        {
          id: 1,
          title: "Trip to Mountains",
          leaveType: "personal",
          fromDate: "2024-03-10",
          toDate: "2024-03-15",
          status: "approved",
          reason: "Personal Trip",
          days: 6,
        },
        {
          id: 2,
          title: "Medical Checkup",
          leaveType: "medical",
          fromDate: "2024-03-20",
          toDate: "2024-03-20",
          status: "pending",
          reason: "Routine checkup",
          days: 1,
        },
        {
          id: 3,
          title: "Conference in New York",
          leaveType: "academic",
          fromDate: "2024-04-01",
          toDate: "2024-04-05",
          status: "rejected",
          reason: "Attending React Conf",
          days: 5,
        },
        {
          id: 4,
          title: "Family Function",
          leaveType: "personal",
          fromDate: "2024-04-15",
          toDate: "2024-04-18",
          status: "under_review",
          reason: "Sister's wedding",
          days: 4,
        },
        {
          id: 5,
          title: "Required some rest",
          leaveType: "personal",
          fromDate: "2024-04-22",
          toDate: "2024-04-26",
          status: "needs_info",
          reason: "Feeling unwell",
          days: 5,
        },
        {
          id: 6,
          title: "Attending a workshop",
          leaveType: "academic",
          fromDate: "2024-05-01",
          toDate: "2024-05-03",
          status: "cancelled",
          reason: "Learning Next.js",
          days: 3,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const upcomingLeaves = leaveApplications.filter(leave => 
    isAfter(parseISO(leave.fromDate), new Date()) || isToday(parseISO(leave.fromDate))
  );

  const pastLeaves = leaveApplications.filter(leave => 
    isBefore(parseISO(leave.toDate), new Date())
  );

  const handleApplyLeave = () => {
    setIsApplying(true);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || null);
  };

  const getStatusBadgeColor = (status: LeaveStatusType) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      case "needs_info": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLeaveTypeColor = (type: LeaveCategory) => {
    switch (type) {
      case "medical": return "bg-red-100 text-red-800";
      case "personal": return "bg-blue-100 text-blue-800";
      case "academic": return "bg-purple-100 text-purple-800";
      case "emergency": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Fix the type here: explicitly type as LeaveCategory 
  const leaveBalances = [
    { type: "medical" as LeaveCategory, used: 3, total: 10, color: "bg-red-400" },
    { type: "personal" as LeaveCategory, used: 5, total: 7, color: "bg-blue-400" },
    { type: "academic" as LeaveCategory, used: 1, total: 5, color: "bg-purple-400" },
    { type: "emergency" as LeaveCategory, used: 0, total: 3, color: "bg-orange-400" },
  ];

  const pendingRequests = leaveApplications.filter(leave => 
    leave.status === "pending" || leave.status === "under_review"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-mobile-footer">
      <Header />
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <UserWelcomeCard 
              upcomingLeaveCount={upcomingLeaves.length} 
              pendingApprovalCount={pendingRequests} 
            />
            <LeaveBalanceCard balances={leaveBalances} />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Leave Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex flex-wrap justify-between items-center">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                      <TabsList>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button onClick={handleApplyLeave}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Apply Leave
                    </Button>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">
                  {activeTab === "upcoming" ? "Upcoming Leaves" : "Past Leaves"}
                  {isLoading && <Loader2 className="inline-block h-5 w-5 ml-2 animate-spin" />}
                </h2>

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                ) : activeTab === "upcoming" ? (
                  upcomingLeaves.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingLeaves.map((leave) => (
                        <div key={leave.id} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h2 className="text-lg font-bold">{leave.title}</h2>
                                <Badge className={getLeaveTypeColor(leave.leaveType)}>
                                  {leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <p>{format(parseISO(leave.fromDate), 'PPP')} - {format(parseISO(leave.toDate), 'PPP')}</p>
                              </div>
                              <p className="text-gray-700">{leave.reason}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge className={getStatusBadgeColor(leave.status)}>
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1).replace(/_/g, ' ')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                      <p className="text-gray-500">No upcoming leaves found.</p>
                    </div>
                  )
                ) : pastLeaves.length > 0 ? (
                  <div className="space-y-4">
                    {pastLeaves.map((leave) => (
                      <div key={leave.id} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h2 className="text-lg font-bold">{leave.title}</h2>
                              <Badge className={getLeaveTypeColor(leave.leaveType)}>
                                {leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <p>{format(parseISO(leave.fromDate), 'PPP')} - {format(parseISO(leave.toDate), 'PPP')}</p>
                            </div>
                            <p className="text-gray-700">{leave.reason}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusBadgeColor(leave.status)}>
                              {leave.status.charAt(0).toUpperCase() + leave.status.slice(1).replace(/_/g, ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-gray-500">No past leaves found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <LeaveCalendarPreview 
              leaves={leaveApplications.map(leave => ({
                id: leave.id,
                title: leave.title,
                fromDate: leave.fromDate,
                toDate: leave.toDate,
                leaveType: leave.leaveType,
                status: leave.status
              }))}
            />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors" onClick={() => navigate('/leave-balance')}>
                    <BarChart3 className="h-5 w-5 mb-1" />
                    <span className="text-sm">Leave Balance</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors" onClick={() => navigate('/profile')}>
                    <User className="h-5 w-5 mb-1" />
                    <span className="text-sm">Profile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <MobileFooter />

      <Dialog open={isApplying} onOpenChange={setIsApplying}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Leave Application Form</DialogTitle>
          </DialogHeader>
          <ApplicationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
