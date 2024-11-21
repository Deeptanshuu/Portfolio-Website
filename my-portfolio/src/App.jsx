import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Hero } from './components/Hero'
import { Interface } from './components/interface/Interface'
import { CustomCursor } from './components/CustomCursor'

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="h-screen bg-black">
      <CustomCursor />
      <Canvas
        camera={{ 
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 100 
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={8.5} damping={0.3}>
            <Hero isMobile={isMobile} />
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}