import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import Interface from './Interface'
import MoonPhase from './MoonPhase'
import Retrograde from './Retrograde'

type Props = {}
function Arbiter({}: Props) {
  const [networks, setNetworks] = useState([])
  const [dexes, setDexes] = useState([])
  const [pools, setPools] = useState([])
  const [targetNetwork, setTargetNetwork] = useState(null)
  const [targetDex, setTargetDex] = useState(null)

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
    // getNetworks()
    // getDexes()
    // getPools()
  }, [])

  return (
    <div className="max-h-screen w-[800px] ">
      <motion.div
        animate={{ backgroundColor: '#000', opacity: 0.7 }}
        // animate={{ backgroundColor: '#886CE4', opacity: 0.7 }}
        className="grid grid-cols-2 gap-4 overflow-y-scroll rounded-md p-4 text-center text-white scrollbar"
      >
        <h1 className="col-span-2 text-center opacity-20">
          Arbitrary Arbitrage
        </h1>

        <p className="flex items-center justify-center p-2 text-center text-xs">
          Currently focused on the Polygon network but a lot more coming. Still
          need to get current prices across all dexes. Planning to create a
          smart contract interface here as well.
        </p>
        <div className="grid grid-cols-2 place-items-center bg-blue-800/20 py-4 text-center">
          {/* <MoonPhase />
          <Retrograde /> */}
          <Interface />
        </div>
        <div className="col-span-2 h-20 overflow-hidden scrollbar scrollbar-thumb-white">
          <h1 className="">Networks</h1>
          <div className="overflow-y-scroll">
            {networks.slice(0, 100).map((network) => (
              <div key={network.id}>
                {network.attributes.name + ' - ' + network.id}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex content-center items-center justify-center">
          <div className="col-span-3 flex border p-4">
            <div className="p-4">
              <h1 className="col-span-2">Polygon Dexes</h1>
              {dexes.slice(0, 15).map((dex) => (
                <div key={dex.id}>{dex.attributes.name + ' - ' + dex.id}</div>
              ))}
            </div>
            <div className="col-span-2">
              {dexes.slice(15, 30).map((dex) => (
                <div key={dex.id}>{dex.attributes.name + ' - ' + dex.id}</div>
              ))}
            </div>
          </div>
          <div className="col-span-2 ">
            <h1 className="opacity-0">Polygon Pools</h1>
            <div className="flex">
              <div className="p-4">
                {pools.slice(0, 10).map((pool) => (
                  <div key={pool.id}>
                    {pool.attributes.name + ' - ' + pool.id}
                  </div>
                ))}
              </div>
              <div>
                {pools.slice(10, 20).map((pool) => (
                  <div key={pool.id}>
                    {pool.attributes.name + ' - ' + pool.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Arbiter
