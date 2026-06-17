import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import Scene from './Scene'

export default function HeroCanvas() {
  /* Forza resize per risolvere canvas 300×150 in certi ambienti */
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event('resize')), 100)
    return () => clearTimeout(id)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, toneMapping: 4 /* ACESFilmic */ }}
      dpr={[1, 2]}
      shadows
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
