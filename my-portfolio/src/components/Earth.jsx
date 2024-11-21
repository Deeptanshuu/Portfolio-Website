/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, Suspense, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

// Add this near the top with other constants
const EARTH_SPHERE = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ visible: false })
)

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

const earthGeometry = new THREE.SphereGeometry(2, 256, 256)

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

  // Optimize frame updates with RAF limiting
  const frameCount = useRef(0)
  const FPS_LIMIT = 60
  const FPS_INTERVAL = 1000 / FPS_LIMIT

  useFrame(({ clock, mouse: mouseCursor, camera, raycaster }) => {
    frameCount.current++
    if (frameCount.current % 1 !== 0) return

    const time = clock.getElapsedTime()
    
    // Simple constant auto-rotation
    const rotationSpeed = 0.005
    autoRotate.current.y += rotationSpeed
    
    const group = earthRef.current.parent
    group.rotation.y = autoRotate.current.y
    
    if (earthDotsRef.current) {
      earthDotsRef.current.rotation.y = time * 0.05
      earthDotsRef.current.material.uniforms.uTime.value = time
    }

    earthRef.current.material.uniforms.uTime.value = time

    // Keep the mouse intersection for dot raising effect
    raycaster.setFromCamera(mouseCursor, camera)
    const intersects = raycaster.intersectObject(EARTH_SPHERE)
    
    if (earthDotsRef.current) {
      if (intersects.length > 0) {
        // Mouse is over Earth - update hover position
        earthDotsRef.current.material.uniforms.uMousePosition.value.copy(intersects[0].point)
      } else {
        // Mouse is not over Earth - reset hover position far away
        earthDotsRef.current.material.uniforms.uMousePosition.value.set(1000, 1000, 1000)
      }
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
        uDisplacementScale: { value: 0.45 },
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
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [normalMap, displacementMap, specularMap])

  // Add this near other material uniforms in EarthWithTextures
  const dotsShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 5 },
        uSize: { value: 18.0 },
        uDisplacementMap: { value: displacementMap },
        uDisplacementScale: { value: 0.55 },
        uOceanColor: { value: new THREE.Color('#003366') },
        uTerrainColor: { value: new THREE.Color('#66ccff') },
        uHighlightColor: { value: new THREE.Color('#ffffff') },
        uOutlineColor: { value: new THREE.Color('#ffffff') },
        uOutlineStrength: { value: 1.0 },
        uMousePosition: { value: new THREE.Vector3() },
        uHoverRadius: { value: 1.5 },
        uHoverStrength: { value: 0.3 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        uniform sampler2D uDisplacementMap;
        uniform float uDisplacementScale;
        uniform vec3 uMousePosition;
        uniform float uHoverRadius;
        uniform float uHoverStrength;
        
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
          
          // Calculate distance to mouse position in world space
          vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
          float distanceToMouse = distance(worldPosition.xyz, uMousePosition);
          float hoverEffect = smoothstep(uHoverRadius, 0.0, distanceToMouse);
          
          // Add hover elevation to displacement
          vec3 displaced = pos + normal * (elevation * uDisplacementScale + hoverEffect * uHoverStrength);
          
          vec4 modelPosition = modelMatrix * vec4(displaced, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          
          float sizeVariation = 1.0 + elevation * 3.0 + hoverEffect * 10.0; // Increase size on hover
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
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;

        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 1.8);
          
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
          
          float outlineStart = 0.2; // Elevation where terrain starts
          float outlineWidth = 0.05; // Width of the outline
          float elevationGradient = abs(dFdx(vElevation)) + abs(dFdy(vElevation));
          float isOutline = smoothstep(0.0, 0.8, elevationGradient) * 
                           step(outlineStart - outlineWidth, vElevation) * 
                           uOutlineStrength;
          
          color = mix(color, uOutlineColor, isOutline);
          
          float alpha = strength * (0.8 + vElevation * 0.8);
          alpha = mix(alpha, 1.0, isOutline * 0.7);
          
          if (strength < 0.05) discard;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [displacementMap])

  return (
    <group position={[0, 0, -8]} scale={1.75}>
      <primitive object={EARTH_SPHERE} />
      
      <ambientLight intensity={1} />

      {/* Earth base */}
      <points ref={earthRef} geometry={useMemo(() => createInstancedPoints(earthGeometry), [])}>
        <primitive object={earthMaterial} attach="material" />
      </points>

      {/* Earth dots with hover effect */}
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