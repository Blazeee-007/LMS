import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, ClipboardList } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "student@college.edu" && password === "password") {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9b87f5] to-[#7E69AB]">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-2xl shadow-2xl transform transition-all">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <ClipboardList className="h-12 w-12 text-[#9b87f5]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1A1F2C]">Welcome Back</h2>
          <p className="text-sm text-gray-600">Sign in to your student account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="College Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#9b87f5] focus:ring-[#9b87f5]"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#9b87f5] focus:ring-[#9b87f5]"
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 transition-opacity"
          >
            Sign in
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: student@college.edu / password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;