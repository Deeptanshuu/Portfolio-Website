/* eslint-disable react/no-unknown-property */
import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Earth } from './Earth'
import { EarthMobile } from './EarthMobile'
import { Html, useScroll } from '@react-three/drei'

export function Hero({ isMobile }) {
  const [useRealEarth, setUseRealEarth] = useState(false)
  const { width, height } = useThree((state) => state.viewport)
  const starsRef = useRef()
  const groupRef = useRef()
  const scroll = useScroll()

  // Generate random star positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      const radius = 5 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const brightness = 0.5 + Math.random() * 0.5
      colors[i * 3] = brightness
      colors[i * 3 + 1] = brightness
      colors[i * 3 + 2] = brightness + Math.random() * 0.2
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001
      starsRef.current.rotation.x += 0.0001
    }
    
    // Update group position based on scroll
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      if (scrollOffset < 0.15) {
        groupRef.current.position.z = scrollOffset * height * 15.5
      } else {
        return null;
      }
    }
  })

  return (
    <group ref={groupRef}>
      {!isMobile && (
        <Html fullscreen style={{ pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', bottom: '40px', left: '20px', pointerEvents: 'auto' }}>
            <button
              onClick={() => setUseRealEarth(!useRealEarth)}
              style={{
                background: useRealEarth ? '#1a1a1a' : '#2a2a2a',
                padding: '10px 20px',
                borderRadius: '20px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                zIndex: 99999
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: useRealEarth ? '#00ff88' : '#4fc1ff',
                  transition: 'all 0.3s ease'
                }}
              />
              {useRealEarth ? 'Real Earth View' : 'Stylized View'}
            </button>
          </div>
        </Html>
      )}

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

      <group position={[0, 0, 0]}>
        {isMobile ? <EarthMobile /> : (useRealEarth ? <EarthMobile /> : <Earth />)}
      </group>
    </group>
  )
} 