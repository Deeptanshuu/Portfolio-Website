/* eslint-disable react/no-unescaped-entities */
import { AnimatedText } from '../AnimatedText'
import { useState, useEffect } from 'react'

export function Hero() {
  return (
    <section id="home" className="h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Time Display */}
      <Clock />
      
      {/* Animated lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-8 sm:left-32 md:left-48 lg:left-64 top-0 w-px h-full 
          bg-gradient-to-b from-transparent via-white to-transparent" />
        
        <div className="absolute bottom-1/3 sm:bottom-1/4 left-0 h-px w-full 
          bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      
      <div className="max-w-screen-xl w-full mx-auto relative">
        <div className="space-y-3 sm:space-y-5 p-10 md:p-0">
          <div>
            <h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl 
              font-thin tracking-tighter overflow-hidden leading-tight">
              <AnimatedText delay={0.2}>
                Hi I'm<br className="sm:hidden" /> Deeptanshu,
              </AnimatedText>
            </h1>
            
            <RolesList />
          </div>

          <Description />
        </div>
      </div>
    </section>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    })
  }

  return (
    <div className="absolute top-32 left-8 sm:left-32 md:left-48 lg:left-64">
      <AnimatedText delay={1} className="text-white/80 text-xl font-light tracking-relaxed">
        <div className="flex flex-col gap-4">
          <span className="text-white/40 px-2">It's</span>
          <span>{formatTime(time)}</span>
          <span className="text-white/40 px-1">for me (IST)</span>
        </div>
      </AnimatedText>
    </div>
  )
}

function RolesList() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center 
      gap-2 sm:gap-6 mt-3 sm:mt-6 
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
      overflow-hidden">
      <AnimatedText delay={0.4}>
        <span className="font-normal text-white font-mono">Developer</span>
      </AnimatedText>
      
      <span className="hidden sm:block text-white/40">|</span>
      
      <AnimatedText delay={0.6}>
        <span className="text-white cursive">
          Designer
        </span>
      </AnimatedText>
      
      <span className="hidden sm:block text-white/40">|</span>
      
      <AnimatedText delay={0.8}>
        <span className="text-white/60 font-light font-serif">
          Creator
        </span>
      </AnimatedText>
    </div>
  )
}

function Description() {
  return (
    <div className="overflow-hidden cursive max-w-[90%] sm:max-w-2xl">
      <AnimatedText delay={0.8} className="
        text-transparent bg-clip-text bg-gradient-to-r 
        from-white/60 to-white/40
        text-base sm:text-lg md:text-xl lg:text-2xl 
        font-light tracking-wide
        leading-relaxed
      ">
        I love everything computers and tech.
      </AnimatedText>
    </div>
  )
} 