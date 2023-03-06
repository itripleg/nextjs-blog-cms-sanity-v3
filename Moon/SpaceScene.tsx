import {
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  Stars,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Moon from 'myModels/Moon'
import Sundial from 'myModels/Sundial'
import { Suspense } from 'react'
import { useRef } from 'react'
import * as cam from 'utils/CamTools'

import Book from './Book'

// import Sundial from '../myModels/Sundial'

type Props = { cameraRef: any; controlRef: any; lightRef: any }

export default function SpaceScene({ cameraRef, controlRef, lightRef }: Props) {
  const positions = { home: [0, 0, 0], sundial: [600, 600, 600] }

  function getMoonPosition(position) {
    // console.log('object position:', position)
    // cam.moveTarget(cameraRef, 0, 0)
  }

  const spotRef = useRef(null)
  function pointSpotlight() {
    spotRef.current.lookAt(positions.sundial)
  }

  return (
    <>
      <Suspense>
        <Canvas className="">
          {/* <Book /> */}
          <Sundial scale={2.5} position={positions.sundial} />
          {/* @ts-ignore */}
          <SpotLight
            ref={spotRef}
            position={[666, 666, 666]}
            lookAt={[0, 1000, 1000]}
            key={undefined}
          />
          <directionalLight
            ref={lightRef}
            intensity={1.5}
            color="#ffeef0"
            position={[-15, 10, 10]}
          />
          <directionalLight
            color="#fff"
            position={[20, -10, 0]}
            intensity={0.1}
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
            position={[0, 0, 0]}
          />
          <Moon scale={50} position={[-100, 120, 150]} />
        </Canvas>
      </Suspense>
    </>
  )
}
