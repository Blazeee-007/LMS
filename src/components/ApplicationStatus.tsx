
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertCircle, HelpCircle, Ban } from "lucide-react";
import { StatusType } from "@/types/leave";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ApplicationStatusProps {
  status: StatusType;
}

export const ApplicationStatus = ({ status }: ApplicationStatusProps) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending Review
        </Badge>
      );
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    case "under_review":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Under Review
        </Badge>
      );
    case "needs_info":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-300 flex items-center gap-1">
          <HelpCircle className="h-3 w-3" />
          Needs More Info
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-300 flex items-center gap-1">
          <Ban className="h-3 w-3" />
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-300 flex items-center gap-1">
          Unknown Status
        </Badge>
      );
  }
};

// Add the ApplicationProgress component
export const ApplicationProgress = ({ status }: ApplicationStatusProps) => {
  const getStepStatus = (step: string) => {
    switch (step) {
      case "submitted":
        return "completed";
      case "review":
        return ["pending", "under_review", "needs_info", "approved", "rejected", "cancelled"].includes(status) 
          ? "completed" 
          : "pending";
      case "approval":
        return ["approved", "rejected", "cancelled"].includes(status) 
          ? "completed" 
          : "pending";
      case "completed":
        return status === "approved" ? "completed" : "pending";
      default:
        return "pending";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus("submitted") === "completed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"}`}>
            <CheckCircle className="h-4 w-4" />
          </div>
          <span className="text-xs mt-1">Submitted</span>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`h-1 w-full ${getStepStatus("review") === "completed" ? "bg-green-500" : "bg-gray-200"}`}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus("review") === "completed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"}`}>
            <AlertCircle className="h-4 w-4" />
          </div>
          <span className="text-xs mt-1">Review</span>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`h-1 w-full ${getStepStatus("approval") === "completed" ? "bg-green-500" : "bg-gray-200"}`}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus("approval") === "completed" ? status === "approved" ? "bg-green-100 text-green-800" : status === "rejected" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-400"}`}>
            {status === "approved" ? <CheckCircle className="h-4 w-4" /> : status === "rejected" ? <XCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
          </div>
          <span className="text-xs mt-1">Decision</span>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`h-1 w-full ${getStepStatus("completed") === "completed" ? "bg-green-500" : "bg-gray-200"}`}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatus("completed") === "completed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"}`}>
            <CheckCircle className="h-4 w-4" />
          </div>
          <span className="text-xs mt-1">Completed</span>
        </div>
      </div>
    </div>
  );
};

// Add the ApprovalWorkflow component
interface Approver {
  role: string;
  name: string;
  status: "pending" | "approved" | "rejected";
}

interface Comment {
  author: string;
  text: string;
  date: string;
}

interface ApprovalWorkflowProps {
  status: StatusType;
  approvers: Approver[];
  comments: Comment[];
  dueDate: string;
}

export const ApprovalWorkflow = ({ status, approvers, comments, dueDate }: ApprovalWorkflowProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Approval Workflow</h3>
      <p className="text-sm text-gray-500 mb-4">Due by: {dueDate}</p>
      
      <div className="space-y-4">
        {approvers.map((approver, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 
              ${approver.status === "approved" ? "bg-green-100 text-green-800" : 
                approver.status === "rejected" ? "bg-red-100 text-red-800" : 
                "bg-gray-100 text-gray-500"}`}
            >
              {approver.status === "approved" ? (
                <CheckCircle className="h-4 w-4" />
              ) : approver.status === "rejected" ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{approver.name}</p>
              <p className="text-sm text-gray-500">{approver.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
            </div>
            <Badge 
              variant="outline" 
              className={
                approver.status === "approved" ? "bg-green-50 text-green-800 border-green-300" : 
                approver.status === "rejected" ? "bg-red-50 text-red-800 border-red-300" : 
                "bg-yellow-50 text-yellow-800 border-yellow-300"
              }
            >
              {approver.status.charAt(0).toUpperCase() + approver.status.slice(1)}
            </Badge>
          </div>
        ))}
      </div>
      
      {comments.length > 0 && (
        <>
          <Separator className="my-4" />
          <h3 className="font-semibold mb-2">Comments</h3>
          <div className="space-y-3">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{comment.author}</p>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};
