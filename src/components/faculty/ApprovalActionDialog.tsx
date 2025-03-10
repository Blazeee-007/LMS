
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant={approvalAction === "approve" ? "default" : "destructive"}
            onClick={onSubmit}
            disabled={approvalAction === "reject" && !approvalComment.trim()}
          >
            {approvalAction === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
