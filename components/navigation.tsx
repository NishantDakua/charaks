"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, ChevronRight, LogOut, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { removeAuthToken } from "@/lib/api"
import { isAuthenticated } from "@/lib/auth-utils"

interface NavigationProps {
  isScrolled: boolean
}

export default function Navigation({ isScrolled }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status on mount and when it changes
    setIsLoggedIn(isAuthenticated())
  }, [])

  const handleLogout = () => {
    removeAuthToken()
    setIsLoggedIn(false)
    router.push("/login")
  }

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it Works" },
    { href: "#doctors", label: "For Doctors" },
    { href: "#download", label: "Download" },
  ]

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-1.5 bg-gradient-to-br from-primary/10 via-white to-accent/10 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="Charak Logo" 
                    width={52} 
                    height={52} 
                    className="object-contain rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-primary tracking-tight">Charak</span>
                <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase hidden sm:block">Healthcare Platform</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <a href="/admin">
                    <Button 
                      variant="ghost" 
                      className="font-semibold text-primary hover:text-primary/80 hover:bg-primary/5"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </a>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="font-semibold text-destructive hover:bg-destructive/10 border-destructive/30"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <a href="/login">
                    <Button 
                      variant="ghost" 
                      className="font-semibold text-primary hover:text-primary/80 hover:bg-primary/5"
                    >
                      Login
                    </Button>
                  </a>
                  <a href="/signup" className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
                    <Button 
                      className="relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Get Started
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-2xl transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 rounded-xl text-foreground font-medium hover:bg-primary/5 hover:text-primary transition-all"
              >
                {link.label}
              </a>
            ))}
            {isLoggedIn ? (
              <div className="flex flex-col gap-3 mt-4">
                <a
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </a>
                <Button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <a
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </a>
                <a
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 rounded-xl">
                    Get Started
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}