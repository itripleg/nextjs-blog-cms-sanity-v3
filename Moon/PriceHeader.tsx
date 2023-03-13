import { data } from '@tensorflow/tfjs'
import { motion } from 'framer-motion'
import React from 'react'

type Props = { data; bgColor }

function PriceHeader({ data, bgColor }: Props) {
  // returns just the first sentence of the coin description
  // can be buggy if the first sentence has a e.g. URL
  function getFirstSentence(paragraph: string) {
    const firstSentence = paragraph.match(/^[^\.\?!]*/)[0]
    return firstSentence + '.'
  }
  const firstSentence = data ? getFirstSentence(data?.description.en) : null
  return (
    <div className=" p-8 text-center text-6xl">
      <div className="flex items-center justify-center gap-4 p-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          ${data?.market_data.current_price.usd.toLocaleString('en-US')}
        </motion.div>
        <motion.div
          initial={{ x: -80, scale: 1.5, type: 'spring' }}
          animate={{ x: 0, scale: 1, type: 'spring' }}
          transition={{ delay: 3, bounce: 1, duration: 1 }}
          className="h-12"
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
      <div className="">
        <motion.p
          initial={{ opacity: 0, backgroundColor: '#fff' }}
          animate={{ opacity: 0.7, backgroundColor: bgColor }}
          transition={{ delay: 2, duration: 2 }}
          className="p-8 text-center text-sm shadow"
        >
          {firstSentence}
        </motion.p>
      </div>
    </div>
  )
}

export default PriceHeader
