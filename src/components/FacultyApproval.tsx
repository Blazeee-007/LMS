
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useFacultyLeaves } from "@/hooks/useFacultyLeaves";
import { LeaveFilters } from "@/components/faculty/LeaveFilters";
import { LeaveRequestItem } from "@/components/faculty/LeaveRequestItem";
import { LeaveDetailsDialog } from "@/components/faculty/LeaveDetailsDialog";
import { ApprovalActionDialog } from "@/components/faculty/ApprovalActionDialog";

interface FacultyApprovalProps {
  selectedCourse: string | null;
  selectedBranch: string | null;
}

export const FacultyApproval = ({ selectedCourse, selectedBranch }: FacultyApprovalProps) => {
  const {
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
  } = useFacultyLeaves({ selectedCourse, selectedBranch });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold">{getFilterTitle()}</h2>
        {(selectedCourse || selectedBranch) && (
          <Badge variant="outline" className="px-3 py-1">
            {selectedCourse ? "Course filtered" : "Branch filtered"}
          </Badge>
        )}
      </div>
      
      <LeaveFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <Tabs defaultValue="pending" value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>
        
        {["pending", "processed", "all"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4">
            <Card>
              <CardContent className="p-0">
                {filteredRequests.length > 0 ? (
                  <div className="divide-y">
                    {filteredRequests.map((request) => (
                      <LeaveRequestItem
                        key={request.id}
                        request={request}
                        onViewDetails={handleViewDetails}
                        onApprovalAction={handleApprovalAction}
                        showApprovalButtons={
                          (tabValue === "pending" || tabValue === "all") && 
                          ["pending", "under_review", "needs_info"].includes(request.status)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">
                      {tabValue === "pending" 
                        ? "No pending leave requests found" 
                        : tabValue === "processed" 
                          ? "No processed leave requests found" 
                          : "No leave requests found"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Leave Request Details Dialog */}
      <LeaveDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        selectedRequest={selectedRequest}
        onApprovalAction={handleApprovalAction}
      />

      {/* Approval/Rejection Dialog */}
      <ApprovalActionDialog
        open={showApprovalDialog}
        onOpenChange={setShowApprovalDialog}
        selectedRequest={selectedRequest}
        approvalAction={approvalAction}
        approvalComment={approvalComment}
        setApprovalComment={setApprovalComment}
        onSubmit={submitApprovalAction}
      />
    </div>
  );
};
