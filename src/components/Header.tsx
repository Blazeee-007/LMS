import { ClipboardList, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-primary py-4 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-8 w-8 text-white" />
          <div className="text-white">
            <h1 className="text-2xl font-bold">Student Leave Portal</h1>
            <p className="text-sm opacity-90">Emergency Leave Application System</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Button
                  variant="ghost"
                  className="text-white hover:text-accent"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white hover:text-accent"
                  onClick={() => navigate("/")}
                >
                  New Application
                </Button>
              </li>
            </ul>
          </nav>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};