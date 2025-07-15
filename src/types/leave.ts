export type StatusType = "pending" | "under_review" | "needs_info" | "approved" | "rejected" | "cancelled";
export type LeaveType = "medical" | "personal" | "academic" | "emergency";

export interface LeaveRequest {
  id: number;
  facultyName: string;
  facultyId: string;
  employeeId: string;
  date: string;
  status: StatusType;
  title: string;
  reason: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  department: string;
  designation: string;
  workAllocation?: string;
  substituteArranged?: boolean;
  substituteFaculty?: string;
  attachments?: string[];
  emailNotification?: boolean;
  adminApprovalRequired?: boolean;
}

export const getLeaveTypeColor = (type: LeaveType) => {
  switch (type) {
    case "medical": return "bg-red-100 text-red-800";
    case "personal": return "bg-blue-100 text-blue-800";
    case "academic": return "bg-purple-100 text-purple-800";
    case "emergency": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    facultyName: "Dr. Rajesh Kumar",
    facultyId: "FAC001",
    employeeId: "EMP2021001",
    date: "2024-06-10",
    status: "pending",
    title: "Medical Leave Request",
    reason: "Surgery recovery period",
    leaveType: "medical",
    fromDate: "2024-06-12",
    toDate: "2024-06-20",
    department: "Computer Science",
    designation: "Associate Professor",
    workAllocation: "Data Structures, Algorithms",
    substituteArranged: true,
    substituteFaculty: "Dr. Priya Sharma",
    emailNotification: true,
    adminApprovalRequired: true
  },
  {
    id: 2,
    facultyName: "Dr. Anjali Verma",
    facultyId: "FAC002",
    employeeId: "EMP2021002",
    date: "2024-06-09",
    status: "pending",
    title: "Conference Attendance",
    reason: "International Conference on Machine Learning",
    leaveType: "academic",
    fromDate: "2024-06-15",
    toDate: "2024-06-18",
    department: "Computer Science",
    designation: "Assistant Professor",
    workAllocation: "Machine Learning, AI",
    substituteArranged: true,
    substituteFaculty: "Dr. Mohan Kumar",
    emailNotification: true,
    adminApprovalRequired: false
  },
  {
    id: 3,
    facultyName: "Prof. Suresh Reddy",
    facultyId: "FAC003",
    employeeId: "EMP2021003",
    date: "2024-06-08",
    status: "under_review",
    title: "Research Sabbatical",
    reason: "Visiting researcher at IIT Delhi",
    leaveType: "academic",
    fromDate: "2024-07-01",
    toDate: "2024-12-31",
    department: "Electronics & Communication",
    designation: "Professor",
    workAllocation: "Signal Processing, Communications",
    substituteArranged: false,
    emailNotification: true,
    adminApprovalRequired: true
  },
  {
    id: 4,
    facultyName: "Dr. Kavitha Nair",
    facultyId: "FAC004",
    employeeId: "EMP2021004",
    date: "2024-06-05",
    status: "approved",
    title: "Family Emergency",
    reason: "Father's hospitalization",
    leaveType: "emergency",
    fromDate: "2024-06-06",
    toDate: "2024-06-10",
    department: "Mechanical Engineering",
    designation: "Assistant Professor",
    workAllocation: "Thermodynamics, Heat Transfer",
    substituteArranged: true,
    substituteFaculty: "Dr. Ramesh Babu",
    emailNotification: true,
    adminApprovalRequired: false
  },
  {
    id: 5,
    facultyName: "Dr. Vikram Singh",
    facultyId: "FAC005",
    employeeId: "EMP2021005",
    date: "2024-06-11",
    status: "pending",
    title: "Personal Leave",
    reason: "Son's wedding preparations",
    leaveType: "personal",
    fromDate: "2024-06-25",
    toDate: "2024-06-30",
    department: "Civil Engineering",
    designation: "Associate Professor",
    workAllocation: "Structural Engineering, Design",
    substituteArranged: true,
    substituteFaculty: "Dr. Lakshmi Devi",
    emailNotification: true,
    adminApprovalRequired: false
  }
];
