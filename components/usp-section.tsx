"use client"
import { Users2, Zap, Wallet, ShieldCheck, TrendingUp, Clock } from "lucide-react"

const usps = [
  {
    icon: Users2,
    title: "2-Tier Doctor System",
    description: "Unique hierarchical model where junior doctors handle consultations with instant senior doctor escalation for complex cases. Best of both worlds.",
    highlight: "Collaborative Care",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description: "Our AI-powered algorithm connects patients with the right available doctor in real-time. No waiting, no scheduling hassles.",
    highlight: "Under 60 Seconds",
    color: "accent",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "Clear fee structure with instant payouts to doctors. Real-time earnings tracking and secure payment gateway.",
    highlight: "Fair & Clear",
    color: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "Rigorous verification process for all doctors. Licenses, degrees, and credentials thoroughly checked by our admin team.",
    highlight: "100% Trust",
    color: "accent",
  },
]

const stats = [
  { value: "24/7", label: "Available", icon: Clock },
  { value: "100%", label: "Verified", icon: ShieldCheck },
  { value: "60s", label: "Avg. Match Time", icon: Zap },
  { value: "4.9★", label: "User Rating", icon: TrendingUp },
]

export default function USPSection() {
  return (
    <section id="doctors" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/10 shadow-lg mb-6">
            <span className="text-sm font-semibold text-primary">Why Choose Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            What Makes <span className="text-primary">Charak</span> Different?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary features that set us apart from traditional healthcare platforms
          </p>
          <div className="divider-premium mt-8" />
        </div>

        {/* USP Cards - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="group relative animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${usp.color === 'primary' ? 'from-primary/10' : 'from-accent/10'} to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />

                {/* Highlight Badge */}
                <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-bold ${
                  usp.color === 'primary' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-accent/10 text-accent'
                }`}>
                  {usp.highlight}
                </div>

                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  usp.color === 'primary' 
                    ? 'from-primary to-primary/80' 
                    : 'from-accent to-accent/80'
                } flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <usp.icon className="text-white" size={28} />
                </div>

                {/* Content */}
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {usp.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {usp.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="animate-fadeInUp">
          <div className="relative bg-gradient-to-r from-primary via-primary/95 to-primary rounded-3xl p-8 lg:p-12 overflow-hidden shadow-2xl shadow-primary/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
              }} />
            </div>

            {/* Content */}
            <div className="relative">
              <div className="text-center mb-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Trusted by Thousands
                </h3>
                <p className="text-white/70">
                  Join the healthcare revolution today
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <p className="text-3xl lg:text-4xl font-bold text-white mb-1 stat-number">
                      {stat.value}
                    </p>
                    <p className="text-white/70 text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
