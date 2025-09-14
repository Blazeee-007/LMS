
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  allowedRoles?: ("admin" | "faculty")[];
}

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false,
  allowedRoles = []
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

  // Check if the user has one of the allowed roles
  if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user.role)) {
    // Redirect based on user role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "faculty") {
      return <Navigate to="/faculty-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
