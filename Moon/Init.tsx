import { data } from '@tensorflow/tfjs'
import Chart from 'ChartWidget/Chart'
import { motion } from 'framer-motion'
import React from 'react'
import useMeasure from 'react-use-measure'

import InitialInfo from './InitialInfo'
import PriceHeader from './PriceHeader'

type Props = {}
const [chartContainer, bounds] = useMeasure()

function Init({}: Props) {
  return (
    <>
      <div className="overflow-hidden">
        <PriceHeader data={data} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-4/5 bg-white/30 p-6"
          ref={chartContainer}
        >
          <Chart
            data={tradeData}
            width={Math.floor(bounds.width)}
            // height={Math.floor(bounds.height / 0.9)}
            height={Math.floor(bounds.height)}
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-2 border">
        <div className="col-span-2">
          <InitialInfo
            data={data}
            tradeData={tradeData}
            coinId={coinId}
            pair={pair}
            firstSentence={firstSentence}
            txtColor={txtColor}
            bgColor={bgColor}
          />
        </div>
      </div>
    </>
  )
}

export default Init
