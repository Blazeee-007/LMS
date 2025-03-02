
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LeaveBalance {
  type: "medical" | "personal" | "academic" | "emergency";
  used: number;
  total: number;
  color: string;
}

interface LeaveBalanceCardProps {
  balances: LeaveBalance[];
  warningThreshold?: number;
}

export const LeaveBalanceCard = ({ balances, warningThreshold = 80 }: LeaveBalanceCardProps) => {
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
    ((balance.used / balance.total) * 100) >= warningThreshold
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Leave Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowBalanceWarning && (
          <Alert variant="warning" className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-700 text-xs">
              Your {getTypeName(lowBalanceWarning.type)} is running low. {lowBalanceWarning.used} of {lowBalanceWarning.total} days used.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          {balances.map((balance, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{getTypeName(balance.type)}</span>
                  {((balance.used / balance.total) * 100) >= warningThreshold && (
                    <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 text-xs">
                      Low Balance
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {balance.used}/{balance.total} days used
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${balance.color}`} 
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-3 mt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Total</span>
            </div>
            <span className="text-sm font-semibold">
              {getTotalUsed()}/{getTotalAvailable()} days used
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className="h-2 rounded-full bg-primary" 
              style={{ width: `${(getTotalUsed() / getTotalAvailable()) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
