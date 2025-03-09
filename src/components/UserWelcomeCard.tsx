
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, BarChart3, FileText } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface UserWelcomeCardProps {
  upcomingLeaveCount: number;
  pendingApprovalCount: number;
}

export const UserWelcomeCard = ({ 
  upcomingLeaveCount, 
  pendingApprovalCount 
}: UserWelcomeCardProps) => {
  const [greeting, setGreeting] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useUser();
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <Card className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-none shadow-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-foreground">
                {greeting}, {user?.name}!
              </h2>
              <p className="text-muted-foreground">
                Welcome to your personalized leave management dashboard
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-2">
              {upcomingLeaveCount > 0 ? (
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {upcomingLeaveCount} upcoming {upcomingLeaveCount === 1 ? 'leave' : 'leaves'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">No upcoming leaves</span>
                </div>
              )}
              
              {pendingApprovalCount > 0 ? (
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">
                    {pendingApprovalCount} {pendingApprovalCount === 1 ? 'request' : 'requests'} pending
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-500">No pending requests</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate("/calendar")}
              className="flex-1 md:flex-none bg-background/80 backdrop-blur-sm border-gray-200 hover:bg-background hover:text-primary"
              size="sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button 
              onClick={() => navigate("/")}
              className="flex-1 md:flex-none"
              size="sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              Apply for Leave
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/leave-balance")}
              className="flex-1 md:flex-none bg-background/80 backdrop-blur-sm border-gray-200 hover:bg-background hover:text-primary"
              size="sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Leave Balance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
