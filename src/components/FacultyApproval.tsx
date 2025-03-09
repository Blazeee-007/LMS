
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
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
import { ApplicationStatus, type StatusType } from "@/components/ApplicationStatus";

type LeaveType = "medical" | "personal" | "academic" | "emergency";

interface LeaveRequest {
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

export const FacultyApproval = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentTab, setCurrentTab] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null);
  const [approvalComment, setApprovalComment] = useState("");

  // Mock data - in a real app, this would come from an API
  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "CS2021001",
      date: "2024-06-10",
      status: "pending",
      title: "Medical Leave Request",
      reason: "Fever and body pain",
      leaveType: "medical",
      fromDate: "2024-06-12",
      toDate: "2024-06-14",
      course: "Data Structures",
      branch: "Computer Science (CSE)",
      semester: "5-1"
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "CS2021002",
      date: "2024-06-09",
      status: "pending",
      title: "Family Function",
      reason: "Sister's wedding",
      leaveType: "personal",
      fromDate: "2024-06-15",
      toDate: "2024-06-18",
      course: "Database Management",
      branch: "Computer Science (CSE)",
      semester: "5-1"
    },
    {
      id: 3,
      studentName: "David Wilson",
      studentId: "CS2021003",
      date: "2024-06-08",
      status: "under_review",
      title: "Conference Participation",
      reason: "Selected to present paper at national level conference",
      leaveType: "academic",
      fromDate: "2024-06-20",
      toDate: "2024-06-22",
      course: "All Courses",
      branch: "Computer Science (CSE)",
      semester: "5-1"
    },
    {
      id: 4,
      studentName: "Sarah Johnson",
      studentId: "CS2021004",
      date: "2024-06-05",
      status: "approved",
      title: "Medical Emergency",
      reason: "Hospitalization due to accident",
      leaveType: "medical",
      fromDate: "2024-06-06",
      toDate: "2024-06-12",
      course: "All Courses",
      branch: "Computer Science (CSE)",
      semester: "5-1"
    }
  ];

  // Filter leave requests based on search term and filters
  const filteredRequests = leaveRequests.filter(req => {
    // Filter by search term
    const matchesSearch = 
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    
    // Filter by leave type
    const matchesType = typeFilter === "all" || req.leaveType === typeFilter;
    
    // Filter by tab
    const matchesTab = (
      (currentTab === "pending" && ["pending", "under_review", "needs_info"].includes(req.status)) ||
      (currentTab === "processed" && ["approved", "rejected"].includes(req.status)) ||
      (currentTab === "all")
    );
    
    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  const handleViewDetails = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };

  const handleApprovalAction = (request: LeaveRequest, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setApprovalComment("");
    setShowApprovalDialog(true);
  };

  const submitApprovalAction = () => {
    if (selectedRequest && approvalAction) {
      const actionText = approvalAction === "approve" ? "approved" : "rejected";
      toast({
        title: `Leave request ${actionText}`,
        description: `You have ${actionText} the leave request from ${selectedRequest.studentName}.`,
      });
      setShowApprovalDialog(false);
    }
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Leave Requests</h2>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <div className="flex items-center w-full md:w-64">
            <Input 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
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
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {filteredRequests.length > 0 ? (
                <div className="divide-y">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="p-4 md:p-6 hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{request.studentName}</h3>
                            <p className="text-sm text-gray-600">ID: {request.studentId}</p>
                            <Badge className={getLeaveTypeColor(request.leaveType)}>
                              {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}
                            </Badge>
                          </div>
                          <h4 className="font-medium">{request.title}</h4>
                          <p className="text-sm text-gray-600">Course: {request.course}</p>
                          <p className="text-sm text-gray-600">Duration: {request.fromDate} to {request.toDate}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <ApplicationStatus status={request.status} />
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(request)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            {["pending", "under_review", "needs_info"].includes(request.status) && (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleApprovalAction(request, "approve")}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleApprovalAction(request, "reject")}
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
                  <p className="text-gray-500">No pending leave requests found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processed" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {filteredRequests.length > 0 ? (
                <div className="divide-y">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="p-4 md:p-6 hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{request.studentName}</h3>
                            <p className="text-sm text-gray-600">ID: {request.studentId}</p>
                            <Badge className={getLeaveTypeColor(request.leaveType)}>
                              {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}
                            </Badge>
                          </div>
                          <h4 className="font-medium">{request.title}</h4>
                          <p className="text-sm text-gray-600">Course: {request.course}</p>
                          <p className="text-sm text-gray-600">Duration: {request.fromDate} to {request.toDate}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <ApplicationStatus status={request.status} />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(request)}
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
                  <p className="text-gray-500">No processed leave requests found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {filteredRequests.length > 0 ? (
                <div className="divide-y">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="p-4 md:p-6 hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{request.studentName}</h3>
                            <p className="text-sm text-gray-600">ID: {request.studentId}</p>
                            <Badge className={getLeaveTypeColor(request.leaveType)}>
                              {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}
                            </Badge>
                          </div>
                          <h4 className="font-medium">{request.title}</h4>
                          <p className="text-sm text-gray-600">Course: {request.course}</p>
                          <p className="text-sm text-gray-600">Duration: {request.fromDate} to {request.toDate}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <ApplicationStatus status={request.status} />
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(request)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            {["pending", "under_review", "needs_info"].includes(request.status) && (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleApprovalAction(request, "approve")}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleApprovalAction(request, "reject")}
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
                  <p className="text-gray-500">No leave requests found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Leave Request Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Leave Request Details
                  <Badge className={getLeaveTypeColor(selectedRequest.leaveType)}>
                    {selectedRequest.leaveType.charAt(0).toUpperCase() + selectedRequest.leaveType.slice(1)}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Request Date: {selectedRequest.date}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Student</h3>
                    <p className="text-gray-700">{selectedRequest.studentName} ({selectedRequest.studentId})</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <ApplicationStatus status={selectedRequest.status} />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Title</h3>
                  <p className="text-gray-700">{selectedRequest.title}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Reason</h3>
                  <p className="text-gray-700">{selectedRequest.reason}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold">From Date</h3>
                    <p className="text-gray-700">{selectedRequest.fromDate}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">To Date</h3>
                    <p className="text-gray-700">{selectedRequest.toDate}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Duration</h3>
                    <p className="text-gray-700">
                      {Math.ceil((new Date(selectedRequest.toDate).getTime() - new Date(selectedRequest.fromDate).getTime()) / (1000 * 60 * 60 * 24) + 1)} days
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Course</h3>
                  <p className="text-gray-700">{selectedRequest.course}</p>
                </div>
                
                {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Attachments</h3>
                    <ul className="list-disc pl-5">
                      {selectedRequest.attachments.map((attachment, index) => (
                        <li key={index} className="text-blue-600 underline cursor-pointer">
                          {attachment}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {["pending", "under_review", "needs_info"].includes(selectedRequest.status) && (
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setShowDetailsDialog(false);
                        handleApprovalAction(selectedRequest, "reject");
                      }}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        setShowDetailsDialog(false);
                        handleApprovalAction(selectedRequest, "approve");
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
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {approvalAction === "approve" ? "Approve Leave Request" : "Reject Leave Request"}
                </DialogTitle>
                <DialogDescription>
                  {approvalAction === "approve" ? "Confirm approval of leave request" : "Provide a reason for rejection"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="comment">
                    {approvalAction === "approve" ? "Approval Comment (Optional)" : "Reason for Rejection"}
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder={approvalAction === "approve" ? "Add any comments..." : "Provide reason for rejection..."}
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
                  variant={approvalAction === "approve" ? "default" : "destructive"}
                  onClick={submitApprovalAction}
                  disabled={approvalAction === "reject" && !approvalComment.trim()}
                >
                  {approvalAction === "approve" ? "Approve" : "Reject"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
