import Chart from 'ChartWidget/Chart'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import MoonPhase from './MoonPhase'
import Retrograde from './Retrograde'

type Props = {
  data
  tradeData
  coinId
  pair
  txtColor
  bgColor
}

export default function InitialInfo({
  data,
  tradeData,
  coinId,
  pair,
  txtColor,
  bgColor,
}: Props) {
  const [chartData, setChartData] = useState([])
  const [chartContainer, bounds] = useMeasure()

  useEffect(() => {
    console.log(tradeData)
    setChartData(tradeData)
  }, [tradeData])

  return (
    <>
      {/* Initial page */}
      <div className="overflow-hidden">
        <div className="info">
          <div className="grid grid-cols-2 place-items-center bg-blue-800/20 py-4 text-center">
            <MoonPhase />
            <Retrograde />
          </div>
        </div>
      </div>
      <div className="flex flex-col pb-8 text-center lg:p-12">
        <div className="mx-auto flex lg:flex-col">
          <motion.img src={data.image.small} />
        </div>
        <div>
          <p>
            All time high: ${data.market_data.ath.usd.toLocaleString('en-US')}
          </p>
          <p>
            24 Hour High: $
            {data.market_data.high_24h.usd.toLocaleString('en-US')}
          </p>
          <p>
            24 Hour Low: ${data.market_data.low_24h.usd.toLocaleString('en-US')}
          </p>
          <p>
            Volume: ${data.market_data.total_volume.usd.toLocaleString('en-US')}
          </p>
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex gap-8 overflow-x-scroll text-center scrollbar overflow-y-hidden scrollbar-track-blue-800 scrollbar-thumb-white/60"
            >
              {data?.tickers.map((ticker: any, i: number) => (
                <div key={i} className="p-4">
                  <h1>{ticker.market.name}</h1>
                  <p>${ticker.last.toLocaleString('en-US')}</p>
                  <p>
                    Volume: {Math.floor(ticker.volume).toLocaleString('en-US')}
                  </p>
                </div>
              ))}
            </motion.div>
          </>
        </div>
      </div>
    </>
  )
}
