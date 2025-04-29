export type StatusType = "pending" | "under_review" | "needs_info" | "approved" | "rejected" | "cancelled";
export type LeaveType = "medical" | "personal" | "academic" | "emergency";

export interface LeaveRequest {
  id: number;
  studentName: string;
  studentId: string;
  date: string;
  status: StatusType;
  title: string;
  reason: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  course: string;
  courseId?: string;
  branch: string;
  branchId?: string;
  semester: string;
  attachments?: string[];
  parentNotified?: boolean;
  parentPhone?: string;
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
    studentName: "Durga Prasad",
    studentId: "CS2021001",
    date: "2024-06-10",
    status: "pending",
    title: "Medical Leave Request",
    reason: "Fever and body pain",
    leaveType: "medical",
    fromDate: "2024-06-12",
    toDate: "2024-06-14",
    course: "Data Structures",
    courseId: "cse201",
    branch: "Computer Science (CSE)",
    branchId: "cse",
    semester: "5-1",
    parentNotified: true,
    parentPhone: "9876543210"
  },
  {
    id: 2,
    studentName: "Arjun Reddy",
    studentId: "CS2021002",
    date: "2024-06-09",
    status: "pending",
    title: "Family Function",
    reason: "Sister's wedding",
    leaveType: "personal",
    fromDate: "2024-06-15",
    toDate: "2024-06-18",
    course: "Database Management",
    courseId: "cse301",
    branch: "Computer Science (CSE)",
    branchId: "cse",
    semester: "5-1"
  },
  {
    id: 3,
    studentName: "Priya Sharma",
    studentId: "CS2021003",
    date: "2024-06-08",
    status: "under_review",
    title: "Conference Participation",
    reason: "Selected to present paper at national level conference",
    leaveType: "academic",
    fromDate: "2024-06-20",
    toDate: "2024-06-22",
    course: "Basic Electronics",
    courseId: "ece101",
    branch: "Electronics & Communication (ECE)",
    branchId: "ece",
    semester: "5-1"
  },
  {
    id: 4,
    studentName: "Ravi Kumar",
    studentId: "CS2021004",
    date: "2024-06-05",
    status: "approved",
    title: "Medical Emergency",
    reason: "Hospitalization due to accident",
    leaveType: "medical",
    fromDate: "2024-06-06",
    toDate: "2024-06-12",
    course: "Engineering Mechanics",
    courseId: "mech101",
    branch: "Mechanical Engineering (MECH)",
    branchId: "mech",
    semester: "5-1"
  },
  {
    id: 5,
    studentName: "Sneha Patel",
    studentId: "CS2021005",
    date: "2024-06-11",
    status: "pending",
    title: "Family Emergency",
    reason: "Grandmother hospitalized",
    leaveType: "emergency",
    fromDate: "2024-06-12",
    toDate: "2024-06-15",
    course: "Data Structures",
    courseId: "cse201",
    branch: "Computer Science (CSE)",
    branchId: "cse",
    semester: "5-1"
  }
];
