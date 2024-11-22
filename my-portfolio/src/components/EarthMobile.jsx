/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, Suspense, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

// Create static geometry with higher detail for better visuals
const earthGeometry = new THREE.SphereGeometry(2, 128, 128)

// Earth's axial tilt (23.5 degrees) - negative for opposite direction
const EARTH_TILT = (23.5 * Math.PI) / 180

// Mumbai coordinates
const MUMBAI_COORDINATES = {
  latitude: 19.0760,
  longitude: 72.8777
}

// Helper function to convert lat/long to 3D coordinates
const latLongToVector3 = (lat, long, radius) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (long + 180) * (Math.PI / 180)
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  const y = (radius * Math.cos(phi))
  
  return new THREE.Vector3(x, y, z)
}

// Location marker component with pulsing effect
const LocationMarker = memo(() => {
  const markerRef = useRef()
  const pulseRef = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    
    // Pulse effect
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1)
      pulseRef.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.1
    }
    
    // Marker glow
    if (markerRef.current) {
      markerRef.current.material.opacity = 0.8 + Math.sin(t * 2) * 0.2
    }
  })

  const position = useMemo(() => 
    latLongToVector3(
      MUMBAI_COORDINATES.latitude, 
      MUMBAI_COORDINATES.longitude, 
      2.05
    ), 
  [])

  return (
    <group position={position}>
      {/* Main marker dot */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Pulse effect */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
})

function EarthMobileWithTextures() {
  const earthRef = useRef()
  const cloudsRef = useRef()
  const autoRotate = useRef({ y: 0 })

  // Load textures including cloudmap
  const [dayMap, nightMap, displacementMap, cloudMap] = useMemo(() => {
    const loader = new TextureLoader()
    return [
      loader.load('/textures/earth_daymap.jpg'),
      loader.load('/textures/earth_nightmap.jpg'),
      loader.load('/textures/earth_displacement.jpg'),
      loader.load('/textures/earth_cloudmap.jpg')
    ]
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const rotationSpeed = 0.002
    autoRotate.current.y += rotationSpeed
    
    const group = earthRef.current.parent
    group.rotation.y = autoRotate.current.y

    // Rotate clouds slightly faster than the Earth
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.00015
    }
  })

  // Cloud material with transparency
  const cloudsMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        cloudMap: { value: cloudMap },
        sunDirection: { value: new THREE.Vector3(-1.0, -0.2, 0.3) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D cloudMap;
        uniform vec3 sunDirection;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vec4 clouds = texture2D(cloudMap, vUv);
          
          // Calculate cloud illumination
          float sunlight = dot(vNormal, normalize(sunDirection)) * 0.5 + 0.5;
          vec3 cloudColor = mix(
            vec3(0.1, 0.1, 0.15), // Dark side clouds
            vec3(1.0, 1.0, 1.0),  // Lit side clouds
            sunlight
          );
          
          // Adjust cloud opacity and color
          float cloudOpacity = clouds.r * 0.4;  // Reduce overall cloud opacity
          gl_FragColor = vec4(cloudColor, cloudOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
  }, [cloudMap])

  // Modified Earth shader material
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayMap },
        uNightMap: { value: nightMap },
        uDisplacementMap: { value: displacementMap },
        uDisplacementScale: { value: 0.1 }
      },
      vertexShader: `
        uniform sampler2D uDisplacementMap;
        uniform float uDisplacementScale;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          float displacement = texture2D(uDisplacementMap, uv).r;
          vec3 newPosition = position + normal * displacement * uDisplacementScale;
          vPosition = newPosition;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 lightDir = normalize(vec3(-1.0, -0.2, 0.3));
          float dayMix = dot(vNormal, lightDir) * 0.5 + 0.5;
          
          vec3 dayColor = texture2D(uDayMap, vUv).rgb;
          vec3 nightColor = texture2D(uNightMap, vUv).rgb * vec3(1.6, 1.6, 2.0);
          
          float transitionWidth = 0.05;
          float mixFactor = smoothstep(0.5 - transitionWidth, 0.5 + transitionWidth, dayMix);
          vec3 color = mix(nightColor, dayColor, mixFactor);
          
          float atmosphere = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          vec3 atmosphereColor = mix(
            vec3(0.1, 0.2, 0.5) * 1.5,
            vec3(0.3, 0.6, 1.0) * 1.2,
            mixFactor
          );
          color += atmosphereColor * atmosphere * 0.4;
          
          float terminatorGlow = pow(1.0 - abs(dayMix - 0.5) * 2.0, 8.0) * 0.5;
          color += vec3(0.7, 0.9, 1.0) * terminatorGlow;
          
          color = pow(color, vec3(1.2));
          color *= 1.1;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
    })
  }, [dayMap, nightMap, displacementMap])

  return (
    <group position={[0, 0, -8]} scale={1.5}>
      <group rotation-z={EARTH_TILT}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[-5, -1, 2]} intensity={0.7} />

        {/* Earth base */}
        <mesh ref={earthRef} geometry={earthGeometry}>
          <primitive object={earthMaterial} attach="material" />
        </mesh>

        {/* Cloud layer */}
        <mesh ref={cloudsRef} geometry={earthGeometry} scale={1.06}>
          <primitive object={cloudsMaterial} attach="material" />
        </mesh>

        {/* Location Marker */}
        <LocationMarker />

        {/* Atmosphere layers */}
        <mesh scale={[1.06, 1.06, 1.06]}>
          <sphereGeometry args={[2, 96, 96]} />
          <meshBasicMaterial
            color="#6495ED"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh scale={[1.15, 1.15, 1.15]}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshBasicMaterial
            color="#4169E1"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  )
}

// Optimize Earth export component
export const EarthMobile = memo(() => {
  return (
    <Suspense fallback={null}>
      <EarthMobileWithTextures />
    </Suspense>
  )
})
