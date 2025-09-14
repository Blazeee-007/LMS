
import { useUser } from "@/context/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Calendar, 
  ChevronDown, 
  ClipboardList, 
  FileText, 
  Home, 
  LogOut, 
  Menu, 
  Settings, 
  User, 
  Users,
  CheckSquare
} from "lucide-react";

export const Header = () => {
  const { user, logout, isAdmin, isFaculty } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Function to determine home page based on role
  const getHomePage = () => {
    if (isAdmin) return "/admin";
    return "/dashboard";
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to={getHomePage()} className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6" />
            <span className="font-bold">Leave Management System</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {isAdmin ? (
              <>
                <Link 
                  to="/admin" 
                  className={`flex items-center gap-1 ${isActive("/admin") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/admin/manage-users" 
                  className={`flex items-center gap-1 ${isActive("/admin/manage-users") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Users className="h-4 w-4" />
                  <span>Manage Users</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-1 ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/leave-balance" 
                  className={`flex items-center gap-1 ${isActive("/leave-balance") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Leave Balance</span>
                </Link>
                <Link 
                  to="/calendar" 
                  className={`flex items-center gap-1 ${isActive("/calendar") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="mr-2">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="hidden md:inline-block">{user?.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
