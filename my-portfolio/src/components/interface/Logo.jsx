import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { AnimatedText } from '../AnimatedText'

export function Logo() {
  const logoRef = useRef(null)
  const circleRef = useRef(null)
  const squareRef = useRef(null)

  useEffect(() => {
    // Animate the gradient background
    gsap.to(logoRef.current, {
      duration: 3,
      backgroundPosition: '200% center',
      repeat: -1,
      ease: "none"
    })

    // Animate the circle
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    })

    // Animate the square
    gsap.to(squareRef.current, {
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: "none"
    })
  }, [])

  return (
    <div className="relative">
      {/* Decorative Elements */}
      <div 
        ref={circleRef}
        className="absolute -z-10 w-32 h-32 border border-white/10 rounded-full"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={squareRef}
        className="absolute -z-10 w-24 h-24 border border-white/5"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' }}
      />
      
      {/* Logo Text */}
      <div className="relative">
        <AnimatedText delay={1}>
          <span 
            ref={logoRef}
            className="text-6xl font-bold relative z-10 block"
            style={{ 
              background: 'linear-gradient(90deg, #fff, #4fc1ff, #fff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          >
            DL
          </span>
        </AnimatedText>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 blur-xl bg-white/5 -z-10" />
      </div>
    </div>
  )
} 