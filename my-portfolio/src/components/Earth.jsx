/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function Satellite({ orbitRadius, speed, offset, size = 0.5 }) {
  const satelliteRef = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset
    satelliteRef.current.position.x = Math.cos(t) * orbitRadius
    satelliteRef.current.position.z = Math.sin(t) * orbitRadius
    // Add slight y oscillation
    satelliteRef.current.position.y = Math.sin(t * 0.2) * (orbitRadius * 0.02)
    // Rotate satellite
    satelliteRef.current.rotation.y = t
  })

  return (
    <mesh ref={satelliteRef}>
      <sphereGeometry args={[size, size, size]} />
      <meshBasicMaterial color="#4fc1ff" transparent opacity={1} />
    </mesh>
  )
}

function OrbitLine({ radius }) {
  return (
    <mesh rotation-x={Math.PI / 2}>
      <ringGeometry args={[radius - 0.005, radius + 0.005, 128]} />
      <meshBasicMaterial color="#4fc1ff" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  )
}

function EarthWithTextures() {
  const earthRef = useRef()
  const glowRef = useRef()
  const dotsRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  const normalMap = useLoader(TextureLoader, './textures/earth_normal.jpg')

  useFrame(({ clock, mouse: mouseCursor }) => {
    const time = clock.getElapsedTime()
    
    target.current.x = (mouseCursor.x * Math.PI) / 5
    target.current.y = (mouseCursor.y * Math.PI) / 5
    mouse.current.x += (target.current.x - mouse.current.x) * 0.1
    mouse.current.y += (target.current.y - mouse.current.y) * 0.1
    
    const group = earthRef.current.parent
    group.rotation.y = -mouse.current.x
    group.rotation.x = -mouse.current.y
    
    earthRef.current.material.uniforms.uTime.value = time
    
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
      {/* Inner orbit group */}
      <group rotation-x={Math.PI * 0.1}>
        <OrbitLine radius={2.3} />
        <Satellite orbitRadius={2.3} speed={1.2} offset={0} size={0.03} />
        <Satellite orbitRadius={2.3} speed={1.2} offset={Math.PI * 0.5} size={0.02} />
        <Satellite orbitRadius={2.3} speed={1.2} offset={Math.PI} size={0.03} />
        <Satellite orbitRadius={2.3} speed={1.2} offset={Math.PI * 1.5} size={0.02} />
      </group>
      
      {/* Middle orbit group */}
      <group rotation-x={-Math.PI * 0.15}>
        <OrbitLine radius={2.5} />
        <Satellite orbitRadius={2.5} speed={0.8} offset={0} size={0.025} />
        <Satellite orbitRadius={2.5} speed={0.8} offset={Math.PI * 0.4} size={0.02} />
        <Satellite orbitRadius={2.5} speed={0.8} offset={Math.PI * 0.8} size={0.03} />
        <Satellite orbitRadius={2.5} speed={0.8} offset={Math.PI * 1.2} size={0.02} />
        <Satellite orbitRadius={2.5} speed={0.8} offset={Math.PI * 1.6} size={0.025} />
      </group>
      
      {/* Outer orbit group */}
      <group rotation-x={Math.PI * 0.2}>
        <OrbitLine radius={2.5} />
        <Satellite orbitRadius={2.5} speed={0.5} offset={0} size={0.035} />
        <Satellite orbitRadius={2.5} speed={0.5} offset={Math.PI * 0.33} size={0.02} />
        <Satellite orbitRadius={2.5} speed={0.5} offset={Math.PI * 0.66} size={0.025} />
        <Satellite orbitRadius={2.5} speed={0.5} offset={Math.PI} size={0.03} />
        <Satellite orbitRadius={2.5} speed={0.5} offset={Math.PI * 1.33} size={0.025} />
        <Satellite orbitRadius={2.5} speed={0.5} offset={Math.PI * 1.66} size={0.02} />
      </group>

      {/* Additional tilted orbit */}
      <group rotation-x={-Math.PI * 0.25}>
        <OrbitLine radius={2.4} />
        <Satellite orbitRadius={2.4} speed={1} offset={0} size={0.025} />
        <Satellite orbitRadius={2.4} speed={1} offset={Math.PI * 0.5} size={0.02} />
        <Satellite orbitRadius={2.4} speed={1} offset={Math.PI} size={0.03} />
        <Satellite orbitRadius={2.4} speed={1} offset={Math.PI * 1.5} size={0.02} />
      </group>

      {/* Original Earth components */}
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

      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <shaderMaterial
          transparent
          uniforms={{
            uTime: { value: 0 },
            uColorA: { value: new THREE.Color('#00ffff') },  // Try different colors
            uColorB: { value: new THREE.Color('#0033ff') },  // Try different colors
            uNormalMap: { value: normalMap },
            uNormalScale: { value: 1.5 }
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vViewPosition;
            
            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              vViewPosition = -mvPosition.xyz;
              vPosition = position;
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform sampler2D uNormalMap;
            uniform float uNormalScale;
            
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vViewPosition;

            vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
              vec3 q0 = dFdx( eye_pos.xyz );
              vec3 q1 = dFdy( eye_pos.xyz );
              vec2 st0 = dFdx( uv.st );
              vec2 st1 = dFdy( uv.st );

              vec3 S = normalize( q0 * st1.t - q1 * st0.t );
              vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
              vec3 N = normalize( surf_norm );

              vec3 mapN = texture2D( uNormalMap, uv ).xyz * 2.0 - 1.0;
              mapN.xy = uNormalScale * mapN.xy;
              
              mat3 tsn = mat3( S, T, N );
              return normalize( tsn * mapN );
            }

            float noise(vec2 p) {
              return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
            
            void main() {
              // Calculate modified normal
              vec3 normal = perturbNormal2Arb(vViewPosition, vNormal, vUv);
              
              float gradientY = (vPosition.y + 2.0) / 4.0;
              float gradientX = (vPosition.x + 2.0) / 4.0;
              
              float wave = sin(gradientY * 10.0 + uTime) * 0.5 + 0.5;
              float wave2 = cos(gradientX * 8.0 - uTime * 0.5) * 0.5 + 0.5;
              
              float gradient = mix(wave, wave2, 0.5);
              
              // Use normal map for additional color variation
              float normalStrength = length(normal.xy);
              vec3 color = mix(uColorB, uColorA, gradient + normalStrength * 0.2);
              
              float n = noise(vUv + uTime * 0.1);
              float fresnel = pow(1.0 - dot(normal, normalize(vViewPosition)), 3.0);
              float alpha = mix(0.1, 0.6, fresnel) * (0.8 + n * 0.2);
              alpha *= 0.8 + sin(uTime) * 0.1;
              
              float scanLine = step(0.5, fract(vPosition.y * 20.0 + uTime));
              alpha *= 0.8 + scanLine * 0.2;
              
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshPhongMaterial
          color="#4fc1ff"
          opacity={0.3}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          blur={0.8}
        />
      </mesh>
    </group>
  )
}

export function Earth() {
  return (
    <Suspense fallback={null}>
      <EarthWithTextures />
    </Suspense>
  )
} 