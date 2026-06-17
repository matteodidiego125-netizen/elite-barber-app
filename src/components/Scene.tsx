import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import ClipperModel from './ClipperModel'
import { scrollState } from '../store'

/* Luce dinamica che orbita il modello durante la scomposizione */
function DynamicLight() {
  const pointRef  = useRef<THREE.PointLight>(null)
  const accentRef = useRef<THREE.PointLight>(null)

  useFrame(() => {
    const p = scrollState.progress
    if (pointRef.current) {
      const angle = p * Math.PI * 1.8
      pointRef.current.position.set(
        Math.sin(angle) * 3.5,
        1.5 + p * 2.5,
        Math.cos(angle) * 3.5 + 1.5,
      )
      pointRef.current.intensity = 1.2 + p * 5.0
      pointRef.current.color.setHSL(0.12 - p * 0.14, 0.9, 0.65)
    }
    if (accentRef.current) {
      accentRef.current.intensity = Math.max(0, (p - 0.4) / 0.6) * 3.0
    }
  })

  return (
    <>
      <pointLight ref={pointRef}  position={[3, 1.5, 3]}  intensity={1.2} distance={12} />
      <pointLight ref={accentRef} position={[-2, -1, -4]} intensity={0}   color="#6ab4ff" distance={10} />
    </>
  )
}

function Placeholder() {
  return (
    <mesh>
      <cylinderGeometry args={[0.28, 0.38, 1.6, 48]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.08} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <>
      <directionalLight position={[5, 8, 5]}   intensity={2.5} color="#fff5e0" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-5, 3, -2]} intensity={0.7} color="#c0d0ff" />
      <directionalLight position={[0, -4, -6]} intensity={1.5} color="#ffe57f" />
      <ambientLight intensity={0.15} />
      <DynamicLight />
      <Environment preset="studio" />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.45} scale={8} blur={3} far={5} />
      <Suspense fallback={<Placeholder />}>
        <ClipperModel />
      </Suspense>
    </>
  )
}
