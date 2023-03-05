import { motion } from 'framer-motion'
import { defaultCam, moveCamPosition, moveTarget } from 'utils/CamTools'

type Props = { controlRef; cameraRef; callback; txtColor }

function ButtonControl({ controlRef, cameraRef, callback, txtColor }: Props) {
  return (
    <motion.div className="fixed right-20 z-20" animate={{ color: txtColor }}>
      <button onClick={() => defaultCam(controlRef, cameraRef)}>Home</button>
      <button onClick={() => moveTarget(controlRef, 0, 18, 0)}>Look up</button>

      <button onClick={() => moveTarget(controlRef, 0, -5, 0)}>
        Look down
      </button>
      <button
        onClick={() =>
          moveCamPosition({ cameraRef, x: 20, y: 0, z: 2, scale: 3 })
        }
      >
        Move right
      </button>
      <button onClick={() => callback()}>🌞</button>
    </motion.div>
  )
}

export default ButtonControl
