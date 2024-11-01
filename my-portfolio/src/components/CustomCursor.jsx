import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Initial check
    checkMobile()

    // Skip cursor setup for mobile devices
    if (isMobile) return

    const updatePosition = (e) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const updateCursorType = () => {
      const hoveredElements = document.querySelectorAll(':hover')
      setIsPointer(Array.from(hoveredElements).some(el => 
        getComputedStyle(el).cursor === 'pointer'
      ))
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateCursorType)
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateCursorType)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  // Don't render cursor on mobile
  if (isMobile) return null

  return (
    <>
      <div 
        className="cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div 
        className={`cursor-ring ${isPointer ? 'cursor-pointer' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </>
  )
} 