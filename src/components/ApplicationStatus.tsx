
import React from "react";
import { CheckCircle, Clock, X, AlertCircle, HelpCircle } from "lucide-react";
import { StatusType } from "@/types/leave";

export interface ApplicationStatusProps {
  status: StatusType;
}

export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          icon: <Clock className="h-4 w-4 text-yellow-600 mr-1" />,
          text: "Pending"
        };
      case "approved":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          icon: <CheckCircle className="h-4 w-4 text-green-600 mr-1" />,
          text: "Approved"
        };
      case "rejected":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          icon: <X className="h-4 w-4 text-red-600 mr-1" />,
          text: "Rejected"
        };
      case "under_review":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          icon: <Clock className="h-4 w-4 text-blue-600 mr-1" />,
          text: "Under Review"
        };
      case "needs_info":
        return {
          bgColor: "bg-purple-100",
          textColor: "text-purple-800",
          icon: <HelpCircle className="h-4 w-4 text-purple-600 mr-1" />,
          text: "Needs Info"
        };
      case "cancelled":
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          icon: <X className="h-4 w-4 text-gray-600 mr-1" />,
          text: "Cancelled"
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          icon: <AlertCircle className="h-4 w-4 text-gray-600 mr-1" />,
          text: "Unknown"
        };
    }
  };

  const { bgColor, textColor, icon, text } = getStatusConfig();

  return (
    <div className={`flex items-center px-3 py-1 rounded-full ${bgColor} ${textColor}`}>
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

// Export ApplicationProgress component
export const ApplicationProgress: React.FC<ApplicationStatusProps> = ({ status }) => {
  const getProgress = () => {
    switch (status) {
      case "pending":
        return 20;
      case "under_review":
        return 40;
      case "needs_info":
        return 60;
      case "approved":
        return 100;
      case "rejected":
        return 100;
      case "cancelled":
        return 100;
      default:
        return 0;
    }
  };

  const getColor = () => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "cancelled":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const progress = getProgress();
  const color = getColor();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
        <span>Applied</span>
        <span>Under Review</span>
        <span>Final Decision</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Export ApprovalWorkflow component
export const ApprovalWorkflow: React.FC<ApplicationStatusProps> = ({ status }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 mr-3">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Application Submitted</p>
          <p className="text-sm text-gray-500">Application has been received</p>
        </div>
      </div>

      <div className="w-px h-6 bg-gray-300 ml-4"></div>

      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
          status === "pending" || status === "under_review" || status === "needs_info" || status === "approved" || status === "rejected"
            ? "bg-blue-100 text-blue-600"
            : "bg-gray-100 text-gray-400"
        }`}>
          <Clock className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className={`font-medium ${
            status === "pending" || status === "under_review" || status === "needs_info" || status === "approved" || status === "rejected"
              ? ""
              : "text-gray-400"
          }`}>Under Review</p>
          <p className="text-sm text-gray-500">Your application is being reviewed</p>
        </div>
      </div>

      <div className="w-px h-6 bg-gray-300 ml-4"></div>

      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
          status === "approved"
            ? "bg-green-100 text-green-600"
            : status === "rejected"
              ? "bg-red-100 text-red-600"
              : status === "cancelled"
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-400"
        }`}>
          {status === "approved" ? (
            <CheckCircle className="h-5 w-5" />
          ) : status === "rejected" ? (
            <X className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <p className={`font-medium ${
            status === "approved" || status === "rejected" || status === "cancelled"
              ? ""
              : "text-gray-400"
          }`}>
            {status === "approved"
              ? "Approved"
              : status === "rejected"
                ? "Rejected"
                : status === "cancelled"
                  ? "Cancelled"
                  : "Decision Pending"}
          </p>
          <p className="text-sm text-gray-500">
            {status === "approved"
              ? "Your leave has been approved"
              : status === "rejected"
                ? "Your leave has been rejected"
                : status === "cancelled"
                  ? "Your application has been cancelled"
                  : "Waiting for final decision"}
          </p>
        </div>
      </div>
    </div>
  );
};
