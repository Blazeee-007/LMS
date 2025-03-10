
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeaveRequest, getLeaveTypeColor } from "@/types/leave";
import { ApplicationStatus } from "@/components/ApplicationStatus";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LeaveDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: LeaveRequest | null;
  onApprovalAction: (request: LeaveRequest, action: "approve" | "reject") => void;
}

export const LeaveDetailsDialog = ({
  open,
  onOpenChange,
  selectedRequest,
  onApprovalAction
}: LeaveDetailsDialogProps) => {
  if (!selectedRequest) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
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
                  onOpenChange(false);
                  onApprovalAction(selectedRequest, "reject");
                }}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  onOpenChange(false);
                  onApprovalAction(selectedRequest, "approve");
                }}
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
