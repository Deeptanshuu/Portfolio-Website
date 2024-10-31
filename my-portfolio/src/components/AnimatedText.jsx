/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'

export function AnimatedText({ children, className = '', delay = 0 }) {
  const textRef = useRef(null)

  useEffect(() => {
    // Split text into characters
    const text = new SplitType(textRef.current, { types: 'chars' })
    const chars = text.chars

    // Initial state
    gsap.set(chars, {
      y: 100,
      opacity: 0
    })

    // Animation
    gsap.to(chars, {
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power4.out',
      delay: delay
    })
  }, [delay])

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  )
} 