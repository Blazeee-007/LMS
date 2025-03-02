
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Clock, AlertCircle, Calendar, FileCheck } from "lucide-react";

export type StatusType = "pending" | "approved" | "rejected" | "under_review" | "needs_info" | "cancelled";
export type ApproverType = "hod" | "dean" | "principal" | "faculty_advisor";

interface ApplicationStatusProps {
  status: StatusType;
}

export const ApplicationStatus = ({ status }: ApplicationStatusProps) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    under_review: "bg-blue-100 text-blue-800 border-blue-200",
    needs_info: "bg-purple-100 text-purple-800 border-purple-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const statusLabels = {
    pending: "Pending Approval",
    under_review: "Under Review",
    needs_info: "Needs Information",
    approved: "Approved",
    rejected: "Rejected",
    cancelled: "Cancelled",
  };

  const statusIcons = {
    pending: <Clock className="h-4 w-4 mr-1" />,
    under_review: <FileCheck className="h-4 w-4 mr-1" />,
    needs_info: <AlertCircle className="h-4 w-4 mr-1" />,
    approved: <Check className="h-4 w-4 mr-1" />,
    rejected: <X className="h-4 w-4 mr-1" />,
    cancelled: <X className="h-4 w-4 mr-1" />,
  };

  return (
    <Badge className={`${statusStyles[status]} px-3 py-1 flex items-center`}>
      {statusIcons[status]}
      {statusLabels[status]}
    </Badge>
  );
};

export const ApplicationProgress = ({ status, approvers }: { status: StatusType; approvers?: ApproverType[] }) => {
  const steps = ["Submitted", "Under Review", "Processed", "Approved"];
  let currentStep = 1;

  switch (status) {
    case "approved":
      currentStep = 4;
      break;
    case "rejected":
    case "cancelled":
      currentStep = 3; // Rejected at the processing stage
      break;
    case "under_review":
      currentStep = 2; // Under review
      break;
    case "needs_info":
      currentStep = 2; // Needs more information
      break;
    case "pending":
      currentStep = 1; // Just submitted
      break;
    default:
      currentStep = 1;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex flex-col items-center ${
              index < steps.length - 1 ? "flex-1" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? status === "rejected" && index === 2 
                    ? "bg-red-500 text-white"
                    : status === "cancelled" && index === 2
                    ? "bg-gray-500 text-white"
                    : "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-center">{step}</span>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 ${
                  index < currentStep - 1 
                    ? status === "rejected" && index === 2
                      ? "bg-red-500"
                      : status === "cancelled" && index === 2
                      ? "bg-gray-500"
                      : "bg-primary" 
                    : "bg-gray-200"
                }`}
                style={{ width: "100%" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ApprovalWorkflow = ({ 
  status, 
  approvers = [],
  comments = [],
  dueDate,
}: { 
  status: StatusType; 
  approvers?: { role: ApproverType; name: string; status: "pending" | "approved" | "rejected" }[];
  comments?: { author: string; text: string; date: string }[];
  dueDate?: string;
}) => {
  const getApproverTitle = (role: ApproverType) => {
    switch (role) {
      case "hod": return "Head of Department";
      case "dean": return "Dean of Students";
      case "principal": return "Principal";
      case "faculty_advisor": return "Faculty Advisor";
      default: return role;
    }
  };

  const getApproverStatus = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "approved": 
        return <Badge className="bg-green-100 text-green-800 border-green-200"><Check className="h-3 w-3 mr-1" /> Approved</Badge>;
      case "rejected": 
        return <Badge className="bg-red-100 text-red-800 border-red-200"><X className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default: 
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Approval Workflow</h3>
            {dueDate && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Due by: {dueDate}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            {approvers.map((approver, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{approver.name}</p>
                  <p className="text-sm text-gray-600">{getApproverTitle(approver.role)}</p>
                </div>
                {getApproverStatus(approver.status)}
              </div>
            ))}
          </div>
          
          {comments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Comments</h4>
              <div className="space-y-3">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-sm">{comment.author}</p>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
