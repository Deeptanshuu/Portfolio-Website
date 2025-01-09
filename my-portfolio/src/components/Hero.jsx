/* eslint-disable react/no-unknown-property */
import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Earth } from './Earth'
import { EarthMobile } from './EarthMobile'
import { Html, useScroll } from '@react-three/drei'

export function Hero({ isMobile }) {
  const [useRealEarth, setUseRealEarth] = useState(false)
  const { width, height } = useThree((state) => state.viewport)
  const starsRef = useRef()
  const groupRef = useRef()
  const scroll = useScroll()

  // Generate random star positions with reduced count for mobile
  const starPositions = useMemo(() => {
    const starCount = isMobile ? 100 : 1000 // Reduced star count
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount; i++) {
      const radius = 10 + Math.random() * 12 // Adjusted radius range
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const brightness = 0.3 + Math.random() * 0.35 // Reduced brightness range
      colors[i * 3] = brightness
      colors[i * 3 + 1] = brightness
      colors[i * 3 + 2] = brightness
    }

    return { positions, colors }
  }, [isMobile])

  // Optimize frame updates
  const frameCount = useRef(0)
  useFrame((state) => {
    frameCount.current++
    
    // Limit star rotation updates
    if (starsRef.current && frameCount.current % 2 === 0) {
      starsRef.current.rotation.y += 0.00005
      starsRef.current.rotation.x += 0.00005
    }

    // Update group position based on scroll with optimized calculations
    if (groupRef.current && !isMobile) {
      const scrollOffset = scroll.offset
      if (scrollOffset < 0.15) {
        // Use smoother easing for scroll movement
        const ease = (t) => t * (2 - t); // Quadratic ease-out
        const normalizedScroll = ease(scrollOffset / 0.15);
        const targetZ = normalizedScroll * height * 2; // Reduced multiplier
        groupRef.current.position.z = targetZ;
      }
    }
  })

  return (
    <group ref={groupRef}>
      {!isMobile && (
        <Html fullscreen style={{ pointerEvents: 'none', zIndex: 1 }}>
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

      <points ref={starsRef} renderOrder={-1} position={[0, 0, -10]}>
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
          size={isMobile ? 0.08 : 0.03}
          vertexColors
          transparent={false}
          opacity={1}
          sizeAttenuation={true}
          depthWrite={true}
          depthTest={true}
          alphaTest={0.5}
          blending={THREE.NoBlending}
        />
      </points>

      <group position={[0, 0, 0]} renderOrder={1}>
        {isMobile ? <EarthMobile /> : (useRealEarth ? <EarthMobile /> : <Earth />)}
      </group>
    </group>
  )
} 