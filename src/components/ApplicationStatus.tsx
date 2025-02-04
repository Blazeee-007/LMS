import { Badge } from "@/components/ui/badge";

type StatusType = "pending" | "approved" | "rejected";

interface ApplicationStatusProps {
  status: StatusType;
}

export const ApplicationStatus = ({ status }: ApplicationStatusProps) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={statusStyles[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const ApplicationProgress = ({ status }: { status: StatusType }) => {
  const steps = ["Submitted", "Processing", "Delivered", "Approved"];
  const currentStep = status === "approved" ? 4 : status === "pending" ? 2 : 1;

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
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1">{step}</span>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 ${
                  index < currentStep - 1 ? "bg-primary" : "bg-gray-200"
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