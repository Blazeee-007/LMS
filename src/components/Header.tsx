import { ClipboardList, LogOut, Home, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const isHomePage = location.pathname === "/";

  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 py-4 shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-primary/20"
                onClick={() => navigate("/")}
                title="Back to Home"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-8 w-8 text-white animate-pulse" />
              <div className="text-white">
                <h1 className="text-2xl font-bold tracking-tight">Student Leave Portal</h1>
                <p className="text-sm opacity-90 font-medium">Emergency Leave Application System</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-primary/20 font-medium"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-primary/20 font-medium"
                    onClick={() => navigate("/")}
                  >
                    New Application
                  </Button>
                </li>
              </ul>
            </nav>
            <Button
              variant="secondary"
              className="flex items-center gap-2 hover:bg-white/90 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};