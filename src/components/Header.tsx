
import { ClipboardList, LogOut, Home, ArrowLeft, UserRound } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent"
                onClick={() => navigate("/")}
                title="Back to Home"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-8 w-8 text-primary animate-pulse" />
              <div>
                <h1 className="text-xl font-bold tracking-tight">Student Leave Portal</h1>
                <p className="text-sm text-muted-foreground">Leave Application System</p>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Button
                  variant="ghost"
                  className="hover:bg-accent font-medium"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="hover:bg-accent font-medium"
                  onClick={() => navigate("/")}
                >
                  New Application
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="hover:bg-accent font-medium"
                  onClick={() => navigate("/profile")}
                >
                  <UserRound className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </li>
            </ul>
            <Button
              variant="secondary"
              className="flex items-center gap-2 hover:bg-accent transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {/* Add mobile menu handler */}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};
