"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import HowItWorksSection from "@/components/how-it-works-section"
import USPSection from "@/components/usp-section"
import FeaturesSection from "@/components/features-section"
import DownloadSection from "@/components/download-section"
import Navigation from "@/components/navigation"
import LoadingScreen from "@/components/loading-screen"
import { Mail, Phone, MapPin, ArrowUp, Heart } from "lucide-react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation isScrolled={isScrolled} />
      <HeroSection />
      <HowItWorksSection />
      <USPSection />
      <FeaturesSection />
      <DownloadSection />

      {/* Premium Footer */}
      <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full">
                    <img
                      src="/logo.png"
                      alt="Charak Logo"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-primary">Charak</h3>
                    <p className="text-xs text-muted-foreground tracking-wider uppercase">
                      Healthcare Platform
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                  Revolutionary on-demand healthcare platform connecting patients
                  with verified doctors through our unique 2-tier system.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-6">For Patients</h4>
                <ul className="space-y-4">
                  {["Features", "How it Works", "Download App"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-6">For Doctors</h4>
                <ul className="space-y-4">
                  {["Join as Junior", "Join as Senior", "Verification"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-6">Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <span className="text-sm text-muted-foreground">support@charak.health</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-accent" />
                    <span className="text-sm text-muted-foreground">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                © 2024 Charak. Made with <Heart size={14} className="text-red-500 fill-red-500" /> in India
              </p>
              <div className="flex gap-6">
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-50 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </main>
  )
}