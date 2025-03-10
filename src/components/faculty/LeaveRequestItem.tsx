
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, X } from "lucide-react";
import { LeaveRequest, getLeaveTypeColor } from "@/types/leave";
import { ApplicationStatus } from "@/components/ApplicationStatus";

interface LeaveRequestItemProps {
  request: LeaveRequest;
  onViewDetails: (request: LeaveRequest) => void;
  onApprovalAction: (request: LeaveRequest, action: "approve" | "reject") => void;
  showApprovalButtons: boolean;
}

export const LeaveRequestItem = ({
  request,
  onViewDetails,
  onApprovalAction,
  showApprovalButtons
}: LeaveRequestItemProps) => {
  return (
    <div className="p-4 md:p-6 hover:bg-gray-50">
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
          <p className="text-sm text-gray-600">Branch: {request.branch}</p>
          <p className="text-sm text-gray-600">Duration: {request.fromDate} to {request.toDate}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <ApplicationStatus status={request.status} />
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(request)}
            >
              <FileText className="h-4 w-4 mr-1" />
              Details
            </Button>
            {showApprovalButtons && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onApprovalAction(request, "approve")}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onApprovalAction(request, "reject")}
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
  );
};
