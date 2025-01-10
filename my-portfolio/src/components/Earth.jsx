/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, Suspense, useMemo, memo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { Object3D } from 'three'
import { useScroll } from '@react-three/drei'

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
const satelliteGeometry = new THREE.SphereGeometry(0.03, 8, 8)
const earthGeometry = new THREE.SphereGeometry(2, 256, 256)

// Optimize OrbitLine with shared geometry
const OrbitLine = memo(({ radius, strength }) => {
  const geometry = useMemo(() => (
    new THREE.RingGeometry(radius - 0.005, radius + 0.005, 64)
  ), [radius])
  
  const material = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      color: "#4fc1ff",
      transparent: true,
      opacity: 0.5 * strength,
      side: THREE.DoubleSide,
      depthWrite: false,
      depthTest: true
    });
    mat.sortParticles = true;
    return mat;
  }, [strength])

  return <mesh rotation-x={Math.PI / 2} geometry={geometry} material={material} />
})

// Replace Satellites component with regular meshes
const Satellites = memo(({ orbitConfig, strength }) => {
  const satellites = useMemo(() => {
    const items = [];
    for (let i = 0; i < orbitConfig.count; i++) {
      items.push({
        id: i,
        phase: (i * Math.PI * 2) / orbitConfig.count
      });
    }
    return items;
  }, [orbitConfig.count]);

  return (
    <group>
      {satellites.map((sat) => (
        <Satellite key={sat.id} phase={sat.phase} config={orbitConfig} strength={strength} />
      ))}
    </group>
  );
});

const Satellite = memo(({ phase, config, strength }) => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * config.speed + phase;
    const x = Math.cos(t) * config.radius;
    const z = Math.sin(t) * config.radius;
    const y = Math.sin(t * 0.2) * (config.radius * 0.02);
    
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = t;
  });

  return (
    <mesh ref={meshRef} geometry={satelliteGeometry}>
      <meshBasicMaterial
        color="#4fc1ff"
        transparent={true}
        opacity={strength}
      />
    </mesh>
  );
});

// Optimize Moon component
const Moon = memo(({ strength }) => {
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
    <group rotation-x={3.141*0.05}>
      <mesh rotation-x={3.141 / 2} geometry={moonOrbitGeometry}>
        <meshBasicMaterial
          color={MOON_CONFIG.color}
          transparent
          opacity={0.6 * strength}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh ref={moonRef} geometry={moonGeometry}>
        <meshStandardMaterial
          color={MOON_CONFIG.color}
          transparent
          opacity={0.8 * strength}
          emissive={MOON_CONFIG.color}
          emissiveIntensity={0.2 * strength}
        />
      </mesh>
      
      <mesh ref={moonGlowRef} geometry={moonGlowGeometry}>
        <meshBasicMaterial
          color={MOON_CONFIG.color}
          transparent
          opacity={0.1 * strength}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
})

const createInstancedPoints = (geometry) => {
  const positions = geometry.attributes.position.array;
  const uvs = geometry.attributes.uv.array;
  const count = positions.length / 3;
  
  // Create arrays for instanced attributes
  const instancePositions = new Float32Array(count * 3);
  const instanceUvs = new Float32Array(count * 2);
  
  // Sample every other vertex to reduce density
  let instanceCount = 0;
  for (let i = 0; i < count; i += 2) { // Skip every other point
    instancePositions[instanceCount * 3] = positions[i * 3];
    instancePositions[instanceCount * 3 + 1] = positions[i * 3 + 1];
    instancePositions[instanceCount * 3 + 2] = positions[i * 3 + 2];
    
    instanceUvs[instanceCount * 2] = uvs[i * 2];
    instanceUvs[instanceCount * 2 + 1] = uvs[i * 2 + 1];
    
    instanceCount++;
  }
  
  const instancedGeometry = new THREE.InstancedBufferGeometry();
  instancedGeometry.instanceCount = instanceCount;
  
  // Add base point geometry
  instancedGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
  
  // Add instanced attributes
  instancedGeometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(instancePositions, 3));
  instancedGeometry.setAttribute('instanceUv', new THREE.InstancedBufferAttribute(instanceUvs, 2));
  
  return instancedGeometry;
};

