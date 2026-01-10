"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { authApi, setAuthToken } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authApi.login({ username, password });
      console.log('Frontend received response:', response);
      
      if (response.success) {
        // Handle both response structures: response.data or response directly
        const token = response.data?.token || response.token;
        const user = response.data || response.user;
        
        console.log('Full data object:', response.data);
        console.log('Extracted token:', token, 'user:', user);
        
        // Check if we have a valid JWT token
        if (token) {
          // Store the REAL JWT token from backend
          setAuthToken(token);
          
          // Store user data in localStorage
          if (user && typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          
          console.log('✅ JWT token stored successfully');
          
          toast({
            title: "Login Successful!",
            description: user && 'username' in user ? `Welcome back, ${user.username}!` : "Welcome back!",
          });
          
          // Redirect to admin dashboard
          setTimeout(() => {
            router.push("/admin");
          }, 1000);
        } else if (user && 'id' in user && user.id) {
          // FALLBACK: If no token but user exists (old backend behavior)
          if (typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setAuthToken('temp-token-' + user.id);
          }
          
          console.warn('⚠️ BACKEND WARNING: No JWT token returned. Using temporary auth.');
          
          toast({
            title: "Login Successful!",
            description: 'username' in user ? `Welcome back, ${user.username}!` : "Welcome back!",
          });
          
          setTimeout(() => {
            router.push("/admin");
          }, 1000);
        } else {
          console.error('Invalid response structure:', response);
          toast({
            title: "Login Failed",
            description: "Invalid server response. Check console for details.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Login Failed",
          description: response.message || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 p-4">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45MSAwLTE4IDguMDktMTggMThzOC4wOSAxOCAxOCAxOGgxOHYtMThjMC05LjkxLTguMDktMTgtMTgtMTh6IiBzdHJva2U9IiNlYWVhZmEiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-20 dark:opacity-10"></div>
      
      {/* Soft Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply blur-3xl opacity-30 dark:opacity-10 dark:bg-purple-900/30"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply blur-3xl opacity-30 dark:opacity-10 dark:bg-indigo-900/30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply blur-3xl opacity-20 dark:opacity-5 dark:bg-blue-900/20"></div>
      </div>

      <Card className="w-full max-w-md relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-200/20 dark:shadow-gray-800/20">
        {/* Subtle Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50 dark:from-transparent dark:via-gray-900/30 dark:to-transparent rounded-lg -z-10"></div>
        
        <CardHeader className="space-y-4 text-center relative">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-lg"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full shadow-lg shadow-purple-500/20">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Sign in to continue your journey
            </CardDescription>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                </div>
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 rounded-r-none border-r-0 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="bg-white/50 dark:bg-gray-800/50 border border-l-0 border-gray-300 dark:border-gray-600 rounded-l-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Secure & encrypted connection</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-6 pt-6">
            <Button 
              type="submit" 
              className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50 dark:border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 dark:bg-gray-900/80 px-3 text-gray-500 dark:text-gray-400">
                  New here?
                </span>
              </div>
            </div>
            
            <Link 
              href="/signup" 
              className="w-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-300/50 dark:border-gray-600/50 rounded-lg p-3 text-center font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:shadow-md transition-all duration-300"
            >
              Create an Account
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}