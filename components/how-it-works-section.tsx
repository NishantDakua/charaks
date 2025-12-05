"use client"
import { Smartphone, UserCheck, Video, FileCheck, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Quick Sign Up",
    description: "Secure OTP-based registration. Get started in under 60 seconds with just your phone number.",
    color: "from-primary to-primary/80",
    delay: 0,
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Match with Doctor",
    description: "Our smart algorithm instantly connects you with available verified doctors based on your needs.",
    color: "from-accent to-accent/80",
    delay: 100,
  },
  {
    number: "03",
    icon: Video,
    title: "Video Consultation",
    description: "HD video calls with real-time chat. Junior doctors can escalate to seniors for complex cases.",
    color: "from-primary to-primary/80",
    delay: 200,
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Get Reports & Pay",
    description: "Receive digital prescriptions and medical reports instantly. Secure, transparent payments.",
    color: "from-accent to-accent/80",
    delay: 300,
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
            <span className="text-sm font-semibold text-primary">Simple Process</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            How <span className="text-primary">Charak</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get quality healthcare in just 4 simple steps. Fast, secure, and hassle-free.
          </p>
          <div className="divider-premium mt-8" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-fadeInUp group"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5">
                  <div className="h-full bg-gradient-to-r from-primary/30 to-accent/30 rounded-full" />
                  <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              )}

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 border border-gray-100 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-gray-100 to-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                  <span className="text-xl font-bold text-primary">{step.number}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="text-white" size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fadeInUp">
          <p className="text-muted-foreground mb-6">
            Ready to experience healthcare the modern way?
          </p>
          <a 
            href="/app-release.apk" 
            download="Charak-App.apk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 group"
          >
            Get Started Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
