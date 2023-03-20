import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import React, { useRef } from 'react'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/low_poly_moon.glb') as any
  const meshRef = useRef(null)
  const getInfo = () => {
    console.log(meshRef.current.position)
  }
  return (
    <group {...props} dispose={null}>
      <motion.mesh
        ref={meshRef}
        animate={{ rotateY: 360 }} // Spin the mesh 360 degrees around the Y-axis
        transition={{ ease: 'linear', duration: 50000, repeat: Infinity }} // Set the loop property to Infinity to create a continuous animation loop
        // castShadow
        receiveShadow={true}
        geometry={nodes.Moon.geometry}
        material={nodes.Moon.material}
        onClick={getInfo}
      />
    </group>
  )
}

useGLTF.preload('/models/low_poly_moon.glb')
