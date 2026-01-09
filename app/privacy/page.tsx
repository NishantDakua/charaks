"use client"

import { ArrowLeft, Shield, Lock, Eye, Users, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const sections = [
  {
    id: "information-collection",
    icon: FileText,
    title: "Information We Collect",
    content: [
      "Personal Information: Name, email address, phone number, date of birth, and medical history when you create an account or use our services.",
      "Medical Data: Health records, consultation notes, prescriptions, and treatment history shared during doctor consultations.",
      "Device Information: Device type, operating system, browser information, and mobile device identifiers.",
      "Usage Data: How you interact with our platform, including pages visited, features used, and time spent on the app.",
      "Location Data: General location information to connect you with nearby healthcare providers (with your permission)."
    ]
  },
  {
    id: "information-use",
    icon: Users,
    title: "How We Use Your Information",
    content: [
      "Providing healthcare services and facilitating doctor-patient consultations",
      "Maintaining and improving our platform's functionality and user experience",
      "Sending important notifications about appointments, prescriptions, and health reminders",
      "Ensuring platform security and preventing fraud or unauthorized access",
      "Complying with legal requirements and healthcare regulations",
      "Analyzing usage patterns to enhance our services and develop new features"
    ]
  },
  {
    id: "information-sharing",
    icon: Shield,
    title: "Information Sharing",
    content: [
      "Healthcare Providers: Medical information is shared only with your chosen doctors to provide consultations and treatment.",
      "Service Providers: We work with trusted third-party services for payment processing, cloud storage, and communication tools.",
      "Legal Compliance: Information may be disclosed when required by law, court orders, or to protect public health and safety.",
      "Business Transfers: In case of merger, acquisition, or sale, user data may be transferred as part of business assets.",
      "We do not sell personal information to third parties for marketing purposes."
    ]
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    content: [
      "End-to-end encryption for all medical consultations and sensitive communications",
      "Secure cloud infrastructure with industry-standard security measures",
      "Regular security audits and vulnerability assessments",
      "Access controls ensuring only authorized personnel can access user data",
      "Secure payment processing through PCI-DSS compliant systems",
      "Data backup and recovery procedures to prevent data loss"
    ]
  },
  {
    id: "user-rights",
    icon: Eye,
    title: "Your Rights and Controls",
    content: [
      "Access: Request a copy of all personal data we have about you",
      "Correction: Update or correct inaccurate personal information",
      "Deletion: Request deletion of your account and associated data",
      "Portability: Export your medical records and consultation history",
      "Consent Withdrawal: Opt-out of non-essential communications and data processing",
      "Account Settings: Control privacy settings and data sharing preferences within the app"
    ]
  }
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Charak Logo" width={32} height={32} className="rounded-full" />
              <span className="font-bold text-lg text-primary">Charak</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Shield size={16} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Privacy & Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="h-1 w-20 bg-linear-to-r from-primary to-accent rounded-full mx-auto mt-6" />
        </div>

        {/* Last Updated */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <FileText size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-1">Last Updated: December 5, 2024</p>
              <p className="text-blue-700 text-sm">
                This privacy policy is effective immediately and applies to all users of the Charak platform.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Welcome to Charak</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Charak ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal and medical information. As a healthcare platform connecting patients with verified doctors, we understand the sensitive nature of health data and implement robust measures to safeguard your information.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our mobile application and related services. By using Charak, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              id={section.id}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${
                  index % 2 === 0 ? 'from-primary to-primary/80' : 'from-accent to-accent/80'
                } flex items-center justify-center shadow-lg`}>
                  <section.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{section.title}</h3>
                </div>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary/60 shrink-0 mt-2.5" />
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Retention */}
        <div className="bg-linear-to-r from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-10 border border-primary/20 my-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">Data Retention</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Account Data</h4>
              <p className="text-muted-foreground text-sm">
                We retain your account information as long as your account remains active or as needed to provide services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Medical Records</h4>
              <p className="text-muted-foreground text-sm">
                Medical data is retained for 7 years as required by healthcare regulations, or until you request deletion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Communication Logs</h4>
              <p className="text-muted-foreground text-sm">
                Chat and consultation records are kept for 3 years for quality assurance and legal compliance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Usage Analytics</h4>
              <p className="text-muted-foreground text-sm">
                Anonymized usage data may be retained indefinitely to improve our services and platform performance.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Questions About Privacy?</h3>
            <p className="text-muted-foreground">
              We're here to help. Contact us if you have any questions about this privacy policy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email Us</p>
                <a href="mailto:privacy@charak.health" className="text-primary hover:text-primary/80 transition-colors">
                  privacy@charak.health
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Data Protection Officer</p>
                <a href="mailto:dpo@charak.health" className="text-accent hover:text-accent/80 transition-colors">
                  dpo@charak.health
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-linear-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Note:</strong> Changes to this privacy policy will be posted on this page and users will be notified through the app. 
              Continued use of Charak after changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="gap-2 bg-linear-to-r from-primary to-primary/90 text-white"
          >
            Back to Top
            <ArrowLeft size={16} className="rotate-90" />
          </Button>
        </div>
      </div>
    </div>
  )
}