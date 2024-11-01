import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { AnimatedText } from '../AnimatedText'

export function Logo() {
  const logoRef = useRef(null)
  const circleRef = useRef(null)
  const squareRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Only animate the decorative elements
      tl.to(circleRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      }, 0);

      tl.to(squareRef.current, {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none"
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative scale-75 sm:scale-100">
      {/* Decorative Elements */}
      <div 
        ref={circleRef}
        className="absolute -z-10 w-24 sm:w-32 h-24 sm:h-32 border border-white/10 rounded-full"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={squareRef}
        className="absolute -z-10 w-20 sm:w-24 h-20 sm:h-24 border border-white/5"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' }}
      />
      
      {/* Logo Text */}
      <div className="relative">
        <AnimatedText delay={1}>
          <span 
            ref={logoRef}
            className="text-4xl sm:text-6xl font-bold block text-center"
            style={{ 
              color: '#4fc1ff',
              textShadow: '0 0 20px rgba(79, 193, 255, 0.3)',
              willChange: 'transform',
              WebkitFontSmoothing: 'antialiased',
              transform: 'translateZ(0)'
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