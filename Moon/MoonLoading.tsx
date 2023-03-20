import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

function MoonLoading({}: Props) {
  return (
    <div className="-mt-36 flex h-screen items-center justify-center text-center">
      <motion.p
        animate={{ rotateY: 180 }}
        transition={{ duration: 0.2 }}
        initial={{ rotateY: 0 }}
      >
        🧙🏾‍♂️
      </motion.p>
      <motion.p
        animate={{ rotateY: 360 }}
        transition={{
          delay: 0.3,
          repeat: Infinity,
          duration: 0.5,
          type: 'reverse',
        }}
      >
        🔮
      </motion.p>
      <motion.p
        animate={{ scale: 10, y: -720 }}
        transition={{ duration: 2.11 }}
      >
        🌚
      </motion.p>
    </div>
  )
}

export default MoonLoading
