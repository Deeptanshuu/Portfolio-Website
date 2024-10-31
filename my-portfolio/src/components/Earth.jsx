/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Earth() {
  const earthRef = useRef()
  const glowRef = useRef()
  const dotsRef = useRef()
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    earthRef.current.rotation.y = time * 0.1
    if (glowRef.current) {
      glowRef.current.rotation.y = time * 0.1
    }
    if (dotsRef.current) {
      dotsRef.current.rotation.y = time * 0.1
      dotsRef.current.material.opacity = 0.6 + Math.sin(time * 2) * 0.2
    }
  })

  return (
    <group position={[0, 0, -8]} scale={2}>
      {/* Scattered dots sphere */}
      <points ref={dotsRef}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <pointsMaterial
          size={0.05}
          color="#4fc1ff"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Main sphere with shader */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <shaderMaterial
          transparent
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#4fc1ff') }
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            
            void main() {
              vUv = uv;
              vNormal = normal;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;
            varying vec3 vNormal;

            float noise(vec2 p) {
              return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
            
            void main() {
              float gridSize = 50.0;
              vec2 grid = fract(vUv * gridSize);
              float dotSize = 0.05;
              float dots = step(dotSize, grid.x) * step(dotSize, grid.y);
              
              float n = noise(vUv + uTime * 0.1);
              float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              float alpha = mix(0.1, 0.4, fresnel) * (0.8 + n * 0.2);
              
              gl_FragColor = vec4(uColor, alpha);
            }
          `}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshPhongMaterial
          color="#4fc1ff"
          opacity={0.1}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmosphere ring */}
      <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[2.15, 2.25, 64]} />
        <meshBasicMaterial
          color="#4fc1ff"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
} 