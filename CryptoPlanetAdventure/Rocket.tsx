// Rocket.tsx

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface RocketProps {
  target: THREE.Vector3 | null
}

const Rocket = ({ target }: RocketProps) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (!target) {
      return
    }

    // Calculate the direction vector towards the target
    const direction = new THREE.Vector3()
      .copy(target)
      .sub(meshRef.current.position)
      .normalize()

    // Calculate the distance to the target
    const distance = target.distanceTo(meshRef.current.position)

    // If the rocket is not close enough to the target, move towards it
    if (distance > 1) {
      // Move the rocket in the direction of the target
      meshRef.current.position.add(direction.multiplyScalar(0.1))

      // Rotate the rocket to face the direction of movement
      meshRef.current.rotation.z =
        Math.atan2(-direction.y, -direction.x) - Math.PI / 2
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[1, 1, 2]} />
      <meshStandardMaterial color="#EF476F" />
    </mesh>
  )
}

export default Rocket