// Add these constants near the top with other configurations
const ISS_CONFIG = {
  radius: 2.2,  // Slightly closer to Earth than other satellites
  speed: 0.15,  // Slowed down significantly (about one orbit per ~40 seconds)
  size: 0.06,   // Slightly larger than regular satellites
  inclination: Math.PI * 0.23, // ~51.6 degrees orbital inclination
  color: '#00ff88'
}

// Add this new component for the ISS
const ISS = memo(({ strength }) => {
  const issRef = useRef()
  const issGlowRef = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * ISS_CONFIG.speed
    
    // Calculate position with orbital inclination
    const x = Math.cos(t) * ISS_CONFIG.radius
    const z = Math.sin(t) * ISS_CONFIG.radius
    const y = Math.sin(t) * Math.sin(ISS_CONFIG.inclination) * ISS_CONFIG.radius * 0.8
    
    issRef.current.position.set(x, y, z)
    issGlowRef.current.position.set(x, y, z)
    
    // Rotate ISS to face its direction of travel
    issRef.current.rotation.y = t
  })

  return (
    <group>
      <mesh rotation-x={ISS_CONFIG.inclination}>
        <ringGeometry args={[ISS_CONFIG.radius - 0.005, ISS_CONFIG.radius + 0.005, 128]} />
        <meshBasicMaterial
          color={ISS_CONFIG.color}
          transparent
          opacity={0.3 * strength}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      <mesh ref={issRef}>
        <boxGeometry args={[ISS_CONFIG.size, ISS_CONFIG.size * 0.4, ISS_CONFIG.size * 0.4]} />
        <meshStandardMaterial
          color={ISS_CONFIG.color}
          emissive={ISS_CONFIG.color}
          emissiveIntensity={0.5 * strength}
          transparent
          opacity={strength}
        />
      </mesh>
      
      <mesh ref={issGlowRef}>
        <sphereGeometry args={[ISS_CONFIG.size * 1.2, 16, 16]} />
        <meshBasicMaterial
          color={ISS_CONFIG.color}
          transparent
          opacity={0.3 * strength}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
})

// Add this near the top with other constants
const EARTH_SPHERE = new THREE.Mesh(
  new THREE.SphereGeometry(2, 256, 256),
  new THREE.MeshBasicMaterial({ visible: false })
)

