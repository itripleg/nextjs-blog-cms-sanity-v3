import { data } from '@tensorflow/tfjs'
import { motion } from 'framer-motion'
import React from 'react'

type Props = { data }

function PriceHeader({ data }: Props) {
  return (
    <div className="overflow-hidden p-4 text-center text-6xl">
      <div className="flex items-center justify-center gap-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          ${data?.market_data.current_price.usd.toLocaleString('en-US')}
        </motion.div>
        <motion.div
          initial={{ x: -80, scale: 1.5, type: 'spring' }}
          animate={{ x: 0, scale: 1, type: 'spring' }}
          transition={{ delay: 3, bounce: 1, duration: 1 }}
        >
          <motion.img
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              // type: 'spring',
            }}
            src={data?.image.small}
            alt="logo"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default PriceHeader
