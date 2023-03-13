import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import InitialInfo from './InitialInfo'

type Props = {}
function Arbiter({}: Props) {
  const [networks, setNetworks] = useState([])
  const [dexes, setDexes] = useState([])
  const [pools, setPools] = useState([])

  const getNetworks = async () => {
    const res = await fetch('https://api.geckoterminal.com/api/v2/networks/')
    const networks = await res.json()
    //   setData(networks.data[0].id)
    setNetworks(networks.data)
    console.log('networks', networks)
  }

  const getDexes = async () => {
    const res = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/polygon_pos/dexes`
    )
    const dexes = await res.json()
    setDexes(dexes.data)
    console.log('dexes', dexes)
  }

  const getPools = async () => {
    const res = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/polygon_pos/pools`
    )
    const pools = await res.json()
    setPools(pools.data)
  }

  useEffect(() => {
    getNetworks()
    getDexes()
    getPools()
  }, [])

  return (
    <div className="w-[500px] border">
      <motion.div
        animate={{ backgroundColor: '#000', opacity: 0.7 }}
        // animate={{ backgroundColor: '#886CE4', opacity: 0.7 }}
        className="grid  grid-cols-2 gap-4 overflow-scroll rounded-md p-4 text-center text-white"
      >
        <h1 className="col-span-2 text-center">Arbitrary Arbitrage</h1>

        <div className="col-span-2 hidden">
          <h1 className="">Networks</h1>
          {networks.slice(0, 20).map((network) => (
            <>
              <div key={network.id}>
                {network.attributes.name + ' - ' + network.id}
              </div>
            </>
          ))}
        </div>
        <div className="col-span-2">
          <h1 className="opacity-0">Polygon Dexes</h1>
          {dexes.slice(0, 20).map((dex) => (
            <div key={dex.id}>{dex.attributes.name + ' - ' + dex.id}</div>
          ))}
        </div>
        <div className="col-span-2">
          <h1 className="opacity-0">Polygon Pools</h1>
          {pools.slice(0, 20).map((pool) => (
            <div key={pool.id}>{pool.attributes.name + ' - ' + pool.id}</div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Arbiter
