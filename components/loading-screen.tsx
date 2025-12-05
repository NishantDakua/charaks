"use client"
import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsExiting(true)
          setTimeout(onLoadingComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #115E59 100%)',
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo Container */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl scale-150 animate-pulse" />
          
          {/* Logo Ring Animation */}
          <div className="absolute -inset-4 border-2 border-white/20 rounded-full animate-spin-slow" />
          <div className="absolute -inset-8 border border-white/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
          
          {/* Logo */}
          <div className="relative p-2 bg-white/10 backdrop-blur-sm rounded-full">
            <img 
              src="/logo.png" 
              alt="Charak Logo" 
              width={100} 
              height={100} 
              className="rounded-full shadow-2xl animate-float-slow"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Charak
          </h1>
          <p className="text-white/70 text-sm md:text-base tracking-widest uppercase">
            Healthcare Reimagined
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 space-y-3">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-white/60">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-white/50 text-xs tracking-wider animate-pulse">
          Preparing your healthcare experience
        </p>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}
