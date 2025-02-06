import { Header } from "@/components/Header";
import { ApplicationStatus, ApplicationProgress } from "@/components/ApplicationStatus";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

type StatusType = "pending" | "approved" | "rejected";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const applications = [
    {
      id: 1,
      date: "2024-02-20",
      status: "approved" as StatusType,
      reason: "Family Emergency",
      fromDate: "2024-02-21",
      toDate: "2024-02-23",
      course: "B.Tech",
      branch: "Computer Science",
      semester: "3 Year - 1 Semester"
    },
    {
      id: 2,
      date: "2024-02-15",
      status: "pending" as StatusType,
      reason: "Medical Leave",
      fromDate: "2024-02-16",
      toDate: "2024-02-18",
      course: "Degree",
      branch: "BCA",
      semester: "2 Year - 2 Semester"
    },
  ];

  const handleCancelApplication = (id: number) => {
    toast({
      title: "Application Cancelled",
      description: "Your leave application has been cancelled successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Leave Applications</h1>
          <Button onClick={() => navigate("/")}>New Application</Button>
        </div>
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-semibold">{application.reason}</h3>
                  <p className="text-sm text-gray-600">
                    {application.fromDate} to {application.toDate}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <p>Course: {application.course}</p>
                    <p>Branch: {application.branch}</p>
                    <p>Semester: {application.semester}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ApplicationStatus status={application.status} />
                  {application.status === "pending" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelApplication(application.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
              <div className="pt-4 border-t">
                <ApplicationProgress status={application.status} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;