/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Earth } from './Earth'
import { EarthMobile } from './EarthMobile'

export function Hero({ isMobile }) {
  const { width, height } = useThree((state) => state.viewport)
  const starsRef = useRef()

  // Generate random star positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3) // 1000 stars
    const colors = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      // Random position in a sphere
      const radius = 5 + Math.random() * 15 // Between 5 and 20 units from center
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Slightly varied white colors
      const brightness = 0.5 + Math.random() * 0.5
      colors[i * 3] = brightness
      colors[i * 3 + 1] = brightness
      colors[i * 3 + 2] = brightness + Math.random() * 0.2 // Slight blue tint
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      // Subtle rotation of the entire star field
      starsRef.current.rotation.y += 0.0001
      starsRef.current.rotation.x += 0.0001
    }
  })

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.positions.length / 3}
            array={starPositions.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starPositions.colors.length / 3}
            array={starPositions.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.05 : 0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {isMobile ? <EarthMobile /> : <Earth />}
    </>
  )
} 