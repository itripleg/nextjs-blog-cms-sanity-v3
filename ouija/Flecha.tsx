import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import React, { useEffect } from 'react'

export function Flecha({ animationControls }, props: any) {
  const { nodes, materials } = useGLTF('/models/Flecha.glb') as any

  const positions = {
    spin: { rotateZ: Math.PI * 2, transition: { duration: 3 } },
    default: { x: -2.6, y: -1.6, z: 0, transition: { duration: 1 } },
    yes: { x: -4.6, y: 0, transition: { duration: 1 } },
    no: { x: -3.9, y: 1.6, transition: { duration: 3 } },
    goodbye: { x: -3.9, y: -1.6, transition: { duration: 3 } },
    // 0: { x: -8.3, y: -1.1 },
    1: { x: -8.3, y: -1.1 },
    2: { x: -7.85, y: -1.1 },
    3: { x: -7.4, y: -1.1 },
    4: { x: -6.87, y: -1.1 },
    5: { x: -6.38, y: -1.1 },
    6: { x: -5.89, y: -1.1 },
    7: { x: -5.42, y: -1.1 },
    8: { x: -4.9, y: -1.1 },
    9: { x: -4.44, y: -1.1 },
    0: { x: -4, y: -1.1 },
    a: { x: -9.2, y: 0.1 },
    b: { x: -8.65, y: 0.35 },
    c: { x: -8.1, y: 0.5 },
    d: { x: -7.65, y: 0.65 },
    e: { x: -7.1, y: 0.75 },
    f: { x: -6.65, y: 0.85 },
    g: { x: -6.15, y: 0.86 },
    h: { x: -5.55, y: 0.85 },
    i: { x: -5.1, y: 0.75 },
    j: { x: -4.7, y: 0.65 },
    k: { x: -4.2, y: 0.5 },
    l: { x: -3.8, y: 0.35 },
    m: { x: -3.15, y: 0.14 },
    n: { x: -9.07, y: -0.75 },
    o: { x: -8.6, y: -0.5 },
    p: { x: -8.2, y: -0.3 },
    q: { x: -7.7, y: -0.1 },
    r: { x: -7.2, y: 0.08 },
    s: { x: -6.7, y: 0.1 },
    t: { x: -6.2, y: 0.25 },
    u: { x: -5.68, y: 0.21 },
    v: { x: -5.12, y: 0.1 },
    w: { x: -4.6, y: 0 },
    x: { x: -4, y: -0.19 },
    y: { x: -3.5, y: -0.37 },
    z: { x: -3.1, y: -0.71 },
  }
  function spin() {
    animationControls.start('spin')
  }
  return (
    <group {...props} dispose={null}>
      <motion.mesh
        animate={animationControls}
        onClick={() => spin()}
        // transition={{ duration: 0.3 }}
        variants={positions}
        castShadow
        receiveShadow
        geometry={nodes.Flecha.geometry}
        material={materials.defaultMat}
        rotation={[Math.PI / 2, 0, 0]}
        position={[
          positions.default.x,
          positions.default.y,
          positions.default.z,
        ]}
      />
    </group>
  )
}

useGLTF.preload('/models/Flecha.glb')
