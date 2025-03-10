
import { useState, useEffect } from "react";
import { LeaveRequest, mockLeaveRequests } from "@/types/leave";
import { useToast } from "@/components/ui/use-toast";

interface UseFacultyLeavesProps {
  selectedCourse: string | null;
  selectedBranch: string | null;
}

export const useFacultyLeaves = ({ selectedCourse, selectedBranch }: UseFacultyLeavesProps) => {
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
  
  // In a real app, this would be an API call
  const leaveRequests = mockLeaveRequests;

  useEffect(() => {
    // Reset filters when a new course or branch is selected
    if (selectedCourse || selectedBranch) {
      setCurrentTab("pending");
    }
  }, [selectedCourse, selectedBranch]);

  // Filter leave requests based on search term, filters, and selected course/branch
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
    
    // Filter by selected course
    const matchesCourse = selectedCourse ? req.courseId === selectedCourse : true;
    
    // Filter by selected branch
    const matchesBranch = selectedBranch ? req.branchId === selectedBranch : true;
    
    return matchesSearch && matchesStatus && matchesType && matchesTab && matchesCourse && matchesBranch;
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

  const getFilterTitle = () => {
    if (selectedCourse && selectedBranch) {
      const matchingRequest = leaveRequests.find(
        req => req.courseId === selectedCourse && req.branchId === selectedBranch
      );
      if (matchingRequest) {
        return `${matchingRequest.course} (${matchingRequest.branch})`;
      }
    } else if (selectedBranch) {
      const matchingRequest = leaveRequests.find(req => req.branchId === selectedBranch);
      if (matchingRequest) {
        return `All courses in ${matchingRequest.branch}`;
      }
    }
    return "All Leave Requests";
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentTab,
    setCurrentTab,
    selectedRequest,
    showDetailsDialog,
    setShowDetailsDialog,
    showApprovalDialog,
    setShowApprovalDialog,
    approvalAction,
    approvalComment,
    setApprovalComment,
    filteredRequests,
    handleViewDetails,
    handleApprovalAction,
    submitApprovalAction,
    getFilterTitle,
  };
};
