import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Hero } from './components/Hero'
import { Interface } from './components/interface/Interface'
import { CustomCursor } from './components/CustomCursor'

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile using User Agent
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()))
    }

    // Initial check
    checkMobile()
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
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true
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