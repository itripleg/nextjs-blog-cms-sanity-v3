import { motion } from 'framer-motion'
import React from 'react'

interface MoonPhaseProps {
  lastNewMoon: Date
}

const MoonPhase: React.FC<MoonPhaseProps> = ({ lastNewMoon }) => {
  const synodicMonth = 29.530588853 // length of a synodic month in days
  const now = new Date()
  const timeSinceLastNewMoon =
    (now.getTime() - lastNewMoon.getTime()) / 86400000
  const moonAge = timeSinceLastNewMoon % synodicMonth
  const moonPhase = (moonAge / synodicMonth) * 8

  const phases = [
    { name: 'New Moon', emoji: '🌑' },
    { name: 'Waxing Crescent', emoji: '🌒' },
    { name: 'First Quarter', emoji: '🌓' },
    { name: 'Waxing Gibbous', emoji: '🌔' },
    { name: 'Full Moon', emoji: '🌕' },
    { name: 'Waning Gibbous', emoji: '🌖' },
    { name: 'Third Quarter', emoji: '🌗' },
    { name: 'Waning Crescent', emoji: '🌘' },
  ]

  const phaseIndex = Math.floor(moonPhase)
  const currentPhase = phases[phaseIndex]
  let daysUntilNextFullMoon = 0
  if (currentPhase.name !== 'Full Moon') {
    if (phaseIndex < 4) {
      daysUntilNextFullMoon =
        (4 - phaseIndex) * (synodicMonth / 8) -
        (phaseIndex * (synodicMonth / 8) - moonAge)
    } else {
      daysUntilNextFullMoon =
        (4 - phaseIndex + 8) * (synodicMonth / 8) -
        (phaseIndex * (synodicMonth / 8) - moonAge)
    }
  }

  return (
    <div className="py-2">
      <p className="">Moon Phase</p>
      <motion.div
        initial={{ scale: 1.7 }}
        animate={{ scale: 2 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <p className="text-4xl">{currentPhase.emoji}</p>
      </motion.div>
      <p>{currentPhase.name} </p>
      <p className="hidden">
        There are {daysUntilNextFullMoon.toFixed(2)} days until the next full
        moon.
      </p>
      <style jsx>{`
        p {
          color: white;
          font-size: 20px;
        }
      `}</style>
    </div>
  )
}

export default MoonPhase
