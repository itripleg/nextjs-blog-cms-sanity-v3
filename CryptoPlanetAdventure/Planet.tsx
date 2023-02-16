//Planet.tsx

import { useFrame, useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useRef } from 'react'
import { TextureLoader } from 'three'

const Planet = ({
  position,
  size,
  color,
  ringSize,
  ringColor,
  ringNoise,
  onPlanetClick,
}) => {
  const planetRef = useRef()
  const ringRef = useRef()

  useFrame(() => {
    if (planetRef.current && ringRef.current) {
      // @ts-ignore
      planetRef.current.rotation.y += 0.002
      // @ts-ignore
      ringRef.current.rotation.y -= 0.003
    }
  })

  return (
    <>
      <motion.mesh
        position={position}
        ref={planetRef}
        onClick={() => {
          console.log('Planet clicked!')
          onPlanetClick(position)
        }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      >
        <sphereBufferGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </motion.mesh>
      <mesh position={position} ref={ringRef}>
        <torusBufferGeometry
          args={[size + ringSize, ringSize, 64, 64]}
          attach="geometry"
          onUpdate={(geometry) => {
            const pos = geometry.attributes.position
            const len = pos.count
            const amp = ringNoise
            for (let i = 0; i < len; i++) {
              const x = pos.getX(i)
              const y = pos.getY(i)
              const z = pos.getZ(i)
              const noise = amp * (0.5 - Math.random())
              pos.setXYZ(i, x + noise, y + noise, z + noise)
            }
            pos.needsUpdate = true
          }}
        />
        <meshStandardMaterial color={ringColor} />
      </mesh>
    </>
  )
}

export default Planet
