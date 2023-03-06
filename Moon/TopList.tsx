import { motion } from 'framer-motion'
import React from 'react'

type Props = { txtColor; bgColor; coinNameMap; newFetch }

function TopList({ txtColor, bgColor, coinNameMap, newFetch }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.8,
        color: txtColor,
        backgroundColor: bgColor,
      }}
      transition={{ duration: 3, delay: 2 }}
      className="fixed left-20 mt-20 hidden flex-col items-center gap-2 border bg-white/80 p-2 uppercase shadow 2xl:flex"
    >
      <h1>👑</h1>
      {Object.values(coinNameMap).map((coin, i) => {
        return (
          <p
            key={i}
            onClick={() => {
              newFetch(coin)
            }}
          >
            {coin?.binance}
          </p>
        )
      })}
    </motion.div>
  )
}

export default TopList
