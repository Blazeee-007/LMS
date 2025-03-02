
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Calendar, Check, FileText, Filter, Plus, Printer, RefreshCw, Search, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ApplicationStatus, ApprovalWorkflow, type StatusType } from "@/components/ApplicationStatus";
import { LeaveStatistics } from "@/components/LeaveStatistics";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type LeaveType = "medical" | "personal" | "academic" | "emergency";
type AdminRole = "faculty_advisor" | "hod" | "dean" | "principal";

interface Application {
  id: number;
  studentName: string;
  studentId: string;
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

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentTab, setCurrentTab] = useState("pending");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null);
  const [approvalComment, setApprovalComment] = useState("");
  
  // Mock user and applications data - in a real app this would come from an API
  const currentUser = {
    name: "Dr. Jane Smith",
    role: "faculty_advisor" as AdminRole,
    department: "Computer Science"
  };
  
  const applications: Application[] = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "CS2021001",
      date: "2024-05-20",
      status: "pending",
      title: "Medical Leave Request",
      reason: "Hospitalization due to fever",
      leaveType: "medical",
      fromDate: "2024-05-22",
      toDate: "2024-05-25",
      course: "B.Tech",
      branch: "Computer Science (CSE)",
      semester: "5-1"
    },
    {
      id: 2,
      studentName: "Alice Johnson",
      studentId: "ECE2022042",
      date: "2024-05-19",
      status: "needs_info",
      title: "Family Function",
      reason: "Sister's wedding ceremony",
      leaveType: "personal",
      fromDate: "2024-05-24",
      toDate: "2024-05-28",
      course: "B.Tech",
      branch: "Electronics & Communication (ECE)",
      semester: "3-2"
    },
    {
      id: 3,
      studentName: "Bob Smith",
      studentId: "ME2023015",
      date: "2024-05-18",
      status: "under_review",
      title: "Conference Attendance",
      reason: "Presenting paper at national conference",
      leaveType: "academic",
      fromDate: "2024-05-26",
      toDate: "2024-05-28",
      course: "B.Tech",
      branch: "Mechanical Engineering",
      semester: "7-1",
      attachments: ["conference_invitation.pdf", "paper_acceptance.pdf"]
    },
    {
      id: 4,
      studentName: "Eva Chen",
      studentId: "CS2022005",
      date: "2024-05-15",
      status: "approved",
      title: "Medical Emergency",
      reason: "Acute appendicitis surgery",
      leaveType: "medical",
      fromDate: "2024-05-16",
      toDate: "2024-05-20",
      course: "B.Tech",
      branch: "Computer Science (CSE)",
      semester: "3-2",
      attachments: ["medical_certificate.pdf"]
    },
    {
      id: 5,
      studentName: "Mike Wilson",
      studentId: "IT2021033",
      date: "2024-05-14",
      status: "rejected",
      title: "Family Trip",
      reason: "Family vacation",
      leaveType: "personal",
      fromDate: "2024-05-18",
      toDate: "2024-05-22",
      course: "B.Tech",
      branch: "Information Technology (IT)",
      semester: "5-2"
    },
  ];

  // Filter applications based on search term and filters
  const filteredApplications = applications.filter(app => {
    // Filter by search term
    const matchesSearch = 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    // Filter by leave type
    const matchesType = typeFilter === "all" || app.leaveType === typeFilter;
    
    // Filter by tab
    const matchesTab = (
      (currentTab === "pending" && ["pending", "under_review", "needs_info"].includes(app.status)) ||
      (currentTab === "processed" && ["approved", "rejected"].includes(app.status)) ||
      (currentTab === "all")
    );
    
    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsDialog(true);
  };

  const handleApprovalAction = (application: Application, action: "approve" | "reject") => {
    setSelectedApplication(application);
    setApprovalAction(action);
    setApprovalComment("");
    setShowApprovalDialog(true);
  };

  const submitApprovalAction = () => {
    if (selectedApplication && approvalAction) {
      const actionText = approvalAction === "approve" ? "approved" : "rejected";
      toast({
        title: `Application ${actionText}`,
        description: `You have ${actionText} the leave request from ${selectedApplication.studentName}.`,
      });
      setShowApprovalDialog(false);
    }
  };

  const handleReturn = (application: Application) => {
    setSelectedApplication(application);
    setApprovalAction(null);
    setApprovalComment("");
    setShowApprovalDialog(true);
  };

  const getLeaveTypeColor = (type: LeaveType) => {
    switch (type) {
      case "medical": return "bg-red-100 text-red-800";
      case "personal": return "bg-blue-100 text-blue-800";
      case "academic": return "bg-purple-100 text-purple-800";
      case "emergency": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Dashboard stats
  const pendingCount = applications.filter(app => ["pending", "under_review", "needs_info"].includes(app.status)).length;
  const approvedCount = applications.filter(app => app.status === "approved").length;
  const rejectedCount = applications.filter(app => app.status === "rejected").length;
  const totalCount = applications.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Role: {currentUser.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                Requiring your attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Absences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">
                Students on approved leave
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalCount ? Math.round((approvedCount / totalCount) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Of all requests approved
              </p>
            </CardContent>
          </Card>
        </div>

        <LeaveStatistics 
          total={totalCount} 
          approved={approvedCount} 
          pending={pendingCount} 
          rejected={rejectedCount} 
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8 mb-4">
          <h2 className="text-xl font-semibold">Leave Applications</h2>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="flex items-center w-full md:w-64">
              <Search className="h-4 w-4 absolute ml-2 text-gray-500" />
              <Input 
                placeholder="Search by name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-36">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="needs_info">Needs Info</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-36">
                  <Filter className="h-4 w-4 mr-2" />
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
          </div>
        </div>

        <Tabs defaultValue="pending" value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
            <TabsTrigger value="all">All Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {filteredApplications.length > 0 ? (
                  <div className="divide-y">
                    {filteredApplications.map((application) => (
                      <div key={application.id} className="p-4 md:p-6 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold">{application.studentName}</h3>
                              <p className="text-sm text-gray-600">ID: {application.studentId}</p>
                              <Badge className={getLeaveTypeColor(application.leaveType)}>
                                {application.leaveType.charAt(0).toUpperCase() + application.leaveType.slice(1)}
                              </Badge>
                            </div>
                            <h4 className="font-medium">{application.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <p>{application.fromDate} to {application.toDate}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                              <p>Course: {application.course}</p>
                              <p>Branch: {application.branch}</p>
                              <p>Semester: {application.semester}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <ApplicationStatus status={application.status} />
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(application)}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                              {["pending", "under_review", "needs_info"].includes(application.status) && (
                                <>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleApprovalAction(application, "approve")}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleApprovalAction(application, "reject")}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {["pending"].includes(application.status) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReturn(application)}
                                >
                                  Return for Info
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No applications found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="processed" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {/* Same structure as pending tab, but for processed applications */}
                {filteredApplications.length > 0 ? (
                  <div className="divide-y">
                    {filteredApplications.map((application) => (
                      <div key={application.id} className="p-4 md:p-6 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold">{application.studentName}</h3>
                              <p className="text-sm text-gray-600">ID: {application.studentId}</p>
                              <Badge className={getLeaveTypeColor(application.leaveType)}>
                                {application.leaveType.charAt(0).toUpperCase() + application.leaveType.slice(1)}
                              </Badge>
                            </div>
                            <h4 className="font-medium">{application.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <p>{application.fromDate} to {application.toDate}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <ApplicationStatus status={application.status} />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(application)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No processed applications found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {/* Same structure as other tabs, but for all applications */}
                {filteredApplications.length > 0 ? (
                  <div className="divide-y">
                    {filteredApplications.map((application) => (
                      <div key={application.id} className="p-4 md:p-6 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold">{application.studentName}</h3>
                              <p className="text-sm text-gray-600">ID: {application.studentId}</p>
                              <Badge className={getLeaveTypeColor(application.leaveType)}>
                                {application.leaveType.charAt(0).toUpperCase() + application.leaveType.slice(1)}
                              </Badge>
                            </div>
                            <h4 className="font-medium">{application.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <p>{application.fromDate} to {application.toDate}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <ApplicationStatus status={application.status} />
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(application)}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                              {["pending", "under_review", "needs_info"].includes(application.status) && (
                                <>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleApprovalAction(application, "approve")}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleApprovalAction(application, "reject")}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No applications found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Application Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl">
            {selectedApplication && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    Leave Application Details
                    <Badge className={getLeaveTypeColor(selectedApplication.leaveType)}>
                      {selectedApplication.leaveType.charAt(0).toUpperCase() + selectedApplication.leaveType.slice(1)}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    Application Date: {selectedApplication.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Student</h3>
                      <p className="text-gray-700">{selectedApplication.studentName} ({selectedApplication.studentId})</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Status</h3>
                      <ApplicationStatus status={selectedApplication.status} />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Title</h3>
                    <p className="text-gray-700">{selectedApplication.title}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Reason</h3>
                    <p className="text-gray-700">{selectedApplication.reason}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold">From Date</h3>
                      <p className="text-gray-700">{selectedApplication.fromDate}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">To Date</h3>
                      <p className="text-gray-700">{selectedApplication.toDate}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Duration</h3>
                      <p className="text-gray-700">
                        {Math.ceil((new Date(selectedApplication.toDate).getTime() - new Date(selectedApplication.fromDate).getTime()) / (1000 * 60 * 60 * 24) + 1)} days
                      </p>
                    </div>
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
                  
                  {/* Mock approval workflow */}
                  <ApprovalWorkflow 
                    status={selectedApplication.status}
                    approvers={[
                      { role: "faculty_advisor", name: "Dr. Jane Smith", status: "approved" },
                      { role: "hod", name: "Prof. Robert Johnson", status: selectedApplication.status === "approved" ? "approved" : selectedApplication.status === "rejected" ? "rejected" : "pending" },
                      { role: "dean", name: "Dr. Sara Williams", status: "pending" }
                    ]}
                    comments={[
                      { author: "Dr. Jane Smith", text: "Student has a good academic record. Recommended for approval.", date: "2024-05-21" }
                    ]}
                    dueDate="2024-05-23"
                  />
                  
                  {["pending", "under_review", "needs_info"].includes(selectedApplication.status) && (
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowDetailsDialog(false);
                          handleReturn(selectedApplication);
                        }}
                      >
                        Return for Info
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setShowDetailsDialog(false);
                          handleApprovalAction(selectedApplication, "reject");
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => {
                          setShowDetailsDialog(false);
                          handleApprovalAction(selectedApplication, "approve");
                        }}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Approval/Rejection Dialog */}
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent>
            {selectedApplication && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {approvalAction === "approve" ? "Approve Application" : 
                     approvalAction === "reject" ? "Reject Application" : 
                     "Request Additional Information"}
                  </DialogTitle>
                  <DialogDescription>
                    {approvalAction === "approve" ? "Confirm approval of leave application" : 
                     approvalAction === "reject" ? "Provide a reason for rejection" : 
                     "Specify what additional information is needed"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="comment">
                      {approvalAction === "approve" ? "Approval Comment (Optional)" : 
                       approvalAction === "reject" ? "Reason for Rejection" : 
                       "Information Required"}
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder={approvalAction === "approve" ? "Add any comments..." : 
                                  approvalAction === "reject" ? "Provide reason for rejection..." : 
                                  "Specify what additional information is needed..."}
                      value={approvalComment}
                      onChange={(e) => setApprovalComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant={approvalAction === "approve" ? "default" : 
                            approvalAction === "reject" ? "destructive" : 
                            "outline"}
                    onClick={submitApprovalAction}
                    disabled={approvalAction === "reject" && !approvalComment.trim()}
                  >
                    {approvalAction === "approve" ? "Approve" : 
                     approvalAction === "reject" ? "Reject" : 
                     "Send Request"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;
