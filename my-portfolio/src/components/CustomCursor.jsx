import { useEffect, useState } from 'react'

// Regular HTML cursor component
export function CustomCursor({ transition = 'transform 0.1s ease-out', size = 110 }) {
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

  const strokeColor = isHovered ? "#ff3e3e" : "white"
  const rotation = isHovered ? 'rotate(45deg)' : 'rotate(0deg)'

  return (
    <div 
      className="cursor-container"
      style={{
        transform: `translate(${position.x - size/2}px, ${position.y - size/2}px)`,
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: transition,
      }}
    >
      <svg 
        className="cursor-circle" 
        width={size} 
        height={size} 
        viewBox="0 0 70 70"
        style={{
          transform: rotation,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Crosshair */}
        <line 
          x1="35" y1="25" x2="35" y2="45" 
          stroke={strokeColor}
          strokeWidth="1"
        />
        <line 
          x1="25" y1="35" x2="45" y2="35" 
          stroke={strokeColor} 
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}