import { format, isToday, isWithinInterval } from 'date-fns'
import { useEffect, useState } from 'react'

const retrograde = {
  0: { emoji: '➡️', sign: 'Not in Retrograde' },
  1: { emoji: '⏪', sign: 'In Retrograde' },
}

const marsRetrograde = () => {
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
  const [isMercuryRetrograde, setMercuryRetrograde] = useState(marsRetrograde())

  useEffect(() => {
    setMercuryRetrograde(marsRetrograde())
  }, [date])

  return (
    <div>
      <p>Mercury Retrograde: {retrograde[isMercuryRetrograde].emoji}</p>
      <p>Status: {retrograde[isMercuryRetrograde].sign}</p>
      <p>Today is {format(date, 'MMMM do, yyyy')}</p>
    </div>
  )
}
