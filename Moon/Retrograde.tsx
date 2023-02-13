import { format, isToday, isWithinInterval } from 'date-fns'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const retrograde = {
  0: { emoji: '➡️', sign: 'NOT in Retrograde' },
  1: { emoji: '⏪', sign: 'In Retrograde' },
}

const mercuryRetrograde = () => {
  let theDate = new Date()

  return isWithinInterval(theDate, {
    start: new Date(2023, 3, 21),
    end: new Date(2023, 4, 14),
  }) ||
    isWithinInterval(theDate, {
      start: new Date(2023, 7, 23),
      end: new Date(2023, 8, 15),
    }) ||
    isWithinInterval(theDate, {
      start: new Date(2023, 11, 13),
      end: new Date(2024, 0, 1),
    })
    ? 1
    : 0
}

export default function MercuryRetrogradeIndicator() {
  const [date, setDate] = useState(new Date())
  const [isMercuryRetrograde, setMercuryRetrograde] = useState(
    mercuryRetrograde()
  )

  useEffect(() => {
    setMercuryRetrograde(mercuryRetrograde())
  }, [date])

  return (
    <div>
      <p>Mercury is</p>
      <motion.div
        initial={{ x: -10, scale: 1.3 }}
        animate={{ x: 20 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          type: 'spring',
          bounce: 0,
        }}
      >
        <p> {retrograde[isMercuryRetrograde].emoji}</p>
      </motion.div>
      <p className="text-black">{retrograde[isMercuryRetrograde].sign}</p>
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
