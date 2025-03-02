
import { Badge } from "@/components/ui/badge";

type StatusType = "pending" | "approved" | "rejected";

interface ApplicationStatusProps {
  status: StatusType;
}

export const ApplicationStatus = ({ status }: ApplicationStatusProps) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const statusLabels = {
    pending: "Pending Approval",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <Badge className={`${statusStyles[status]} px-3 py-1`}>
      {statusLabels[status]}
    </Badge>
  );
};

export const ApplicationProgress = ({ status }: { status: StatusType }) => {
  const steps = ["Submitted", "Under Review", "Processed", "Approved"];
  let currentStep = 1;

  switch (status) {
    case "approved":
      currentStep = 4;
      break;
    case "rejected":
      currentStep = 3; // Rejected at the processing stage
      break;
    case "pending":
      currentStep = 2; // Under review
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
