import { motion } from 'framer-motion'
import { defaultCam, moveCamPosition, moveTarget } from 'utils/CamTools'

type Props = { controlRef; cameraRef; callback; txtColor; setDisplayWindow }

function ButtonControl({
  controlRef,
  cameraRef,
  callback,
  txtColor,
  setDisplayWindow,
}: Props) {
  return (
    <motion.div
      className="fixed right-20 z-20"
      animate={{ color: txtColor }}
      transition={{ delay: 1, duration: 3 }}
    >
      <button
        onClick={() => {
          defaultCam(controlRef, cameraRef)
          setDisplayWindow('home')
        }}
      >
        Home
      </button>
      {/* <button
        onClick={() => {
          moveTarget(controlRef, -666, -666, -666)
          setDisplayWindow('moon')
        }}
      >
        Moon
      </button> */}
      <button
        onClick={() => {
          moveTarget(controlRef, 600, 600, 600)
          moveCamPosition({ cameraRef, x: 666, y: 666, z: 666, scale: 3 })
          setDisplayWindow('')
        }}
      >
        Sundial
      </button>
      {/* <button onClick={() => moveTarget(controlRef, 0, 18, 0)}>Look up</button> */}

      {/* <button onClick={() => moveTarget(controlRef, 0, -5, 0)}>
        Look down
      </button> */}
      <button
        onClick={() => {
          defaultCam(controlRef, cameraRef)
          moveCamPosition({ cameraRef, x: 20, y: 0, z: 2, scale: 3 })
          setDisplayWindow('arb')
        }}
      >
        Arbitrage
      </button>
      <button onClick={() => callback()}>
        {txtColor == '#fff' ? '🌞' : '🌚'}
      </button>
    </motion.div>
  )
}

export default ButtonControl
