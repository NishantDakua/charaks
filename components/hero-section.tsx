"use client"
import { Button } from "@/components/ui/button"
import { Download, Play, Star, Shield, Clock, ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-hero -z-20" />
      
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 gradient-mesh -z-10" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-32 right-[10%] w-96 h-96 bg-linear-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-float opacity-60" />
      <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-linear-to-br from-accent/20 to-accent/5 rounded-full blur-3xl animate-float-slow opacity-50" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-linear-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse opacity-40" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.015] -z-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="animate-fadeInUp space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg shadow-primary/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-primary">On-Demand Healthcare Platform</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-foreground">Healthcare at</span>
                <br />
                <span className="text-primary">Your Fingertips</span>
              </h1>
              <div className="h-1.5 w-24 bg-linear-to-r from-primary to-accent rounded-full" />
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Connect instantly with verified doctors through our revolutionary 
              <span className="text-primary font-semibold"> 2-tier system</span>. 
              Junior doctors provide immediate care, with senior experts available for complex cases.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/app-release.apk" download="Charak-App.apk" className="group">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto gap-3 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold px-8 py-6 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Download size={20} />
                  Download Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto gap-3 bg-white/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 hover:bg-white/80 text-foreground font-semibold px-8 py-6 rounded-2xl transition-all duration-300"
              >
                <Play size={20} className="text-primary" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Shield size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Verified Doctors</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">4.9★</p>
                  <p className="text-xs text-muted-foreground">User Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative animate-slideInFromRight">
            {/* Glow Effect Behind Phone */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-accent/20 to-primary/30 rounded-[3rem] blur-3xl opacity-40 animate-pulse" />
            
            {/* Phone Frame */}
            <div className="relative mx-auto w-full max-w-md">
              {/* Decorative Ring */}
              <div className="absolute -inset-4 bg-linear-to-br from-primary/20 via-transparent to-accent/20 rounded-[3rem] animate-spin-slow opacity-50" />
              
              {/* Main Phone Container */}
              <div className="relative bg-linear-to-br from-white to-gray-50 p-3 rounded-[2.5rem] shadow-2xl shadow-primary/20">
                {/* Inner Phone Frame */}
                <div className="relative bg-black rounded-4xl p-1.5 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                  
                  {/* Screen Content */}
                  <div className="relative rounded-3xl overflow-hidden">
                    <img
                      src="/doctor-using-medical-app-consultation-interface.jpg"
                      alt="Charak App Interface"
                      className="w-full aspect-9/16 object-cover"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent" />
                    
                    {/* Floating UI Elements */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Dr</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">Dr. Available Now</p>
                          <p className="text-xs text-muted-foreground">Ready for consultation</p>
                        </div>
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center animate-pulse">
                          <Play size={16} className="text-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-primary/10 animate-float-slow hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Verified</p>
                    <p className="text-[10px] text-muted-foreground">All Doctors</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-accent/10 animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Star size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Instant</p>
                    <p className="text-[10px] text-muted-foreground">Connection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
    </section>
  )
}
