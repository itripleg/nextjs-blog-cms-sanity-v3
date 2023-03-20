import {
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  Stars,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { animationControls, useAnimation } from 'framer-motion'
import gsap from 'gsap'
import Moon from 'myModels/Moon'
import Planet from 'myModels/Planet'
// import OuijaBoard from 'ouija/OuijaBoard'
import { Suspense } from 'react'
import { useRef } from 'react'

// import Sundial from '../myModels/Sundial'

type Props = { cameraRef: any; controlRef: any; lightRef: any }

export default function SpaceScene({ cameraRef, controlRef, lightRef }: Props) {
  const positions = {
    home: [0, 0, 0],
    sundial: [600, 610, 600],
    ouija: [200, 200, 200],
  }

  function getMoonPosition(position) {
    // console.log('object position:', position)
    // cam.moveTarget(cameraRef, 0, 0)
  }

  const spotRef = useRef(null)
  function pointSpotlight(position) {
    console.log(spotRef.current)
    gsap.to(spotRef.current.target.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 2,
    })
  }
  const animationControls = useAnimation()
  return (
    <>
      <Suspense>
        <Canvas className="">
          {/* <Flecha
            animationControls={animationControls}
            position={positions.ouija}
          />
          <OuijaBoard position={positions.ouija} /> */}

          {/* <Book /> */}
          {/* <Sundial
            scale={2.5}
            position={positions.sundial}
            onClick={() => pointSpotlight(positions.sundial)}
          /> */}
          {/* @ts-ignore */}
          <SpotLight
            ref={spotRef}
            position={[666, 666, 666]}
            lookAt={[0, 1000, 1000]}
            key={undefined}
            color={'white'}
            angle={1}
            intensity={1}
            attenuation={150}
            distance={150}
            anglePower={5}
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
            autoRotateSpeed={0.04}
            enablePan={false}
            enableRotate={false}
            enableZoom={false}
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
          <Planet scale={100} />
        </Canvas>
      </Suspense>
    </>
  )
}
