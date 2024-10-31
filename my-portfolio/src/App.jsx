import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Hero } from './components/Hero'
import { Interface } from './components/Interface'
import { CustomCursor } from './components/CustomCursor'

export default function App() {
  return (
    <div className="h-screen bg-black">
      <CustomCursor />
      <Canvas
        camera={{ 
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 100 
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={5.5} damping={0.3}>
            <Hero />
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}