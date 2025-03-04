
import { ClipboardList, LogOut, Home, ArrowLeft, UserRound, BarChart3, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/login");
  };

  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname === "/dashboard";
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-4 w-4 mr-2" />,
      show: true
    },
    {
      title: "New Application",
      path: "/",
      icon: <ClipboardList className="h-4 w-4 mr-2" />,
      show: true
    },
    {
      title: "Leave Balance",
      path: "/leave-balance",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      show: isDashboardPage
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <UserRound className="h-4 w-4 mr-2" />,
      show: true
    }
  ];

  const filteredNavItems = navItems.filter(item => item.show);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6">
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
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <ClipboardList className="h-8 w-8 text-primary animate-pulse" />
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight">Student Leave Portal</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Leave Application System</p>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-2">
              {filteredNavItems.map((item) => (
                <li key={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`hover:bg-accent flex items-center ${isActive(item.path) ? "" : "font-medium"}`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              variant="secondary"
              className="flex items-center gap-2 hover:bg-accent transition-colors ml-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t bg-background"
          >
            <div className="container px-4 py-4">
              <ul className="flex flex-col space-y-3">
                {filteredNavItems.map((item) => (
                  <li key={item.path} className="w-full">
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start hover:bg-accent ${isActive(item.path) ? "" : "font-medium"}`}
                      onClick={() => navigate(item.path)}
                    >
                      {item.icon}
                      {item.title}
                    </Button>
                  </li>
                ))}
                <li className="pt-2 border-t">
                  <Button
                    variant="secondary"
                    className="w-full justify-start flex items-center gap-2 hover:bg-accent transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
