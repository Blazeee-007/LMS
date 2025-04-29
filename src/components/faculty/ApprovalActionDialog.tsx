
import React from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LeaveRequest } from "@/types/leave";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApprovalActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: LeaveRequest | null;
  approvalAction: "approve" | "reject" | null;
  approvalComment: string;
  setApprovalComment: (comment: string) => void;
  onSubmit: () => void;
}

export const ApprovalActionDialog = ({
  open,
  onOpenChange,
  selectedRequest,
  approvalAction,
  approvalComment,
  setApprovalComment,
  onSubmit
}: ApprovalActionDialogProps) => {
  if (!selectedRequest || !approvalAction) return null;

  const isApprove = approvalAction === "approve";
  const actionText = isApprove ? "approve" : "reject";
  const actionTextCap = isApprove ? "Approve" : "Reject";
  const buttonVariant = isApprove ? "default" : "destructive";
  const icon = isApprove ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {actionTextCap} Leave Request
          </DialogTitle>
          <DialogDescription>
            You are about to {actionText} the leave request from {selectedRequest.studentName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Alert>
            <AlertDescription>
              {isApprove ? (
                <>
                  By approving this request, you are confirming that the student is permitted to be absent 
                  from {selectedRequest.fromDate} to {selectedRequest.toDate}.
                </>
              ) : (
                <>
                  By rejecting this request, you are denying the student's leave application. 
                  Please provide a reason for rejection below.
                </>
              )}
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="comment" className="text-sm font-medium">
            Comments {!isApprove && <span className="text-red-500">*</span>}
          </label>
          <Textarea
            id="comment"
            placeholder={isApprove ? "Optional comments..." : "Reason for rejection..."}
            value={approvalComment}
            onChange={(e) => setApprovalComment(e.target.value)}
            className="min-h-24"
          />
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={buttonVariant}
            onClick={onSubmit}
            disabled={!isApprove && !approvalComment.trim()}
          >
            {icon}
            {actionTextCap}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
