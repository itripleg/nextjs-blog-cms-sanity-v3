import { motion } from 'framer-motion'
import React from 'react'

type Props = { data }

export default function CoingeckoData({ data }: Props) {
  return (
    <div className="flex flex-col pb-8 text-center lg:p-12">
      <div className="mx-auto flex lg:flex-col">
        <motion.img src={data.image.small} />
      </div>
      <div>
        <p>
          All time high: ${data.market_data.ath.usd.toLocaleString('en-US')}
        </p>
        <p>
          24 Hour High: ${data.market_data.high_24h.usd.toLocaleString('en-US')}
        </p>
        <p>
          24 Hour Low: ${data.market_data.low_24h.usd.toLocaleString('en-US')}
        </p>
        <p>
          Volume: ${data.market_data.total_volume.usd.toLocaleString('en-US')}
        </p>
      </div>
    </div>
  )
}
