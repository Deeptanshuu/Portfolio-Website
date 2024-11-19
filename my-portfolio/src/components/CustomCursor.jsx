import { useEffect, useState } from 'react'

// Regular HTML cursor component
export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    if (isMobile) return

    const updatePosition = (e) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const updateCursorType = () => {
      const hoveredElements = document.querySelectorAll(':hover')
      setIsHovered(Array.from(hoveredElements).some(el => 
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

  if (isMobile) return null

  return (
    <div 
      className="cursor-container"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <svg 
        className="cursor-circle" 
        width="70" 
        height="70" 
        viewBox="0 0 70 70"
      >
        {/* Crosshair */}
        <line 
          x1="35" y1="25" x2="35" y2="45" 
          stroke={isHovered ? "#ff3e3e" : "white"} 
          strokeWidth="1"
        />
        <line 
          x1="25" y1="35" x2="45" y2="35" 
          stroke={isHovered ? "#ff3e3e" : "white"} 
          strokeWidth="1"
        />
      </svg>
    </div>
  )
} 