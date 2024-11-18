import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

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

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateCursorType)
    window.addEventListener('resize', checkMobile)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateCursorType)
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isMobile])

  if (isMobile) return null

  // Generate outline points for circle with halo effect
  const generateOutlinePoints = () => {
    const radius = 28
    const center = { x: 35, y: 35 }
    const points = []
    const numPoints = 128
    const glowRadius = 0.8

    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints
      points.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        radius: glowRadius
      })
    }

    return points
  }

  // Generate fill points for circle using a grid
  const generateFillPoints = () => {
    const center = { x: 35, y: 35 }
    const radius = 22
    const gridSize = 11
    const spacing = (radius * 2) / gridSize
    const points = []

    for (let x = -gridSize/2; x <= gridSize/2; x++) {
      for (let y = -gridSize/2; y <= gridSize/2; y++) {
        const px = center.x + x * spacing
        const py = center.y + y * spacing
        
        // Check if point is inside circle
        const dx = px - center.x
        const dy = py - center.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance <= radius) {
          points.push({ x: px, y: py })
        }
      }
    }

    return points
  }

  const outlinePoints = generateOutlinePoints()
  const fillPoints = generateFillPoints()

  return (
    <div 
      className={`cursor-container ${isClicked ? 'cursor-clicked' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isClicked ? 0.9 : 1})`
      }}
    >
      <div className={`cursor-ring ${isHovered ? 'hovered' : ''}`} />
      <svg 
        className="cursor-circle" 
        width="70" 
        height="70" 
        viewBox="0 0 70 70"
      >
        {fillPoints.map((point, index) => (
          <circle
            key={`fill-${index}`}
            cx={point.x}
            cy={point.y}
            r="0.8"
            fill={isHovered ? "rgba(255,99,99,0.3)" : "rgba(255,255,255,0.3)"}
            style={{
              transition: `fill 0.3s ease-out, transform 0.2s ease-out`,
              transform: isClicked ? 'scale(0.9)' : 'scale(1)'
            }}
          />
        ))}
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <g filter="url(#glow)">
          {outlinePoints.map((point, index) => (
            <circle
              key={`outline-${index}`}
              cx={point.x}
              cy={point.y}
              r={point.radius}
              fill={isHovered ? "rgba(255,99,99,1)" : "rgba(255,255,255,1)"}
              style={{
                transition: `fill 0.3s ease-out, transform 0.2s ease-out`,
                transform: isClicked ? 'scale(0.9)' : 'scale(1)'
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
} 