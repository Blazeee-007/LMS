
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

interface UserWelcomeCardProps {
  userName: string;
  upcomingLeaveCount: number;
  pendingApprovalCount: number;
}

export const UserWelcomeCard = ({ 
  userName, 
  upcomingLeaveCount, 
  pendingApprovalCount 
}: UserWelcomeCardProps) => {
  const [greeting, setGreeting] = useState<string>("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {greeting}, {userName}!
            </h2>
            <p className="text-muted-foreground mt-1">
              Welcome to your personalized leave management dashboard
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              {upcomingLeaveCount > 0 ? (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>You have {upcomingLeaveCount} upcoming {upcomingLeaveCount === 1 ? 'leave' : 'leaves'}</span>
                </div>
              ) : null}
              
              {pendingApprovalCount > 0 ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>{pendingApprovalCount} {pendingApprovalCount === 1 ? 'request' : 'requests'} pending approval</span>
                </div>
              ) : null}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/calendar")}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button onClick={() => navigate("/")}>
              Apply for Leave
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
