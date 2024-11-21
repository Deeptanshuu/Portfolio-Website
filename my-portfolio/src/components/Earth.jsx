/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, Suspense, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

// Move static configurations outside without useMemo
const ORBIT_CONFIG = [
  { radius: 2.3, speed: 1.2, count: 3, rotation: Math.PI * 0.1 },
  { radius: 2.5, speed: 0.8, count: 4, rotation: -Math.PI * 0.15 },
  { radius: 2.5, speed: 0.5, count: 4, rotation: Math.PI * 0.2 },
  { radius: 2.4, speed: 1.0, count: 3, rotation: -Math.PI * 0.25 }
]

const MOON_CONFIG = {
  radius: 6.5,
  speed: 0.25,
  size: 0.3,
  color: '#ffffff'
}

// Create static geometries
const moonGeometry = new THREE.SphereGeometry(MOON_CONFIG.size, 32, 32)
const moonGlowGeometry = new THREE.SphereGeometry(MOON_CONFIG.size * 1.2, 32, 32)
const moonOrbitGeometry = new THREE.RingGeometry(MOON_CONFIG.radius - 0.005, MOON_CONFIG.radius + 0.005, 128)
const earthGeometry = new THREE.SphereGeometry(2, 180, 180)

// Optimize OrbitLine with shared geometry
const OrbitLine = memo(({ radius }) => {
  const geometry = useMemo(() => (
    new THREE.RingGeometry(radius - 0.005, radius + 0.005, 64)
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

// Add this near the top with other constants
const EARTH_SPHERE = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ visible: false })
)

// Add this near other constants at the top
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

// Add this helper function back
const createInstancedPoints = (geometry) => {
  const positions = geometry.attributes.position.array;
  const uvs = geometry.attributes.uv.array;
  const count = positions.length / 3;
  
  // Create arrays for instanced attributes
  const instancePositions = new Float32Array(count * 3);
  const instanceUvs = new Float32Array(count * 2);
  
  // Sample every vertex for maximum density
  let instanceCount = 0;
  for (let i = 0; i < count; i += 1) {
    instancePositions[instanceCount * 3] = positions[i * 3];
    instancePositions[instanceCount * 3 + 1] = positions[i * 3 + 1];
    instancePositions[instanceCount * 3 + 2] = positions[i * 3 + 2];
    
    instanceUvs[instanceCount * 2] = uvs[i * 2];
    instanceUvs[instanceCount * 2 + 1] = uvs[i * 2 + 1];
    
    instanceCount++;
  }
  
  const instancedGeometry = new THREE.InstancedBufferGeometry();
  instancedGeometry.instanceCount = instanceCount;
  
  instancedGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
  instancedGeometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(instancePositions, 3));
  instancedGeometry.setAttribute('instanceUv', new THREE.InstancedBufferAttribute(instanceUvs, 2));
  
  return instancedGeometry;
};

function EarthWithTextures() {
  const earthRef = useRef()
  const earthDotsRef = useRef()
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

  // Optimize frame updates
  const frameCount = useRef(0)
  const FPS_LIMIT = isMobile ? 30 : 60
  const FRAME_SKIP = isMobile ? 3 : 2

  useFrame(({ clock }) => {
    frameCount.current++
    if (frameCount.current % FRAME_SKIP !== 0) return

    const time = clock.getElapsedTime()
    
    const rotationSpeed = isMobile ? 0.002 : 0.005
    autoRotate.current.y += rotationSpeed
    
    const group = earthRef.current.parent
    group.rotation.y = autoRotate.current.y

    if (earthDotsRef.current) {
      earthDotsRef.current.rotation.y = time * (isMobile ? 0.02 : 0.05)
      earthDotsRef.current.material.uniforms.uTime.value = time
    }

    earthRef.current.material.uniforms.uTime.value = time
  })

  // Define Earth material
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      uniforms: {
        uTime: { value: 0 },
        uNormalMap: { value: normalMap },
        uDisplacementMap: { value: displacementMap },
        uSpecularMap: { value: specularMap },
        uNormalScale: { value: 1.0 },
        uDisplacementScale: { value: 0.65 },
        uOceanColor: { value: new THREE.Color('#003366') },
        uTerrainColor: { value: new THREE.Color('#66ccff') },
        uHighlightColor: { value: new THREE.Color('#ffffff') }
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
            color = mix(color, uHighlightColor, highlightMix * 0.7);
          }
          
          float glow = pow(vElevation, 2.0) * 0.3;
          color += glow * uHighlightColor * 0.4;

          float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.0);
          color += fresnel * 0.25 * uHighlightColor;

          float alpha = 0.4 + vElevation * 0.6;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      blending: THREE.AdditiveBlending
    })
  }, [normalMap, displacementMap, specularMap])

  // Add dots shader material
  const dotsShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: isMobile ? 3.0 : 4.0 },
        uDisplacementMap: { value: displacementMap },
        uDisplacementScale: { value: 0.4 },
        uOceanColor: { value: new THREE.Color('#003366') },
        uTerrainColor: { value: new THREE.Color('#66ccff') },
        uHighlightColor: { value: new THREE.Color('#ffffff') }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        uniform sampler2D uDisplacementMap;
        uniform float uDisplacementScale;
        
        attribute vec3 instancePosition;
        attribute vec2 instanceUv;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;
        
        void main() {
          vUv = instanceUv;
          vec3 pos = instancePosition;
          vec3 normal = normalize(pos);
          vNormal = normalize(normalMatrix * normal);
          
          float elevation = texture2D(uDisplacementMap, instanceUv).r;
          vElevation = elevation;
          
          vec3 displaced = pos + normal * elevation * uDisplacementScale;
          
          vec4 modelPosition = modelMatrix * vec4(displaced, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          
          float sizeVariation = 1.0 + elevation * 2.0;
          gl_PointSize = uSize * sizeVariation * (1.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uOceanColor;
        uniform vec3 uTerrainColor;
        uniform vec3 uHighlightColor;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;

        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 1.5);
          
          vec3 color;
          
          if (vElevation < 0.2) {
            color = uOceanColor;
          } else if (vElevation < 0.4) {
            float t = (vElevation - 0.2) / 0.2;
            color = mix(uOceanColor, uTerrainColor, t);
          } else if (vElevation < 0.6) {
            color = uTerrainColor;
          } else {
            float t = (vElevation - 0.6) / 0.4;
            color = mix(uTerrainColor, uHighlightColor, t);
          }
          
          float alpha = strength * (0.4 + vElevation * 0.5);
          
          if (strength < 0.05) discard;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      blending: THREE.AdditiveBlending
    })
  }, [displacementMap])

  return (
    <group position={[0, 0, -8]} scale={isMobile ? 1.5 : 1.75}>
      <primitive object={EARTH_SPHERE} />
      
      <ambientLight intensity={1} />

      {ORBIT_CONFIG.map((config, index) => (
        <group key={index} rotation-x={config.rotation}>
          <OrbitLine radius={config.radius} />
        </group>
      ))}

      {/* Earth base */}
      <mesh ref={earthRef} geometry={earthGeometry}>
        <primitive object={earthMaterial} attach="material" />
      </mesh>

      {/* Earth dots */}
      <points ref={earthDotsRef} geometry={useMemo(() => createInstancedPoints(earthGeometry), [])}>
        <primitive object={dotsShaderMaterial} attach="material" />
      </points>
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