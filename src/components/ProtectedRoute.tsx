
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isAdmin, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    // You could show a loading spinner here
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to dashboard if not admin but admin access is required
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