function EarthWithTextures() {
  const earthDotsRef = useRef();
  const autoRotate = useRef({ x: 0, y: 0 });
  const scroll = useScroll();
  const [scrollStrength, setScrollStrength] = useState(1);

  // Optimize texture loading with error handling
  const [normalMap, displacementMap, specularMap] = useMemo(() => {
    const loader = new TextureLoader()
    return [
      loader.load('/textures/earth_normal_map.jpg'),
      loader.load('/textures/earth_displacement.jpg'),
      loader.load('/textures/earth_specular.jpg')
    ]
  }, [])

  useFrame(({ clock, mouse: mouseCursor, camera, raycaster }) => {
    const time = clock.getElapsedTime();
    
    // Simple constant auto-rotation
    const rotationSpeed = 0.005;
    autoRotate.current.y += rotationSpeed;
    
    if (earthDotsRef.current) {
      earthDotsRef.current.rotation.y = autoRotate.current.y;
      earthDotsRef.current.material.uniforms.uTime.value = time;

      // Update strength based on scroll
      const newScrollStrength = Math.max(1 - scroll.offset * 5, 0); // Goes from 1 to 0 in first 20% of scroll
      setScrollStrength(newScrollStrength);
      earthDotsRef.current.material.uniforms.uStrength.value = newScrollStrength;

      // Keep the mouse intersection for dot raising effect
      raycaster.setFromCamera(mouseCursor, camera);
      const intersects = raycaster.intersectObject(EARTH_SPHERE);
      
      if (intersects.length > 0) {
        earthDotsRef.current.material.uniforms.uMousePosition.value.copy(intersects[0].point);
      } else {
        earthDotsRef.current.material.uniforms.uMousePosition.value.set(1000, 1000, 1000);
      }
    }
  });

  const dotsShaderMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 15.0 },
        uDisplacementMap: { value: displacementMap },
        uDisplacementScale: { value: 0.55 },
        uOceanColor: { value: new THREE.Color('#0066ff') },
        uTerrainColor: { value: new THREE.Color('#00bdff') },
        uHighlightColor: { value: new THREE.Color('#ffffff') },
        uOutlineColor: { value: new THREE.Color('#ffffff') },
        uOutlineStrength: { value: 1.0 },
        uMousePosition: { value: new THREE.Vector3() },
        uHoverRadius: { value: 1.5 },
        uHoverStrength: { value: 0.01 },
        uNormalMap: { value: normalMap },
        uNormalScale: { value: 5.0 },
        uStrength: { value: 1.0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        uniform sampler2D uDisplacementMap;
        uniform float uDisplacementScale;
        uniform vec3 uMousePosition;
        uniform float uHoverRadius;
        uniform float uHoverStrength;
        uniform float uStrength;
        
        attribute vec3 instancePosition;
        attribute vec2 instanceUv;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;
        varying float vDepth;
        varying vec3 vViewPosition;
        
        void main() {
          vUv = instanceUv;
          vec3 pos = instancePosition;
          vec3 normal = normalize(pos);
          vNormal = normalize(normalMatrix * normal);
          
          float elevation = texture2D(uDisplacementMap, instanceUv).r;
          vElevation = elevation;
          
          // Calculate distance to mouse position in world space
          vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
          float distanceToMouse = distance(worldPosition.xyz, uMousePosition);
          float hoverEffect = smoothstep(uHoverRadius, 0.0, distanceToMouse);
          
          // Add hover elevation to displacement and apply strength
          vec3 displaced = pos + normal * (elevation * uDisplacementScale + hoverEffect * uHoverStrength) * uStrength;
          
          vec4 modelPosition = modelMatrix * vec4(displaced, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          
          vViewPosition = -viewPosition.xyz;
          vDepth = -viewPosition.z;
          
          gl_Position = projectionMatrix * viewPosition;
          
          float sizeVariation = 1.5 + elevation * 4.0 + hoverEffect * 12.0; // Increased base size and variation
          gl_PointSize = uSize * sizeVariation * (1.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uOceanColor;
        uniform vec3 uTerrainColor;
        uniform vec3 uHighlightColor;
        uniform vec3 uOutlineColor;
        uniform float uOutlineStrength;
        uniform float uTime;
        uniform sampler2D uNormalMap;
        uniform float uNormalScale;
        uniform float uStrength;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;
        varying float vDepth;
        varying vec3 vViewPosition;

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
          } else if (vElevation < 0.7) {
            color = uTerrainColor;
          } else {
            float t = (vElevation - 0.7) / 0.3;
            color = mix(uTerrainColor, uHighlightColor, t);
          }
          
          vec3 normalMap = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
          vec3 normal = normalize(vNormal + normalMap * uNormalScale);
          
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 1.5);
          color += fresnel * 0.5 * uHighlightColor;
          
          // Apply strength to color brightness
          color *= 1.5 * uStrength;
          
          float alpha = strength * (1.0 + vElevation * 0.8);
          
          float fadeStart = 8.0;
          float fadeEnd = 20.0;
          float fadeFactor = smoothstep(fadeEnd, fadeStart, vDepth);
          alpha *= fadeFactor;
          
          if (strength < 0.02) discard;
          
          gl_FragColor = vec4(color, alpha * uStrength);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true
    });
    return material;
  }, [displacementMap, normalMap]);

  return (
    <group position={[0, 0, -8]} scale={1.65}>
      <primitive object={EARTH_SPHERE} renderOrder={0} />
      <Moon renderOrder={2} strength={scrollStrength} />
      <ISS renderOrder={2} strength={scrollStrength} />
      
      <ambientLight intensity={1} />

      {ORBIT_CONFIG.map((config, index) => (
        <group key={index} rotation-x={config.rotation} renderOrder={1}>
          <OrbitLine radius={config.radius} strength={scrollStrength} />
          <Satellites orbitConfig={config} strength={scrollStrength} />
        </group>
      ))}

      <points ref={earthDotsRef} position={[0, 0, 0]} geometry={useMemo(() => createInstancedPoints(earthGeometry), [])} renderOrder={3}>
        <primitive object={dotsShaderMaterial} attach="material" />
      </points>
    </group>
  );
}

// Optimize Earth export component
export const Earth = memo(() => {
  return (
    <Suspense fallback={null}>
      <EarthWithTextures />
    </Suspense>
  )
}) 