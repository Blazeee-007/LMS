
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, CheckCircle, XCircle } from "lucide-react";
import { StatusType, LeaveType } from "@/types/leave";
import { motion } from "framer-motion";

// Define the LeaveApplication interface locally since it's not exported from @/types/leave
interface LeaveApplication {
  id: number;
  title: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  status: StatusType;
  reason: string;
  days: number;
}

interface LeaveStatisticsCardProps {
  applications: LeaveApplication[];
  className?: string; // Add className prop to support styling
}

export const LeaveStatisticsCard = ({ applications, className = "" }: LeaveStatisticsCardProps) => {
  const approved = applications.filter(app => app.status === "approved").length;
  const rejected = applications.filter(app => app.status === "rejected").length;
  const pending = applications.filter(
    app => ["pending", "under_review", "needs_info"].includes(app.status)
  ).length;
  const total = applications.length;

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Leave Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Total</span>
            </div>
            <p className="text-2xl font-bold">{total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Approved</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{approved}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{pending}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Rejected</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{rejected}</p>
          </motion.div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${total > 0 ? (approved / total) * 100 : 0}%` }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-full bg-green-500"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Approval Rate</span>
            <span>{total > 0 ? Math.round((approved / total) * 100) : 0}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
