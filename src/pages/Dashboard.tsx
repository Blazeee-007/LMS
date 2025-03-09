import { Header } from "@/components/Header";
import { ApplicationStatus, ApplicationProgress } from "@/components/ApplicationStatus";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  X, Calendar, FileText, AlertCircle, Users, CalendarDays, 
  BarChart3, Search, Filter, Download, Printer, Eye,
  RefreshCw, ChevronDown, Check, CheckCheck, CheckCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { LeaveStatistics } from "@/components/LeaveStatistics";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeaveCalendarPreview } from "@/components/LeaveCalendarPreview";
import { format, isAfter, isBefore, isEqual, parseISO } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { UserWelcomeCard } from "@/components/UserWelcomeCard";
import { LeaveBalanceCard } from "@/components/LeaveBalanceCard";

type StatusType = "pending" | "approved" | "rejected" | "under_review" | "needs_info" | "cancelled";
type LeaveType = "medical" | "personal" | "academic" | "emergency";

interface Application {
  id: number;
  date: string;
  status: StatusType;
  title: string;
  reason: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  course: string;
  branch: string;
  semester: string;
  attachments?: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType | "all">("all");
  const [typeFilter, setTypeFilter] = useState<LeaveType | "all">("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("all");

  const userData = {
    name: "Sai Sasank Vanapalli",
    leaveBalances: [
      { type: "medical" as const, used: 3, total: 10, color: "bg-red-500" },
      { type: "personal" as const, used: 2, total: 5, color: "bg-blue-500" },
      { type: "academic" as const, used: 1, total: 7, color: "bg-purple-500" },
      { type: "emergency" as const, used: 0, total: 3, color: "bg-orange-500" }
    ]
  };

  const applications: Application[] = [
    {
      id: 1,
      date: "2024-02-20",
      status: "approved",
      title: "Three Days Leave",
      reason: "Family Emergency",
      leaveType: "emergency",
      fromDate: "2024-02-21",
      toDate: "2024-02-23",
      course: "B.Tech",
      branch: "Computer Science (CSE)",
      semester: "3 Year - 1 Semester"
    },
    {
      id: 2,
      date: "2024-02-15",
      status: "pending",
      title: "Medical Leave Request",
      reason: "Medical Leave",
      leaveType: "medical",
      fromDate: "2024-02-16",
      toDate: "2024-02-18",
      course: "Degree",
      branch: "BCA",
      semester: "2 Year - 2 Semester",
      attachments: ["medical_certificate.pdf"]
    },
    {
      id: 3,
      date: "2024-01-10",
      status: "rejected",
      title: "Academic Conference",
      reason: "Attending a research conference",
      leaveType: "academic",
      fromDate: "2024-01-15",
      toDate: "2024-01-18",
      course: "B.Tech",
      branch: "Computer Science & AI/ML (CSE-AIML)",
      semester: "4 Year - 1 Semester"
    },
    {
      id: 4,
      date: "2024-03-05",
      status: "under_review",
      title: "Hackathon Participation",
      reason: "Participating in national level hackathon",
      leaveType: "academic",
      fromDate: "2024-03-10",
      toDate: "2024-03-12",
      course: "B.Tech",
      branch: "Computer Science (CSE)",
      semester: "3 Year - 2 Semester",
      attachments: ["invitation_letter.pdf", "registration_confirmation.pdf"]
    },
    {
      id: 5,
      date: "2024-04-15",
      status: "needs_info",
      title: "Family Function",
      reason: "Sister's marriage ceremony",
      leaveType: "personal",
      fromDate: "2024-04-20",
      toDate: "2024-04-25",
      course: "B.Tech",
      branch: "Electronics & Communication (ECE)",
      semester: "2 Year - 2 Semester"
    },
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType = typeFilter === "all" || app.leaveType === typeFilter;
    
    let matchesDate = true;
    if (dateRange?.from && dateRange?.to) {
      const appStartDate = parseISO(app.fromDate);
      const appEndDate = parseISO(app.toDate);
      
      matchesDate = 
        (isEqual(appStartDate, dateRange.from) || isAfter(appStartDate, dateRange.from)) && 
        (isEqual(appEndDate, dateRange.to) || isBefore(appEndDate, dateRange.to));
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const tabFilteredApplications = activeTab === "all" 
    ? filteredApplications 
    : activeTab === "upcoming"
      ? filteredApplications.filter(app => 
          isAfter(parseISO(app.fromDate), new Date()) && 
          (app.status === "approved" || app.status === "pending"))
      : activeTab === "pending"
        ? filteredApplications.filter(app => 
            ["pending", "under_review", "needs_info"].includes(app.status))
        : activeTab === "past"
          ? filteredApplications.filter(app => 
              isBefore(parseISO(app.toDate), new Date()) && 
              (app.status === "approved" || app.status === "rejected"))
          : filteredApplications;

  const handleCancelApplication = (id: number) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Application Cancelled",
        description: "Your leave application has been cancelled successfully.",
      });
    }, 1000);
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsDialog(true);
  };

  const handleExportApplications = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Export Successful",
        description: "Leave applications exported as CSV file.",
      });
    }, 1000);
  };

  const handlePrintApplications = () => {
    window.print();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDateRange(undefined);
  };

  const totalLeaves = applications.length;
  const approvedLeaves = applications.filter(app => app.status === "approved").length;
  const pendingLeaves = applications.filter(app => ["pending", "under_review", "needs_info"].includes(app.status)).length;
  const rejectedLeaves = applications.filter(app => app.status === "rejected").length;

  const getLeaveTypeColor = (type: LeaveType) => {
    switch (type) {
      case "medical": return "bg-red-100 text-red-800";
      case "personal": return "bg-blue-100 text-blue-800";
      case "academic": return "bg-purple-100 text-purple-800";
      case "emergency": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const upcomingLeaves = applications
    .filter(app => 
      (app.status === "approved" || app.status === "pending") && 
      isAfter(parseISO(app.fromDate), new Date())
    )
    .sort((a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime());

  const upcomingLeave = upcomingLeaves.length > 0 ? upcomingLeaves[0] : null;

  const recentLeaves = applications
    .filter(app => {
      const appDate = new Date(app.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return appDate >= thirtyDaysAgo;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <UserWelcomeCard 
          upcomingLeaveCount={upcomingLeaves.length}
          pendingApprovalCount={pendingLeaves}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 space-y-6">
            <LeaveStatistics 
              total={totalLeaves} 
              approved={approvedLeaves} 
              pending={pendingLeaves} 
              rejected={rejectedLeaves} 
            />
            
            {upcomingLeave ? (
              <Card className="shadow-sm border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Your Next Leave
                  </CardTitle>
                  <CardDescription>
                    Starting {format(parseISO(upcomingLeave.fromDate), 'EEEE, MMMM dd, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{upcomingLeave.title}</h4>
                        <p className="text-gray-600">{upcomingLeave.reason}</p>
                      </div>
                      <ApplicationStatus status={upcomingLeave.status} />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        From {format(parseISO(upcomingLeave.fromDate), 'MMMM dd')} to {format(parseISO(upcomingLeave.toDate), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                    
                    {upcomingLeave.attachments && upcomingLeave.attachments.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <FileText className="h-4 w-4" />
                        <span>{upcomingLeave.attachments.length} attachment(s)</span>
                      </div>
                    )}
                    
                    <div className="pt-2 flex justify-end gap-2">
                      {["pending", "under_review", "needs_info"].includes(upcomingLeave.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelApplication(upcomingLeave.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(upcomingLeave)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <h3 className="text-lg font-medium">No Upcoming Leaves</h3>
                    <p className="text-gray-500 mb-4">You don't have any upcoming leave scheduled</p>
                    <Button onClick={() => navigate("/")}>Apply for Leave</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Leave Calendar</CardTitle>
                <CardDescription>View your approved leaves on the calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveCalendarPreview 
                  leaves={applications.filter(app => app.status === "approved")} 
                />
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => navigate("/calendar")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <LeaveBalanceCard balances={userData.leaveBalances} />
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Frequently used actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate("/")}
                  >
                    <span className="text-xl mb-1">+</span>
                    <span className="text-sm">New Leave</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate("/calendar")}
                  >
                    <Calendar className="h-5 w-5 mb-1" />
                    <span className="text-sm">Calendar</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate("/leave-balance")}
                  >
                    <BarChart3 className="h-5 w-5 mb-1" />
                    <span className="text-sm">Leave Balance</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => {}}
                  >
                    <Users className="h-5 w-5 mb-1" />
                    <span className="text-sm">Faculty</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search your applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusType | "all")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="needs_info">Needs Info</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as LeaveType | "all")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DateRangePicker 
                  date={dateRange}
                  onChange={setDateRange}
                />
                <Button variant="ghost" size="icon" onClick={resetFilters}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex mt-2 sm:mt-0 gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportApplications}>
                      <Download className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePrintApplications}>
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Your Leave Applications
            {tabFilteredApplications.length > 0 && <span className="text-sm font-normal text-gray-500 ml-2">({tabFilteredApplications.length} applications)</span>}
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <RefreshCw className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : tabFilteredApplications.length > 0 ? (
            <div className="space-y-4">
              {tabFilteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold">{application.title}</h2>
                        <Badge className={getLeaveTypeColor(application.leaveType)}>
                          {application.leaveType.charAt(0).toUpperCase() + application.leaveType.slice(1)}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-700">{application.reason}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <p>{format(parseISO(application.fromDate), 'PPP')} to {format(parseISO(application.toDate), 'PPP')}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <p>Course: {application.course}</p>
                        <p>Branch: {application.branch}</p>
                        <p>Semester: {application.semester}</p>
                      </div>
                      
                      {application.attachments && application.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <FileText className="h-4 w-4" />
                          <span>{application.attachments.length} attachment(s)</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <ApplicationStatus status={application.status} />
                      <div className="flex gap-2">
                        {["pending", "under_review", "needs_info"].includes(application.status) && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelApplication(application.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <X className="h-4 w-4 mr-1" />
                            )}
                            Cancel
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(application)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <ApplicationProgress status={application.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500 mb-2">No leave applications found matching your filters.</p>
              <Button variant="outline" onClick={resetFilters} className="mr-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button onClick={() => navigate("/")}>Submit New Application</Button>
            </div>
          )}

          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="max-w-2xl">
              {selectedApplication && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedApplication.title}
                      <Badge className={getLeaveTypeColor(selectedApplication.leaveType)}>
                        {selectedApplication.leaveType.charAt(0).toUpperCase() + selectedApplication.leaveType.slice(1)}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      Application Date: {format(parseISO(selectedApplication.date), 'PPP')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Status</h3>
                        <ApplicationStatus status={selectedApplication.status} />
                      </div>
                      <div>
                        <h3 className="font-semibold">Date Range</h3>
                        <p className="text-gray-700">{format(parseISO(selectedApplication.fromDate), 'PPP')} to {format(parseISO(selectedApplication.toDate), 'PPP')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Reason</h3>
                      <p className="text-gray-700">{selectedApplication.reason}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-semibold">Course</h3>
                        <p className="text-gray-700">{selectedApplication.course}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Branch</h3>
                        <p className="text-gray-700">{selectedApplication.branch}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Semester</h3>
                        <p className="text-gray-700">{selectedApplication.semester}</p>
                      </div>
                    </div>
                    
                    {selectedApplication.attachments && selectedApplication.attachments.length > 0 && (
                      <div>
                        <h3 className="font-semibold">Attachments</h3>
                        <ul className="list-disc pl-5">
                          {selectedApplication.attachments.map((attachment, index) => (
                            <li key={index} className="text-blue-600 underline cursor-pointer">
                              {attachment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {["pending", "under_review", "needs_info"].includes(selectedApplication.status) && (
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleCancelApplication(selectedApplication.id);
                            setShowDetailsDialog(false);
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <X className="h-4 w-4 mr-1" />
                          )}
                          Cancel Application
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
