/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, Suspense, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { InstancedMesh, Object3D } from 'three'

// Move static configurations outside without useMemo
const ORBIT_CONFIG = [
  { radius: 2.3, speed: 1.2, count: 4, rotation: Math.PI * 0.1 },
  { radius: 2.5, speed: 0.8, count: 5, rotation: -Math.PI * 0.15 },
  { radius: 2.5, speed: 0.5, count: 6, rotation: Math.PI * 0.2 },
  { radius: 2.4, speed: 1.0, count: 4, rotation: -Math.PI * 0.25 }
]

const MOON_CONFIG = {
  radius: 4.5,
  speed: 0.25,
  size: 0.3,
  color: '#ffffff'
}

// Create static geometries
const moonGeometry = new THREE.SphereGeometry(MOON_CONFIG.size, 32, 32)
const moonGlowGeometry = new THREE.SphereGeometry(MOON_CONFIG.size * 1.2, 32, 32)
const moonOrbitGeometry = new THREE.RingGeometry(MOON_CONFIG.radius - 0.005, MOON_CONFIG.radius + 0.005, 128)
const satelliteGeometry = new THREE.SphereGeometry(0.03, 8, 8)
const earthGeometry = new THREE.SphereGeometry(2, 128, 128)
const atmosphereGeometry = new THREE.SphereGeometry(2.1, 48, 48)
const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32)

// Optimize OrbitLine with shared geometry
const OrbitLine = memo(({ radius }) => {
  const geometry = useMemo(() => (
    new THREE.RingGeometry(radius - 0.005, radius + 0.005, 64) // Reduced segments
  ), [radius])
  
  const material = useMemo(() => (
    new THREE.MeshBasicMaterial({
      color: "#4fc1ff",
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    })
  ), [])

  return <mesh rotation-x={Math.PI / 2} geometry={geometry} material={material} />
})

// Optimize Satellites component
const Satellites = memo(({ orbitConfig }) => {
  const meshRef = useRef()
  const tempObject = useMemo(() => new Object3D(), [])
  const count = orbitConfig.count
  
  useFrame(({ clock }) => {
    for (let i = 0; i < count; i++) {
      const t = clock.getElapsedTime() * orbitConfig.speed + (i * (Math.PI * 2) / count)
      tempObject.position.x = Math.cos(t) * orbitConfig.radius
      tempObject.position.z = Math.sin(t) * orbitConfig.radius
      tempObject.position.y = Math.sin(t * 0.2) * (orbitConfig.radius * 0.02)
      tempObject.rotation.y = t
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#4fc1ff",
    transparent: true,
    opacity: 1
  }), [])

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[satelliteGeometry, material, count]} 
    />
  )
})

