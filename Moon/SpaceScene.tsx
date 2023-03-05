import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Moon from 'myModels/Moon'
import { Suspense } from 'react'
import * as cam from 'utils/CamTools'

type Props = { cameraRef: any; controlRef: any; lightRef: any }

export default function SpaceScene({ cameraRef, controlRef, lightRef }: Props) {
  function getMoonPosition(position) {
    // console.log('object position:', position)
    // cam.moveTarget(cameraRef, 0, 0)
  }
  return (
    <>
      <Suspense>
        <Canvas className="">
          <directionalLight
            ref={lightRef}
            intensity={2}
            color="#eeffff"
            position={[-15, 10, 10]}
          />
          <directionalLight
            color="#fff"
            position={[20, -10, 0]}
            intensity={0}
          />
          <Stars />
          {/* <ambientLight intensity={2000} /> */}
          <OrbitControls
            ref={controlRef}
            autoRotate={false}
            autoRotateSpeed={0.1}
          />
          {/* @ts-ignore */}
          <PerspectiveCamera
            position={[0, 0, 10]}
            ref={cameraRef}
            makeDefault
          />
          <Moon
            onClick={getMoonPosition}
            color="blue"
            scale={3.4}
            position={[4, 0, 0]}
          />
          <Moon scale={50} position={[100, 120, 150]} />
        </Canvas>
      </Suspense>
    </>
  )
}
