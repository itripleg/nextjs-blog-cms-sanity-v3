import { format } from 'date-fns'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const phases = [
  { emoji: '🌑', sign: 'New Moon' },
  { emoji: '🌒', sign: 'Waxing Crescent' },
  { emoji: '🌓', sign: 'First Quarter' },
  { emoji: '🌔', sign: 'Waxing Gibbous' },
  { emoji: '🌕', sign: 'Full Moon' },
  { emoji: '🌖', sign: 'Waning Gibbous' },
  { emoji: '🌗', sign: 'Third Quarter' },
  { emoji: '🌘', sign: 'Waning Crescent' },
]

const getMoonPhase = () => {
  const now = new Date()
  const unixDate = now.getTime() / 1000
  const lunarDays = 29.53058770576
  const lunarSecs = lunarDays * 24 * 60 * 60
  const new2000 = new Date('2000-01-06 18:14').getTime() / 1000
  const totalSecs = unixDate - new2000
  let currentSecs = totalSecs % lunarSecs

  if (currentSecs < 0) {
    currentSecs += lunarSecs
  }

  const currentFrac = currentSecs / lunarSecs
  const currentDays = currentFrac * lunarDays
  const phaseIntervals = [
    [0, 1],
    [1, 6.38264692644],
    [6.38264692644, 8.38264692644],
    [8.38264692644, 13.76529385288],
    [13.76529385288, 15.76529385288],
    [15.76529385288, 21.14794077932],
    [21.14794077932, 23.14794077932],
    [23.14794077932, 28.53058770576],
    [28.53058770576, 29.53058770576],
  ]

  for (let i = 0; i < phaseIntervals.length; i++) {
    const [start, end] = phaseIntervals[i]
    const tolerance = 0.01

    if (Math.abs(currentDays - start) < tolerance) {
      return i
    }

    if (currentDays >= start && currentDays < end) {
      return i
    }
  }
}

export default function Moon() {
  const [date, setDate] = useState(new Date())
  const [moonPhaseIndex, setMoonPhaseIndex] = useState(getMoonPhase())

  useEffect(() => {
    setMoonPhaseIndex(getMoonPhase())
  }, [date])

  return (
    <div className="py-2">
      <p className="">Moon Phase</p>
      <motion.div
        initial={{ scale: 2 }}
        animate={{ scale: 1.7 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatType: 'reverse',
          // ease: 'easeInOut',
        }}
      >
        <p className="text-4xl">{phases[moonPhaseIndex].emoji}</p>
      </motion.div>
      <p>{phases[moonPhaseIndex].sign}</p>
      {/* <p>Today is {format(date, 'MMMM do, yyyy')}</p> */}
      <style jsx>{`
        p {
          color: white;
          font-size: 20px;
        }
      `}</style>
    </div>
  )
}
