// Import statements should be fixed to avoid conflicts with local declarations
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { UserWelcomeCard } from '@/components/UserWelcomeCard';
import { LeaveBalanceCard } from '@/components/LeaveBalanceCard';
import { MobileFooter } from '@/components/MobileFooter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeaveStatistics } from '@/components/LeaveStatistics';
import { 
  Calendar, Clock, FileText, CheckCircle, 
  X, AlertCircle, BarChart3, User, 
  PlusCircle, Filter, ChevronDown, ChevronRight,
  Calendar as CalendarIcon, Loader2, AlertTriangle,
  ChevronsUpDown, Eye, Search
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
import { format, parseISO, isAfter, isBefore, isToday, differenceInDays } from 'date-fns';
import { LeaveCalendarPreview } from '@/components/LeaveCalendarPreview';
import { useToast } from '@/hooks/use-toast';
import { ApplicationForm } from '@/components/ApplicationForm';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

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

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

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

  const filterLeavesBySearchTerm = (leaves: LeaveApplication[]) => {
    if (!searchTerm.trim()) return leaves;
    
    return leaves.filter(leave => 
      leave.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const upcomingLeaves = filterLeavesBySearchTerm(leaveApplications.filter(leave => 
    isAfter(parseISO(leave.fromDate), new Date()) || isToday(parseISO(leave.fromDate))
  ));

  const pastLeaves = filterLeavesBySearchTerm(leaveApplications.filter(leave => 
    isBefore(parseISO(leave.toDate), new Date())
  ));

  const pendingLeaves = leaveApplications.filter(leave => 
    leave.status === "pending" || leave.status === "under_review" || leave.status === "needs_info"
  ).length;

  const approvedLeaves = leaveApplications.filter(leave => 
    leave.status === "approved"
  ).length;

  const rejectedLeaves = leaveApplications.filter(leave => 
    leave.status === "rejected"
  ).length;

  const handleApplyLeave = () => {
    setIsApplying(true);
  };

  const handleViewDetails = (leave: LeaveApplication) => {
    setSelectedLeave(leave);
    setShowDetailsDialog(true);
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

  const getStatusIcon = (status: LeaveStatusType) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <X className="h-4 w-4 text-red-500" />;
      case "under_review": return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "needs_info": return <AlertTriangle className="h-4 w-4 text-purple-500" />;
      case "cancelled": return <X className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4" />;
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

  const getLeaveTypeIcon = (type: LeaveCategory) => {
    switch (type) {
      case "medical": return "🏥";
      case "personal": return "🏠";
      case "academic": return "🎓";
      case "emergency": return "🚨";
      default: return "📋";
    }
  };

  const calculateLeaveDuration = (fromDate: string, toDate: string) => {
    const start = parseISO(fromDate);
    const end = parseISO(toDate);
    const days = differenceInDays(end, start) + 1;
    
    if (days === 1) return "1 day";
    return `${days} days`;
  };

  // Add thresholds to display warnings earlier
  const leaveBalances = [
    { type: "medical" as LeaveCategory, used: 3, total: 10, color: "bg-red-400", warningThreshold: 70 },
    { type: "personal" as LeaveCategory, used: 5, total: 7, color: "bg-blue-400", warningThreshold: 75 },
    { type: "academic" as LeaveCategory, used: 1, total: 5, color: "bg-purple-400", warningThreshold: 80 },
    { type: "emergency" as LeaveCategory, used: 0, total: 3, color: "bg-orange-400", warningThreshold: 50 },
  ];

  const pendingRequests = leaveApplications.filter(leave => 
    leave.status === "pending" || leave.status === "under_review"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-mobile-footer">
      <Header />
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <UserWelcomeCard 
              upcomingLeaveCount={upcomingLeaves.length} 
              pendingApprovalCount={pendingRequests} 
            />
            
            <LeaveStatistics 
              total={leaveApplications.length}
              approved={approvedLeaves}
              pending={pendingLeaves}
              rejected={rejectedLeaves}
            />

            <LeaveBalanceCard 
              balances={leaveBalances} 
              warningThreshold={70}
              className="animate-fade-in"
            />

            <Card className="overflow-hidden border-t-4 border-t-primary shadow-md">
              <CardHeader className="pb-3 bg-gray-50 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <CardTitle className="text-lg">Leave Applications</CardTitle>
                  <Button 
                    onClick={handleApplyLeave}
                    className="bg-primary hover:bg-primary/90 transition-all shadow-sm"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Apply Leave
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                      <TabsList className="mb-2 sm:mb-0">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Search leaves..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-full sm:w-[200px] bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    {activeTab === "upcoming" ? "Upcoming Leaves" : "Past Leaves"}
                    {isLoading && <Loader2 className="inline-block h-5 w-5 ml-2 animate-spin" />}
                  </h2>

                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-md space-y-3">
                          <div className="flex justify-between">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                          <div className="flex gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-40" />
                          </div>
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      ))}
                    </div>
                  ) : activeTab === "upcoming" ? (
                    upcomingLeaves.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingLeaves.map((leave) => (
                          <div 
                            key={leave.id} 
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all space-y-4 animate-fade-in"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{getLeaveTypeIcon(leave.leaveType)}</span>
                                  <h2 className="text-lg font-bold">{leave.title}</h2>
                                  <Badge className={getLeaveTypeColor(leave.leaveType)}>
                                    {leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <Calendar className="h-4 w-4" />
                                  <p>
                                    {format(parseISO(leave.fromDate), 'PPP')} 
                                    {leave.fromDate !== leave.toDate && ` - ${format(parseISO(leave.toDate), 'PPP')}`}
                                  </p>
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                                    {calculateLeaveDuration(leave.fromDate, leave.toDate)}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{leave.reason}</p>
                              </div>
                              <div className="flex flex-col items-end gap-3">
                                <Badge className={`flex items-center gap-1 ${getStatusBadgeColor(leave.status)}`}>
                                  {getStatusIcon(leave.status)}
                                  <span>{leave.status.charAt(0).toUpperCase() + leave.status.slice(1).replace(/_/g, ' ')}</span>
                                </Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-primary hover:text-primary/90"
                                  onClick={() => handleViewDetails(leave)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                        <div className="flex flex-col items-center gap-2 py-8">
                          <Calendar className="h-12 w-12 text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400">No upcoming leaves found.</p>
                          <Button 
                            variant="outline" 
                            onClick={handleApplyLeave} 
                            className="mt-2"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Apply for Leave
                          </Button>
                        </div>
                      </div>
                    )
                  ) : pastLeaves.length > 0 ? (
                    <div className="space-y-4">
                      {pastLeaves.map((leave) => (
                        <div 
                          key={leave.id} 
                          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all space-y-4 animate-fade-in"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getLeaveTypeIcon(leave.leaveType)}</span>
                                <h2 className="text-lg font-bold">{leave.title}</h2>
                                <Badge className={getLeaveTypeColor(leave.leaveType)}>
                                  {leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Calendar className="h-4 w-4" />
                                <p>
                                  {format(parseISO(leave.fromDate), 'PPP')} 
                                  {leave.fromDate !== leave.toDate && ` - ${format(parseISO(leave.toDate), 'PPP')}`}
                                </p>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                                  {calculateLeaveDuration(leave.fromDate, leave.toDate)}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{leave.reason}</p>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                              <Badge className={`flex items-center gap-1 ${getStatusBadgeColor(leave.status)}`}>
                                {getStatusIcon(leave.status)}
                                <span>{leave.status.charAt(0).toUpperCase() + leave.status.slice(1).replace(/_/g, ' ')}</span>
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary hover:text-primary/90"
                                onClick={() => handleViewDetails(leave)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                      <div className="flex flex-col items-center gap-2 py-8">
                        <Calendar className="h-12 w-12 text-gray-400" />
                        <p className="text-gray-500 dark:text-gray-400">No past leaves found.</p>
                      </div>
                    </div>
                  )}
                </div>
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
            <Card className="border-t-4 border-t-primary/60 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Access frequently used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors" 
                    onClick={() => navigate('/leave-balance')}
                  >
                    <BarChart3 className="h-5 w-5 mb-1" />
                    <span className="text-sm">Leave Balance</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors" 
                    onClick={() => navigate('/profile')}
                  >
                    <User className="h-5 w-5 mb-1" />
                    <span className="text-sm">Profile</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors" 
                    onClick={() => navigate('/calendar')}
                  >
                    <Calendar className="h-5 w-5 mb-1" />
                    <span className="text-sm">Calendar</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors" 
                    onClick={() => navigate('/attendance')}
                  >
                    <CheckCircle className="h-5 w-5 mb-1" />
                    <span className="text-sm">Attendance</span>
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
            <DialogDescription>
              Fill in the details below to submit your leave request
            </DialogDescription>
          </DialogHeader>
          <ApplicationForm />
        </DialogContent>
      </Dialog>

      {selectedLeave && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedLeave.title}</DialogTitle>
              <DialogDescription>
                Leave Request Details
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge className={getLeaveTypeColor(selectedLeave.leaveType)}>
                  {selectedLeave.leaveType.charAt(0).toUpperCase() + selectedLeave.leaveType.slice(1)} Leave
                </Badge>
                <Badge className={getStatusBadgeColor(selectedLeave.status)}>
                  {getStatusIcon(selectedLeave.status)}
                  <span className="ml-1">
                    {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1).replace(/_/g, ' ')}
                  </span>
                </Badge>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">From Date</h3>
                    <p className="font-medium">{format(parseISO(selectedLeave.fromDate), 'PPP')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">To Date</h3>
                    <p className="font-medium">{format(parseISO(selectedLeave.toDate), 'PPP')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                  <p className="font-medium">{calculateLeaveDuration(selectedLeave.fromDate, selectedLeave.toDate)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reason for Leave</h3>
                  <p className="mt-1">{selectedLeave.reason}</p>
                </div>
                
                {selectedLeave.status === "rejected" && (
                  <div className="p-3 bg-red-50 text-red-800 rounded-md">
                    <h3 className="text-sm font-medium">Rejection Reason</h3>
                    <p className="text-sm mt-1">This leave was rejected due to insufficient information provided.</p>
                  </div>
                )}
                
                {(selectedLeave.status === "needs_info" || selectedLeave.status === "under_review") && (
                  <div className="p-3 bg-blue-50 text-blue-800 rounded-md">
                    <h3 className="text-sm font-medium">Additional Information Required</h3>
                    <p className="text-sm mt-1">Please contact your faculty advisor with supporting documents.</p>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="flex space-x-2 justify-end">
              {(selectedLeave.status === "pending" || selectedLeave.status === "under_review" || selectedLeave.status === "needs_info") && (
                <Button 
                  variant="destructive"
                  onClick={() => {
                    setShowDetailsDialog(false);
                    toast({
                      title: "Leave Request Cancelled",
                      description: "Your leave request has been cancelled successfully.",
                    });
                  }}
                >
                  Cancel Request
                </Button>
              )}
              <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
