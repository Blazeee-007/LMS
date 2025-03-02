
import { Header } from "@/components/Header";
import { ApplicationStatus, ApplicationProgress } from "@/components/ApplicationStatus";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { X, Calendar, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { LeaveStatistics } from "@/components/LeaveStatistics";

type StatusType = "pending" | "approved" | "rejected";
type LeaveType = "medical" | "personal" | "academic" | "emergency";

interface Application {
  id: number;
  date: string;
  status: StatusType;
  title: string;
  reason: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  course: string;
  branch: string;
  semester: string;
  attachments?: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const applications: Application[] = [
    {
      id: 1,
      date: "2024-02-20",
      status: "approved",
      title: "Three Days Leave",
      reason: "Family Emergency",
      leaveType: "emergency",
      fromDate: "2024-02-21",
      toDate: "2024-02-23",
      course: "B.Tech",
      branch: "Computer Science (CSE)",
      semester: "3 Year - 1 Semester"
    },
    {
      id: 2,
      date: "2024-02-15",
      status: "pending",
      title: "Medical Leave Request",
      reason: "Medical Leave",
      leaveType: "medical",
      fromDate: "2024-02-16",
      toDate: "2024-02-18",
      course: "Degree",
      branch: "BCA",
      semester: "2 Year - 2 Semester",
      attachments: ["medical_certificate.pdf"]
    },
    {
      id: 3,
      date: "2024-01-10",
      status: "rejected",
      title: "Academic Conference",
      reason: "Attending a research conference",
      leaveType: "academic",
      fromDate: "2024-01-15",
      toDate: "2024-01-18",
      course: "B.Tech",
      branch: "Computer Science & AI/ML (CSE-AIML)",
      semester: "4 Year - 1 Semester"
    },
  ];

  const handleCancelApplication = (id: number) => {
    toast({
      title: "Application Cancelled",
      description: "Your leave application has been cancelled successfully.",
    });
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsDialog(true);
  };

  // Calculate leave statistics
  const totalLeaves = applications.length;
  const approvedLeaves = applications.filter(app => app.status === "approved").length;
  const pendingLeaves = applications.filter(app => app.status === "pending").length;
  const rejectedLeaves = applications.filter(app => app.status === "rejected").length;

  const getLeaveTypeColor = (type: LeaveType) => {
    switch (type) {
      case "medical": return "bg-red-100 text-red-800";
      case "personal": return "bg-blue-100 text-blue-800";
      case "academic": return "bg-purple-100 text-purple-800";
      case "emergency": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Leave Applications</h1>
          <Button onClick={() => navigate("/")}>New Application</Button>
        </div>

        {/* Leave Statistics */}
        <LeaveStatistics 
          total={totalLeaves} 
          approved={approvedLeaves} 
          pending={pendingLeaves} 
          rejected={rejectedLeaves} 
        />

        <h2 className="text-xl font-semibold mt-8 mb-4">Application History</h2>
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">{application.title}</h2>
                    <Badge className={getLeaveTypeColor(application.leaveType)}>
                      {application.leaveType.charAt(0).toUpperCase() + application.leaveType.slice(1)}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-700">{application.reason}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <p>{application.fromDate} to {application.toDate}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <p>Course: {application.course}</p>
                    <p>Branch: {application.branch}</p>
                    <p>Semester: {application.semester}</p>
                  </div>
                  
                  {application.attachments && application.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                      <FileText className="h-4 w-4" />
                      <span>{application.attachments.length} attachment(s)</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <ApplicationStatus status={application.status} />
                  <div className="flex gap-2">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(application)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <ApplicationProgress status={application.status} />
              </div>
            </div>
          ))}
        </div>

        {/* Application Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl">
            {selectedApplication && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {selectedApplication.title}
                    <Badge className={getLeaveTypeColor(selectedApplication.leaveType)}>
                      {selectedApplication.leaveType.charAt(0).toUpperCase() + selectedApplication.leaveType.slice(1)}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    Application Date: {selectedApplication.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Status</h3>
                      <ApplicationStatus status={selectedApplication.status} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Date Range</h3>
                      <p className="text-gray-700">{selectedApplication.fromDate} to {selectedApplication.toDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Reason</h3>
                    <p className="text-gray-700">{selectedApplication.reason}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold">Course</h3>
                      <p className="text-gray-700">{selectedApplication.course}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Branch</h3>
                      <p className="text-gray-700">{selectedApplication.branch}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Semester</h3>
                      <p className="text-gray-700">{selectedApplication.semester}</p>
                    </div>
                  </div>
                  
                  {selectedApplication.attachments && selectedApplication.attachments.length > 0 && (
                    <div>
                      <h3 className="font-semibold">Attachments</h3>
                      <ul className="list-disc pl-5">
                        {selectedApplication.attachments.map((attachment, index) => (
                          <li key={index} className="text-blue-600 underline cursor-pointer">
                            {attachment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedApplication.status === "pending" && (
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          handleCancelApplication(selectedApplication.id);
                          setShowDetailsDialog(false);
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel Application
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;
