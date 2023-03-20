import { useAnimations, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import React, { useRef } from 'react'
import { useEffect } from 'react'

export default function Model(props) {
  const group = useRef()

  const { nodes, materials, animations } = useGLTF('/models/planet.glb') as any
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    console.log(actions)
    // actions?.Animation.play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-1.54, -0.06, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Clouds_1" rotation={[0.38, 0.42, 0.04]}>
                <motion.mesh
                  animate={{ opacity: 0, rotateY: 360 }} // Spin the mesh 360 degrees around the Y-axis
                  transition={{
                    ease: 'linear',
                    duration: 50000,
                    repeat: Infinity,
                  }}
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.Clouds}
                />
              </group>
              <group name="Planet_2" rotation={[0.42, -0.55, 0.04]}>
                <motion.mesh
                  animate={{ opacity: 0, rotateY: 360 }} // Spin the mesh 360 degrees around the Y-axis
                  transition={{
                    ease: 'linear',
                    duration: 50000,
                    repeat: Infinity,
                  }}
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.Planet}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/planet.glb')
