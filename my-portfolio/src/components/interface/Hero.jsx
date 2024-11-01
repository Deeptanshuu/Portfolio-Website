/* eslint-disable react/no-unescaped-entities */
import { AnimatedText } from '../AnimatedText'
import { useState, useEffect } from 'react'
import { Logo } from './Logo'

export function Hero() {
  return (
    <section id="home" className="h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-16 left-[4rem]">
        <Logo />
      </div>

      {/* Time Display */}
      <Clock />
      
      {/* Animated lines with plus sign - increased opacity to 60% */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-8 sm:left-32 md:left-48 lg:left-64 top-0 w-px h-full 
          bg-gradient-to-b from-transparent via-white to-transparent" />
        
        <div className="absolute bottom-1/3 sm:bottom-1/4 left-0 h-px w-full 
          bg-gradient-to-r from-transparent via-white to-transparent" />
          
        {/* Plus sign at intersection*/}
        <div className="absolute left-8 sm:left-32 md:left-48 lg:left-64 bottom-1/3 sm:bottom-1/4
          w-6 h-6 -translate-x-[12px] -translate-y-[-10px]">
          <span className="absolute w-6 h-[2px] bg-white top-1/2 -translate-y-[1px]"></span>
          <span className="absolute h-6 w-[2px] bg-white left-1/2 -translate-x-[1px]"></span>
        </div>
      </div>
      
      <div className="max-w-screen-xl w-full mx-auto relative">
        <div className="space-y-3 sm:space-y-5 md:p-0">
          <div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl 
              font-normal tracking-tighter overflow-hidden leading-tight">
              <AnimatedText delay={0.2}>
                <span
                  className="block"
                  style={{ 
                    background: 'linear-gradient(to right, #ffffff 20%, #4fc1ff 50%, #ffffff 80%)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 0%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255,255,255,0.1)',
                    animation: 'gradient 3s linear infinite'
                  }}
                >
                  Hi I'm<br className="sm:hidden" /> Deeptanshu,
                </span>
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
      overflow-visible">
      <AnimatedText delay={0.4}>
        <span className="font-normal text-white">Developer</span>
      </AnimatedText>
      
      <span className="hidden sm:block text-white/40">|</span>
      
      <AnimatedText delay={0.6}>
        <span className="text-white font-medium cursive">
          Designer
        </span>
      </AnimatedText>
      
      <span className="hidden sm:block text-white/40">|</span>
      
      <AnimatedText delay={0.8}>
        <span className="text-white/80 font-light">
          Creator
        </span>
      </AnimatedText>
    </div>
  )
}

function Description() {
  return (
    <div className="overflow-hidden max-w-[90%] sm:max-w-2xl">
      <AnimatedText delay={0.8} className="
        text-transparent bg-clip-text bg-white/100
        text-base sm:text-lg md:text-xl lg:text-2xl 
        font-light tracking-wide
        leading-relaxed
      ">
        I love everything computers and tech.
      </AnimatedText>
    </div>
  )
} 