import { motion } from 'framer-motion'
import { defaultCam, moveCamPosition, moveTarget } from 'utils/CamTools'

type Props = {
  controlRef
  cameraRef
  callback
  txtColor
  setDisplayWindow
}

function ButtonControl({
  controlRef,
  cameraRef,
  callback,
  txtColor,
  setDisplayWindow,
}: Props) {
  return (
    <motion.div
      className="z-20"
      animate={{ color: txtColor }}
      transition={{ delay: 1, duration: 3 }}
    >
      <button
        onClick={() => {
          defaultCam(controlRef, cameraRef)
          setDisplayWindow('home')
          controlRef.current.autoRotate = false
        }}
      >
        Home
      </button>

      {/* <button onClick={() => moveTarget(controlRef, 0, 18, 0)}>Look up</button> */}

      {/* <button onClick={() => moveTarget(controlRef, 0, -5, 0)}>
        Look down
      </button> */}
      <button
        onClick={() => {
          // defaultCam(controlRef, cameraRef)
          moveTarget(controlRef, 0, 0, 0)
          // controlRef.current.autoRotate = false
          moveCamPosition({ cameraRef, x: 20, y: 0, z: 2, scale: 3 })
          setDisplayWindow('arb')
          cameraRef.current.autoRotate = false
        }}
      >
        Arbitrage
      </button>
      {/* <button
        onClick={() => {
          // defaultCam(controlRef, cameraRef)
          moveTarget(controlRef, 200, 100, 0)
          // controlRef.current.autoRotate = false
          // moveCamPosition({ cameraRef, x: 0, y: 0, z: 0, scale: 1 })
          moveCamPosition({ cameraRef, x: 211, y: 100, z: 100, scale: 0.5 })
          setDisplayWindow('contract')
          cameraRef.current.autoRotate = false
        }}
      >
        Interface
      </button> */}
      <button
        onClick={() => {
          moveTarget(controlRef, -100, 0, 0)
          moveCamPosition({ cameraRef, x: 600, y: 666, z: 500, scale: 3 })
          // moveCamPosition({ cameraRef, x: 0, y: 0, z: 0, scale: 3 })
          setDisplayWindow('ouija')
          controlRef.current.autoRotate = true
        }}
      >
        Ouija
      </button>
      <button
        onClick={() => {
          moveTarget(controlRef, 0, 0, 0)
          moveCamPosition({ cameraRef, x: -50, y: 150, z: 600, scale: 3 })
          // moveCamPosition({ cameraRef, x: 0, y: 0, z: 0, scale: 3 })
          setDisplayWindow('about')
          controlRef.current.autoRotate = false
        }}
      >
        About
      </button>
      {/* <button onClick={() => callback()}>
        {txtColor == '#fff' ? '🌞' : '🌚'}
      </button> */}
    </motion.div>
  )
}

export default ButtonControl
