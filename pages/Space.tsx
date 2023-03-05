import { motion } from 'framer-motion'
import gsap from 'gsap'
import ButtonControl from 'Moon/ButtonControl'
import SpaceScene from 'Moon/SpaceScene'
import React, { useRef, useState } from 'react'
import * as cam from 'utils/CamTools'

type Props = {}

export default function Space({}: Props) {
  const cameraRef = useRef(null)
  const controlRef = useRef(null)
  const lightRef = useRef(null)

  const times = { day: '#fff', night: '#000' }
  const [time, setTime] = useState('#fff')

  const dayNight = () => {
    setTime(time == times.day ? times.night : times.day)

    const newIntensity = time == times.day ? 0.3 : 1
    gsap.to(lightRef.current, {
      intensity: newIntensity,
      duration: 2.5,
    })
  }
  return (
    <motion.div
      initial={{ color: '#000' }}
      animate={{ backgroundColor: time }}
      transition={{ delay: 0, duration: 3 }}
      className="h-screen"
    >
      <ButtonControl
        txtColor={time}
        callback={dayNight}
        controlRef={controlRef}
        cameraRef={cameraRef}
      />

      <SpaceScene
        lightRef={lightRef}
        cameraRef={cameraRef}
        controlRef={controlRef}
      />
    </motion.div>
  )
}
