
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student" | "faculty";
  studentId?: string;
  department?: string;
  facultyId?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isFaculty: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - in a real app, this would be an API call
      if (email === "student@college.edu" && password === "password") {
        const userData: User = {
          id: "u1",
          name: "Sai Sasank Vanapalli",
          email: "saisasank@gmail.com",
          role: "student",
          studentId: "233B1a05C1",
          department: "Computer Science"
        };
        
        // Store user in localStorage and context
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        
        toast({
          title: "Login Successful",
          description: "Welcome back, " + userData.name,
        });
        
        navigate("/dashboard");
      } else if (email === "admin@college.edu" && password === "admin") {
        const adminData: User = {
          id: "a1",
          name: "Admin User",
          email: "admin@college.edu",
          role: "admin"
        };
        
        localStorage.setItem("user", JSON.stringify(adminData));
        setUser(adminData);
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome back, Administrator",
        });
        
        navigate("/admin");
      } else if (email === "faculty@college.edu" && password === "faculty") {
        const facultyData: User = {
          id: "f1",
          name: "Dr. John Smith",
          email: "faculty@college.edu",
          role: "faculty",
          facultyId: "FAC001",
          department: "Computer Science"
        };
        
        localStorage.setItem("user", JSON.stringify(facultyData));
        setUser(facultyData);
        
        toast({
          title: "Faculty Login Successful",
          description: "Welcome back, " + facultyData.name,
        });
        
        navigate("/faculty-dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isFaculty = user?.role === "faculty";

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      isAuthenticated,
      isAdmin,
      isFaculty
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
