
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertCircle, HelpCircle } from "lucide-react";
import { StatusType } from "@/types/leave";

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
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-300 flex items-center gap-1">
          Unknown Status
        </Badge>
      );
  }
};
