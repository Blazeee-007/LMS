
import React, { useState } from "react";
import { X, Check, Loader2, Mail } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

interface ApprovalActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: LeaveRequest | null;
  approvalAction: "approve" | "reject" | null;
  approvalComment: string;
  setApprovalComment: (comment: string) => void;
  onSubmit: (sendEmail: boolean) => void;
  isSubmitting?: boolean;
}

export const ApprovalActionDialog = ({
  open,
  onOpenChange,
  selectedRequest,
  approvalAction,
  approvalComment,
  setApprovalComment,
  onSubmit,
  isSubmitting = false
}: ApprovalActionDialogProps) => {
  const [sendEmail, setSendEmail] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  
  if (!selectedRequest || !approvalAction) return null;

  const isApprove = approvalAction === "approve";
  const actionText = isApprove ? "approve" : "reject";
  const actionTextCap = isApprove ? "Approve" : "Reject";
  const buttonVariant = isApprove ? "default" : "destructive";
  const icon = isSubmitting ? 
    <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : 
    isApprove ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />;

  const handleSubmit = () => {
    onSubmit(sendEmail);
    setShowSuccess(true);
    
    // Auto close after success display
    setTimeout(() => {
      setShowSuccess(false);
      onOpenChange(false);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isApprove ? "Leave Request Approved" : "Leave Request Rejected"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 flex flex-col items-center justify-center">
            <div className={`rounded-full p-3 ${isApprove ? "bg-green-100" : "bg-red-100"} mb-4`}>
              {isApprove ? 
                <Check className="h-6 w-6 text-green-600" /> : 
                <X className="h-6 w-6 text-red-600" />
              }
            </div>
            <p className="text-center">
              {isApprove ? 
                `You have successfully approved ${selectedRequest.studentName}'s leave request.` : 
                `You have rejected ${selectedRequest.studentName}'s leave request.`
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">This dialog will close automatically.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
        
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox 
            id="send-email" 
            checked={sendEmail} 
            onCheckedChange={(checked) => setSendEmail(checked === true)} 
          />
          <label htmlFor="send-email" className="text-sm font-medium flex items-center cursor-pointer">
            <Mail className="h-4 w-4 mr-1" />
            Send email notification to student
          </label>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={buttonVariant}
            onClick={handleSubmit}
            disabled={(!isApprove && !approvalComment.trim()) || isSubmitting}
          >
            {icon}
            {isSubmitting ? 'Processing...' : actionTextCap}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
