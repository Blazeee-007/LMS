import { Header } from "@/components/Header";
import { ApplicationStatus, ApplicationProgress } from "@/components/ApplicationStatus";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type StatusType = "pending" | "approved" | "rejected";

const Dashboard = () => {
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      date: "2024-02-20",
      status: "approved" as StatusType,
      reason: "Family Emergency",
      fromDate: "2024-02-21",
      toDate: "2024-02-23",
    },
    {
      id: 2,
      date: "2024-02-15",
      status: "pending" as StatusType,
      reason: "Medical Emergency",
      fromDate: "2024-02-16",
      toDate: "2024-02-18",
    },
  ];

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
                <div>
                  <h3 className="font-semibold">{application.reason}</h3>
                  <p className="text-sm text-gray-600">
                    {application.fromDate} to {application.toDate}
                  </p>
                </div>
                <ApplicationStatus status={application.status} />
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