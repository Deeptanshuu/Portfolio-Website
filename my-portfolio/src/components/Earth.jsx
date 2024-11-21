/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, Suspense, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

// Keep only necessary constants
const ORBIT_CONFIG = [
  { radius: 2.3, speed: 1.2, count: 3, rotation: Math.PI * 0.1 },
  { radius: 2.5, speed: 0.8, count: 4, rotation: -Math.PI * 0.15 },
  { radius: 2.5, speed: 0.5, count: 4, rotation: Math.PI * 0.2 },
  { radius: 2.4, speed: 1.0, count: 3, rotation: -Math.PI * 0.25 }
]

const earthGeometry = new THREE.SphereGeometry(2, 256, 256) // Increased resolution for more dots

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

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const createInstancedPoints = (geometry) => {
  const positions = geometry.attributes.position.array;
  const uvs = geometry.attributes.uv.array;
  const count = positions.length / 3;
  
  const instancePositions = new Float32Array(count * 3);
  const instanceUvs = new Float32Array(count * 2);
  
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
  const dotsRef = useRef()
  const autoRotate = useRef({ x: 0, y: 0 })

  const displacementMap = useMemo(() => {
    const loader = new TextureLoader()
    return loader.load('/textures/earth_displacement.jpg')
  }, [])

  const frameCount = useRef(0)
  const FPS_LIMIT = isMobile ? 30 : 60
  const FRAME_SKIP = isMobile ? 3 : 2

  useFrame(({ clock }) => {
    frameCount.current++
    if (frameCount.current % FRAME_SKIP !== 0) return

    const time = clock.getElapsedTime()
    
    const rotationSpeed = isMobile ? 0.002 : 0.005
    autoRotate.current.y += rotationSpeed
    
    if (dotsRef.current) {
      dotsRef.current.rotation.y = autoRotate.current.y
      dotsRef.current.material.uniforms.uTime.value = time
    }
  })

  const dotsShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 20},
        uDisplacementMap: { value: displacementMap },
        uDisplacementScale: { value: 0.75 },
        uOceanColor: { value: new THREE.Color('#50c1ff') },
        uTerrainColor: { value: new THREE.Color('#50c1ff') },
        uHighlightColor: { value: new THREE.Color('#50c1ff')}
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
          
          vec3 color = mix(uOceanColor, uHighlightColor, vElevation);
          
          float alpha = strength * (0.4 + vElevation * 0.6);
          
          if (strength < 0.05) discard;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      blending: THREE.AdditiveBlending
    })
  }, [displacementMap])

  return (
    <group position={[0, 0, -8]} scale={isMobile ? 1.5 : 1.75}>
      <ambientLight intensity={1} />

      {ORBIT_CONFIG.map((config, index) => (
        <group key={index} rotation-x={config.rotation}>
          <OrbitLine radius={config.radius} />
        </group>
      ))}

      {/* Only Earth dots */}
      <points ref={dotsRef} geometry={useMemo(() => createInstancedPoints(earthGeometry), [])}>
        <primitive object={dotsShaderMaterial} attach="material" />
      </points>
    </group>
  )
}

export const Earth = memo(() => {
  return (
    <Suspense fallback={null}>
      <EarthWithTextures />
    </Suspense>
  )
}) 