// Optimize Moon component
const Moon = memo(() => {
  const moonRef = useRef()
  const moonGlowRef = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * MOON_CONFIG.speed
    
    // Update moon position
    const x = Math.cos(t) * MOON_CONFIG.radius
    const z = Math.sin(t) * MOON_CONFIG.radius
    moonRef.current.position.set(x, 0, z)
    moonGlowRef.current.position.set(x, 0, z)
    
    // Rotate moon to always face the Earth
    moonRef.current.rotation.y = t
    moonGlowRef.current.rotation.y = t
  })

  return (
    <group rotation-x={3.141*0.15}>
      <mesh rotation-x={3.141 / 2} geometry={moonOrbitGeometry}>
        <meshBasicMaterial
          color={MOON_CONFIG.color}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh ref={moonRef} geometry={moonGeometry}>
        <meshStandardMaterial
          color={MOON_CONFIG.color}
          transparent
          opacity={0.8}
          emissive={MOON_CONFIG.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh ref={moonGlowRef} geometry={moonGlowGeometry}>
        <meshBasicMaterial
          color={MOON_CONFIG.color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
})

function EarthWithTextures() {
  // Add missing refs
  const earthRef = useRef()
  const glowRef = useRef()
  const dotsRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const autoRotate = useRef({ x: 0, y: 0 })

  // Optimize texture loading with error handling
  const [normalMap, displacementMap, specularMap] = useMemo(() => {
    const loader = new TextureLoader()
    return [
      loader.load('/textures/earth_normal_map.jpg'),
      loader.load('/textures/earth_displacement.jpg'),
      loader.load('/textures/earth_specular.jpg')
    ]
  }, [])

  // Optimize frame updates with RAF limiting
  const frameCount = useRef(0)
  const FPS_LIMIT = 24
  const FPS_INTERVAL = 1000 / FPS_LIMIT

  useFrame(({ clock, mouse: mouseCursor }) => {
    frameCount.current++
    if (frameCount.current % 2 !== 0) return // Skip every other frame

    const time = clock.getElapsedTime()
    
    autoRotate.current.y += 0.005
    
    target.current.x = mouseCursor.x * 0.628
    target.current.y = mouseCursor.y * 0.628
    mouse.current.x += (target.current.x - mouse.current.x) * 0.1
    mouse.current.y += (target.current.y - mouse.current.y) * 0.1
    
    const group = earthRef.current.parent
    group.rotation.y = -mouse.current.x + autoRotate.current.y
    group.rotation.x = -mouse.current.y
    
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.005
    }
    
    if (dotsRef.current) {
      dotsRef.current.rotation.y = time * 0.05
      dotsRef.current.material.opacity = 0.6 + Math.sin(time * 2) * 0.2
    }

    earthRef.current.material.uniforms.uTime.value = time
    if (dotsRef.current) {
      dotsRef.current.material.uniforms.uTime.value = time
    }
  })

  // Define Earth material
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uNormalMap: { value: normalMap },
        uDisplacementMap: { value: displacementMap },
        uSpecularMap: { value: specularMap },
        uNormalScale: { value: 10.0 },
        uDisplacementScale: { value: 0.35 },
        uOceanColor: { value: new THREE.Color('#001e3c') },
        uTerrainColor: { value: new THREE.Color('#4fc1ff') },
        uHighlightColor: { value: new THREE.Color('#7dd2ff') }
      },
      vertexShader: `
        uniform float uTime;
        uniform sampler2D uDisplacementMap;
        uniform float uDisplacementScale;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          float elevation = texture2D(uDisplacementMap, uv).r;
          vElevation = elevation;
          
          vec3 displaced = position + normal * elevation * uDisplacementScale;
          
          vec4 modelPosition = modelMatrix * vec4(displaced, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          vPosition = displaced;
        }
      `,
      fragmentShader: `
        uniform vec3 uOceanColor;
        uniform vec3 uTerrainColor;
        uniform vec3 uHighlightColor;
        uniform sampler2D uNormalMap;
        uniform float uNormalScale;
        uniform float uTime;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vElevation;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 normalMap = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
          normal = normalize(normal + normalMap * uNormalScale);
          
          vec3 color = uOceanColor;
          
          if (vElevation > 0.2) {
            float terrainMix = smoothstep(0.2, 0.4, vElevation);
            color = mix(uOceanColor, uTerrainColor, terrainMix);
          }
          
          if (vElevation > 0.6) {
            float highlightMix = smoothstep(0.6, 0.8, vElevation);
            color = mix(color, uHighlightColor, highlightMix * 0.5);
          }
          
          float glow = pow(vElevation, 2.0) * 0.2;
          color += glow * uHighlightColor * 0.3;

          float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.0);
          color += fresnel * 0.15 * uHighlightColor;

          float pulse = sin(uTime * 1.5) * 0.5 + 0.5;
          if (vElevation > 0.3) {
            color += vElevation * pulse * 0.05 * uHighlightColor;
          }

          float alpha = 0.2 + vElevation * 0.5;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [normalMap, displacementMap, specularMap])

  // Define Atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uSize: { value: 10.0 },
        uColor: { value: new THREE.Color('#4fc1ff') },
        uTime: { value: 0 },
        uDisplacementMap: { value: displacementMap },
        uDisplacementScale: { value: 0.4 }
      },
      vertexShader: `
        uniform float uSize;
        uniform float uTime;
        uniform sampler2D uDisplacementMap;
        uniform float uDisplacementScale;
        
        varying float vElevation;
        
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec2 uv = uv;
          float elevation = texture2D(uDisplacementMap, uv).r;
          vElevation = elevation;
          vec3 displaced = position + normal * elevation * uDisplacementScale * 1.5;
          vec4 viewPosition = viewMatrix * modelMatrix * vec4(displaced, 1.0);
          gl_Position = projectionMatrix * viewPosition;
          float sizeVariation = 1.0 + elevation * 3.0;
          float pulseSize = sin(uTime + elevation * 5.0) * 0.3 + 1.0;
          gl_PointSize = uSize * sizeVariation * pulseSize * (1.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        
        varying float vElevation;
        
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 2.0);
          
          float alpha = 0.15 * strength;
          
          if (vElevation > 0.2) {
            alpha *= (1.0 + vElevation * 2.0);
          }
          
          float pulse = sin(uTime * 1.0 + vElevation * 8.0) * 0.5 + 0.5;
          alpha *= (0.8 + pulse * 0.3);
          
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [displacementMap])

  return (
    <group position={[0, 0, -8]} scale={2}>
      <Moon />
      
      {/* Optimize lights */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={0.8}
        color="#4fc1ff"
        castShadow={false} // Disable shadows for better performance
      />
      <directionalLight
        position={[-5, -3, -5]} 
        intensity={0.4}
        color="#001e3c"
      />
      <pointLight
        position={[0, 0, 5]} 
        intensity={0.6}
        color="#7dd2ff"
        distance={10}
      />

      {ORBIT_CONFIG.map((config, index) => (
        <group key={index} rotation-x={config.rotation}>
          <OrbitLine radius={config.radius} />
          <Satellites orbitConfig={config} />
        </group>
      ))}

      <points ref={dotsRef} geometry={atmosphereGeometry}>
        <primitive object={atmosphereMaterial} />
      </points>

      <mesh ref={earthRef} geometry={earthGeometry}>
        <primitive object={earthMaterial} />
      </mesh>

      <mesh ref={glowRef} geometry={glowGeometry}>
        <meshStandardMaterial
          color="#4fc1ff"
          opacity={0.08}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          emissive="#4fc1ff"
          emissiveIntensity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

// Optimize Earth export component
export const Earth = memo(() => {
  return (
    <Suspense fallback={null}>
      <EarthWithTextures />
    </Suspense>
  )
}) 