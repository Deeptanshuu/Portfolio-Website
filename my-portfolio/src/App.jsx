import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Routes, Route } from 'react-router-dom'
import * as THREE from 'three'
import { Hero } from './components/Hero'
import { Interface } from './components/interface/Interface'
import { CustomCursor } from './components/CustomCursor'
import { ProjectPage } from './pages/ProjectPage'

function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()));
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen bg-black">
      {!isMobile && <CustomCursor />}
      <Canvas
        camera={{ 
          position: [0, 0, 8],
          fov: 45,
          near: 1,
          far: 100 
        }}
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true,
          precision: 'highp',
          powerPreference: 'high-performance',
          premultipliedAlpha: false,
          preserveDrawingBuffer: true
        }}
        dpr={[1, 1.5]}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          
          // Optimize rendering
          gl.sortObjects = true;
          gl.autoClear = true;
          gl.setClearColor(0x000000, 1);
        }}
        frameloop="always"
      >
        <Suspense fallback={<div className="loading-spinner"><h1>Loading...</h1></div>}>
          <ScrollControls pages={isMobile ? 12 : 8.5} damping={isMobile ? 0.05 : 0.2} maxSpeed={0.8}>
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
    </Routes>
  )
}