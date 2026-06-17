import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { scrollState } from '../store'

export default function ClipperModel() {
  const groupRef              = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/modello.glb')
  const { mixer, actions }    = useAnimations(animations, scene)

  /* Raccogliamo tutti i materiali per controllare l'opacità */
  const matsRef = useRef<THREE.MeshStandardMaterial[]>([])

  /* ── Setup: centra, scala, abilita riflessi + trasparenza per il fade ── */
  useEffect(() => {
    const box    = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size   = box.getSize(new THREE.Vector3())
    scene.position.sub(center)
    scene.scale.setScalar(2.8 / Math.max(size.x, size.y, size.z))

    matsRef.current = []
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.envMapIntensity = 1.8
          mat.transparent     = true   // necessario per opacity fade
          mat.opacity         = 1
          mat.needsUpdate     = true
          matsRef.current.push(mat)
        }
      }
    })
  }, [scene])

  /* ── Configura actions: timeScale=0 → aggiorniamo action.time manualmente.
     useAnimations chiama mixer.update(realDelta) internamente ogni frame.
     Con timeScale=0 la formula diventa: newTime = action.time + realDelta×0 = action.time
     → il mixer valuta la pose al time che noi impostiamo, senza avanzare da solo. ── */
  useEffect(() => {
    if (!mixer || Object.keys(actions).length === 0) return
    Object.values(actions).forEach(action => {
      if (!action) return
      action.reset()
      action.play()
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.timeScale = 0
      action.time      = 0
    })
  }, [mixer, actions])

  /* ── Entry animation: zoom-in + rotazione iniziale ── */
  useEffect(() => {
    const g = groupRef.current
    if (!g) return
    g.scale.set(0.001, 0.001, 0.001)
    g.rotation.y = -Math.PI * 0.6
    gsap.to(g.scale,    { x: 1, y: 1, z: 1, duration: 1.8, ease: 'back.out(1.2)', delay: 0.3 })
    gsap.to(g.rotation, { y: 0,            duration: 1.8, ease: 'power3.out',    delay: 0.3 })
  }, [])

  /* ── Frame loop ──
     1. Sincronizza action.time con scrollState.progress (0→1)
     2. Fade out materiali quando progress supera 0.8                        ── */
  useFrame(() => {
    const p = scrollState.progress

    /* Scrubbing: ogni action mappa progress sull'intera durata della clip */
    Object.values(actions).forEach(action => {
      if (action) action.time = p * action.getClip().duration
    })

    /* Fade out modello: da p=0.8 a p=1.0 opacità scende 1→0 */
    const opacity = p < 0.8 ? 1 : Math.max(0, 1 - (p - 0.8) / 0.2)
    matsRef.current.forEach(mat => { mat.opacity = opacity })
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/modello.glb')

