
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleGoogleSignIn = () => {
    // This would be implemented with Supabase or another auth provider
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E5DEFF] to-[#D3E4FD]">
      <div className="w-full max-w-md space-y-8 p-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] animate-fadeIn">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <ClipboardList className="h-12 w-12 text-[#6E59A5] animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-sm text-[#8E9196] font-medium">
            Sign in to your student account
          </p>
        </div>

        <div className="space-y-6">
          <Button 
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 flex items-center justify-center gap-2 py-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#8E9196] font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="College Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#6E59A5] focus:ring-[#6E59A5] transition-all"
                  required
                />
              </div>
              <div className="relative group">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#6E59A5] focus:ring-[#6E59A5] transition-all"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#6E59A5]/20"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center">
              <p className="text-sm text-[#8E9196]">
                Student Demo: student@college.edu / password
              </p>
              <p className="text-sm text-[#8E9196]">
                Admin Demo: admin@college.edu / admin
              </p>
              <p className="text-sm text-[#8E9196]">
                Faculty Demo: faculty@college.edu / faculty
              </p>
              <p className="text-sm text-[#8E9196]">
                Faculty 2 Demo: prof@college.edu / professor
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
