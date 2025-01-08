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
          antialias: false,
          alpha: false,
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true,
          precision: 'highp' 
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<div className="loading-spinner"><h1>Loading...</h1></div>}>
          <ScrollControls pages={8.5} damping={0.3}>
            <group>
              <Hero isMobile={false} />
            </group>
            <Scroll html style={{ width: '100%' }}>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}