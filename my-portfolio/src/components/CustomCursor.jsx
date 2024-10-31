import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
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

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateCursorType)
    }
  }, [])

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