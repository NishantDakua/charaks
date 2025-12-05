"use client"
import { Download, Smartphone, Shield, Clock, Star, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  { icon: CheckCircle2, text: "Free to download and use" },
  { icon: CheckCircle2, text: "Instant OTP-based signup" },
  { icon: CheckCircle2, text: "Verified doctors only" },
  { icon: CheckCircle2, text: "24/7 availability" },
  { icon: CheckCircle2, text: "Secure payments" },
  { icon: CheckCircle2, text: "Digital prescriptions" },
]

export default function DownloadSection() {
  return (
    <section id="download" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 40%),
                           radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 40%),
                           radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-white animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Smartphone size={16} />
              <span className="text-sm font-semibold">Available on Android & iOS</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Download <span className="text-accent">Charak</span> Today
            </h2>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join thousands of users already experiencing healthcare the modern way. 
              Get instant access to verified doctors, anytime, anywhere.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <benefit.icon size={14} className="text-accent" />
                  </div>
                  <span className="text-sm text-white/90">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/app-release.apk" 
                download="Charak-App.apk"
                className="inline-block"
              >
                <Button 
                  size="lg"
                  className="w-full gap-3 bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 rounded-2xl shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Download size={22} />
                  Download APK (Android)
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button 
                size="lg"
                variant="outline"
                className="gap-3 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-2xl transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                Coming to iOS
              </Button>
            </div>

            {/* Installation Note */}
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-sm text-white/80 text-center">
                <strong>📱 Installation Note:</strong> After downloading, you may need to enable "Install from unknown sources" in your Android settings to install the APK file.
              </p>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-white/70">Trusted by 10,000+ users</p>
              </div>
            </div>
          </div>

          {/* Right Content - QR & Phone */}
          <div className="relative animate-slideInFromRight">
            {/* Phone Mockup */}
            <div className="relative mx-auto max-w-sm">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-accent/20 rounded-[3rem] blur-3xl" />
              
              {/* Phone Frame */}
              <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-[2.5rem] border border-white/20">
                <div className="bg-black rounded-[2rem] p-2 overflow-hidden">
                  {/* Screen */}
                  <div className="relative rounded-[1.5rem] overflow-hidden">
                    <img
                      src="/mobile-app-interface-dashboard-with-doctor-profile.jpg"
                      alt="Charak App Interface"
                      className="w-full aspect-[9/16] object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-4 shadow-2xl animate-float-slow hidden lg:block">
                <p className="text-xs font-semibold text-foreground mb-2 text-center">Scan to Download</p>
                <img 
                  src="/qr-code-app-download.jpg" 
                  alt="QR Code" 
                  className="w-28 h-28 rounded-lg"
                />
              </div>

              {/* Stats Card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">24/7</p>
                    <p className="text-xs text-muted-foreground">Always Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
