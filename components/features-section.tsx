"use client"
import { Clock, Users, Video, FileText, Wallet, FolderOpen, Stethoscope, Heart, MessageSquare, Bell } from "lucide-react"

const doctorFeatures = [
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Set your own availability with our intuitive toggle system",
  },
  {
    icon: Users,
    title: "Senior Support",
    description: "Request expert assistance during complex consultations",
  },
  {
    icon: Wallet,
    title: "Instant Payouts",
    description: "Track earnings and withdraw anytime, transparently",
  },
  {
    icon: FileText,
    title: "Smart Reports",
    description: "Create professional prescriptions with templates",
  },
  {
    icon: FolderOpen,
    title: "Patient History",
    description: "Access complete patient records before calls",
  },
  {
    icon: Video,
    title: "HD Video Calls",
    description: "Crystal clear consultations with screen sharing",
  },
]

const patientFeatures = [
  {
    icon: Stethoscope,
    title: "Verified Doctors",
    description: "All doctors thoroughly vetted and certified",
  },
  {
    icon: MessageSquare,
    title: "Chat & Video",
    description: "Choose your preferred consultation mode",
  },
  {
    icon: Heart,
    title: "Health Records",
    description: "All your medical history in one place",
  },
  {
    icon: Bell,
    title: "Reminders",
    description: "Never miss medications or follow-ups",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <span className="text-sm font-semibold text-accent">Powerful Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Built for <span className="text-accent">Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed for both healthcare professionals and patients
          </p>
          <div className="divider-premium mt-8" />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* For Doctors */}
          <div className="animate-fadeInUp">
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl shadow-primary/5 h-full">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">For Doctors</h3>
                  <p className="text-muted-foreground">Practice medicine on your terms</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctorFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="group p-4 rounded-2xl bg-gray-50/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{feature.title}</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Doctor Types */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm font-medium text-muted-foreground mb-4">Join as:</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">J</span>
                    </div>
                    <span className="text-sm font-medium text-primary">Junior Doctor</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <span className="text-sm font-medium text-accent">Senior Doctor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* For Patients */}
          <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl shadow-accent/5 h-full">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">🏥</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">For Patients</h3>
                  <p className="text-muted-foreground">Healthcare at your fingertips</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {patientFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="group p-4 rounded-2xl bg-gray-50/50 hover:bg-accent/5 border border-transparent hover:border-accent/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="text-accent" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{feature.title}</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* App Preview */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Charak App" 
                      className="w-12 h-12 rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">Download Charak</p>
                    <p className="text-sm text-muted-foreground">Available on Android & iOS</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-accent text-sm">★</span>
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
                    </div>
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
