/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'

export function AnimatedText({ children, className = '', delay = 0 }) {
  const textRef = useRef(null)

  useEffect(() => {
    // Skip animation on mobile devices for better performance
    if (window.innerWidth < 1024) {
      return;
    }
    
    // Split text into words instead of characters for better text flow
    const text = new SplitType(textRef.current, { 
      types: 'words',
      tagName: 'span'
    })
    
    const words = text.words

    // Initial state
    gsap.set(words, {
      y: 30, // Reduced movement for subtler effect
      opacity: 0
    })

    // Animation
    gsap.to(words, {
      y: 0,
      opacity: 1,
      stagger: 0.03, // Slightly increased for word-by-word animation
      duration: 0.5,
      ease: 'power3.out',
      delay: delay
    })
  }, [delay])

  return (
    <span ref={textRef} className={className} style={{ display: 'inline-block', width: '100%' }}>
      {children}
    </span>
  )
}