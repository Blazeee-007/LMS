
import { Header } from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, ChevronDown, Search, Download, Calendar, 
  FileText, CheckCircle, X, Filter, Users, Clock, AlertCircle,
  Eye, BarChart3, Settings, Printer
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ApplicationStatus, ApprovalWorkflow } from "@/components/ApplicationStatus";
import { LeaveStatistics } from "@/components/LeaveStatistics";
import { StatusType } from "@/types/leave";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";

interface Application {
  id: number;
  date: string;
  status: StatusType;
  title: string;
  reason: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  course: string;
  branch: string;
  semester: string;
  attachments?: string[];
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType | "all">("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("all");

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
    
    return matchesSearch && matchesStatus;
  });

  const tabFilteredApplications = activeTab === "all" 
    ? filteredApplications 
    : filteredApplications.filter(app => app.status === activeTab);

  const handleApproveApplication = (id: number) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Application Approved",
        description: "The leave application has been approved successfully.",
      });
    }, 1000);
  };

  const handleRejectApplication = (id: number) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Application Rejected",
        description: "The leave application has been rejected.",
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
    setDateRange(undefined);
  };

  const totalLeaves = applications.length;
  const approvedLeaves = applications.filter(app => app.status === "approved").length;
  const pendingLeaves = applications.filter(app => app.status === "pending").length;
  const rejectedLeaves = applications.filter(app => app.status === "rejected").length;

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "medical": return "bg-red-100 text-red-800";
      case "personal": return "bg-blue-100 text-blue-800";
      case "academic": return "bg-purple-100 text-purple-800";
      case "emergency": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <LeaveStatistics 
              total={totalLeaves} 
              approved={approvedLeaves} 
              pending={pendingLeaves} 
              rejected={rejectedLeaves} 
            />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Application Management</CardTitle>
                <CardDescription>Review and manage leave applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search applications..."
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
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
                  Leave Applications
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
                              {application.status === "pending" && (
                                <>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleApproveApplication(application.id)}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? (
                                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                    ) : (
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                    )}
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRejectApplication(application.id)}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? (
                                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                    ) : (
                                      <X className="h-4 w-4 mr-1" />
                                    )}
                                    Reject
                                  </Button>
                                </>
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
                          <ApprovalWorkflow status={application.status} />
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
                          
                          {selectedApplication.status === "pending" && (
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                onClick={() => {
                                  handleApproveApplication(selectedApplication.id);
                                  setShowDetailsDialog(false);
                                }}
                                disabled={isLoading}
                                className="mr-2"
                              >
                                {isLoading ? (
                                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                )}
                                Approve Application
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  handleRejectApplication(selectedApplication.id);
                                  setShowDetailsDialog(false);
                                }}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <X className="h-4 w-4 mr-1" />
                                )}
                                Reject Application
                              </Button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
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
                    onClick={() => {}}
                  >
                    <Users className="h-5 w-5 mb-1" />
                    <span className="text-sm">Faculty</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col h-24 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => {}}
                  >
                    <Settings className="h-5 w-5 mb-1" />
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
