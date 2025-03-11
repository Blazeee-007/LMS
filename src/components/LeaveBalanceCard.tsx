
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, Clock, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface LeaveBalance {
  type: "medical" | "personal" | "academic" | "emergency";
  used: number;
  total: number;
  color: string;
  warningThreshold?: number;
}

interface LeaveBalanceCardProps {
  balances: LeaveBalance[];
  warningThreshold?: number;
  className?: string;
}

export const LeaveBalanceCard = ({ 
  balances, 
  warningThreshold = 80, 
  className = "" 
}: LeaveBalanceCardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const getTotalUsed = () => {
    return balances.reduce((sum, balance) => sum + balance.used, 0);
  };

  const getTotalAvailable = () => {
    return balances.reduce((sum, balance) => sum + balance.total, 0);
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "medical": return "Medical Leave";
      case "personal": return "Personal Leave";
      case "academic": return "Academic Leave";
      case "emergency": return "Emergency Leave";
      default: return type;
    }
  };

  // Check if any leave type is close to exhaustion
  const lowBalanceWarning = balances.find(balance => 
    ((balance.used / balance.total) * 100) >= (balance.warningThreshold || warningThreshold)
  );

  const exportToCSV = () => {
    // Create CSV content
    let csvContent = "Leave Type,Used Days,Total Days,Percentage Used\n";
    
    balances.forEach(balance => {
      const percentage = ((balance.used / balance.total) * 100).toFixed(2);
      csvContent += `${getTypeName(balance.type)},${balance.used},${balance.total},${percentage}%\n`;
    });
    
    // Add total row
    csvContent += `Total,${getTotalUsed()},${getTotalAvailable()},${((getTotalUsed() / getTotalAvailable()) * 100).toFixed(2)}%\n`;
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leave_balance_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Your leave balance data has been exported to CSV.",
      duration: 3000,
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Leave Balance
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={exportToCSV}
            title="Export to CSV"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowBalanceWarning && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-700 text-xs">
              Your {getTypeName(lowBalanceWarning.type)} is running low. {lowBalanceWarning.used} of {lowBalanceWarning.total} days used.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          {balances.map((balance, idx) => {
            const thresholdToUse = balance.warningThreshold || warningThreshold;
            const percentageUsed = (balance.used / balance.total) * 100;
            const isHovered = hoveredIndex === idx;
            
            return (
              <div 
                key={idx} 
                className="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md -mx-2"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{getTypeName(balance.type)}</span>
                    {percentageUsed >= thresholdToUse && (
                      <Badge variant="warning" className="text-xs">
                        Low Balance
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {balance.used}/{balance.total} days used
                    {isHovered && (
                      <span className="ml-2 text-gray-500">
                        ({percentageUsed.toFixed(1)}%)
                      </span>
                    )}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className={`h-2 rounded-full ${balance.color}`} 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentageUsed}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-3 mt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Total</span>
            </div>
            <span className="text-sm font-semibold">
              {getTotalUsed()}/{getTotalAvailable()} days used
              ({((getTotalUsed() / getTotalAvailable()) * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
            <motion.div 
              className="h-2 rounded-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${(getTotalUsed() / getTotalAvailable()) * 100}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
