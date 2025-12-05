"use client"
import { Calendar, Users, Wallet } from "lucide-react"

const valueProps = [
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Manage your availability and work on your terms. Choose emergency or scheduled consultations.",
  },
  {
    icon: Users,
    title: "Dual Doctor System",
    description: "Collaborate with junior and senior doctors for comprehensive patient care and professional growth.",
  },
  {
    icon: Wallet,
    title: "Instant Payments",
    description: "Secure online payments with transparent commission structure. Track earnings in real-time.",
  },
]

export default function ValuePropSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why Choose Charak?</h2>
          <p className="text-xl text-muted-foreground">Designed by doctors, for doctors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-scaleIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <prop.icon className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
              <p className="text-muted-foreground">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
