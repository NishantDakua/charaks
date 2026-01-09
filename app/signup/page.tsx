"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      console.log("Signup attempt:", formData);
      setIsLoading(false);
    }, 1000);
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return 0;
    if (password.length < 6) return 25;
    if (password.length < 8) return 50;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 100;
    return 75;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 50) return "bg-red-400";
    if (strength < 75) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 p-4">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45MSAwLTE4IDguMDktMTggMThzOC4wOSAxOCAxOCAxOGgxOHYtMThjMC05LjkxLTguMDktMTgtMTgtMTh6IiBzdHJva2U9IiNlYWVhZmEiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-20 dark:opacity-10"></div>
      
      {/* Soft Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-30 dark:opacity-10 dark:bg-blue-900/30"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply blur-3xl opacity-30 dark:opacity-10 dark:bg-cyan-900/30"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-50 rounded-full mix-blend-multiply blur-3xl opacity-20 dark:opacity-5 dark:bg-emerald-900/20"></div>
      </div>

      <Card className="w-full max-w-md relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-200/20 dark:shadow-gray-800/20">
        {/* Subtle Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50 dark:from-transparent dark:via-gray-900/30 dark:to-transparent rounded-lg -z-10"></div>
        
        <CardHeader className="space-y-4 text-center relative">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-lg"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full shadow-lg shadow-blue-500/20">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Join our community today
            </CardDescription>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </Label>
              </div>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                </div>
                {formData.password && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${passwordStrength() === 100 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : passwordStrength() >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {passwordStrength() === 100 ? 'Strong' : passwordStrength() >= 50 ? 'Medium' : 'Weak'}
                  </span>
                )}
              </div>
              <div className="relative flex">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 rounded-r-none border-r-0 pr-12"
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
              {formData.password && (
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPasswordStrengthColor(passwordStrength())} transition-all duration-300`}
                    style={{ width: `${passwordStrength()}%` }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </Label>
              </div>
              <div className="relative flex">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 rounded-r-none border-r-0 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="bg-white/50 dark:bg-gray-800/50 border border-l-0 border-gray-300 dark:border-gray-600 rounded-l-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Check className="h-4 w-4" />
                  <span>Passwords match</span>
                </div>
              )}
            </div>
            
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                disabled={isLoading}
                className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  privacy policy
                </Link>
              </label>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Your data is protected with enterprise-grade security</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-6 pt-6">
            <Button 
              type="submit" 
              className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50 dark:border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 dark:bg-gray-900/80 px-3 text-gray-500 dark:text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>
            
            <Link 
              href="/login" 
              className="w-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-300/50 dark:border-gray-600/50 rounded-lg p-3 text-center font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:shadow-md transition-all duration-300"
            >
              Sign In to Your Account
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}