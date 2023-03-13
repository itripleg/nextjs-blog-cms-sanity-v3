import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

function ArbitrageCalculator(txtColor: any, bgColor: any) {
  const [networks, setNetworks] = useState([])
  const [dexes, setDexes] = useState({}) // cache for fetched dexes
  const [targetDex, setTargetDex] = useState()
  const [pools, setPools] = useState([])
  const [targetNetwork, setTargetNetwork] = useState('eth')
  const [price1, setPrice1] = useState(0)
  const [price2, setPrice2] = useState(0)
  const [tokenAmount, setTokenAmount] = useState(0)
  const [percentageDifference, setPercentageDifference] = useState(0)
  const [potentialProfit, setPotentialProfit] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  const getNetworks = async () => {
    const res = await fetch('https://api.geckoterminal.com/api/v2/networks/')
    const networks = await res.json()
    setNetworks(networks.data)
  }

  const getDexes = async (networkId) => {
    if (!dexes[networkId]) {
      // check if the dexes for this network have already been fetched
      const res = await fetch(
        `https://api.geckoterminal.com/api/v2/networks/${networkId}/dexes`
      )
      const dexes = await res.json()
      setDexes((prevDexes) => ({ ...prevDexes, [networkId]: dexes.data })) // update the cache
    }
  }

  const getPools = useCallback(async () => {
    const res = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/${targetNetwork}/pools`
    )
    const pools = await res.json()
    setPools(pools.data)
  }, [targetNetwork])

  useEffect(() => {
    getNetworks()
    getPools()
  })

  const calculateArbitrage = () => {
    const cost1 = price1 * tokenAmount
    const cost2 = price2 * tokenAmount
    const difference = Math.abs(cost1 - cost2)
    const average = (cost1 + cost2) / 2
    const percentageDifference = (difference / average) * 100
    setPercentageDifference(percentageDifference)

    const profit = Math.abs(cost1 - cost2)
    const fee = profit * 0.0009 // Aave fee is 0.09%
    const totalCost = profit + fee
    setPotentialProfit(profit - fee)
    setTotalCost(totalCost)
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <div>
        <h1 className="">Networks</h1>
        <p className="pb-4 underline">
          Target: <span>{targetNetwork}</span>
        </p>
        <div className="h-[250px] max-w-2xl border p-2 scrollbar">
          {networks.slice(0, 100).map((network) => (
            <div
              className="cursor-pointer py-1"
              key={network.id}
              onClick={async () => {
                setTargetNetwork(network.id)
                await getDexes(network.id)
                // await getPools()
              }}
            >
              {network.attributes.name + ' - ' + network.id}
            </div>
          ))}
        </div>
      </div>
      {dexes[targetNetwork] && (
        <div>
          <h1 className="">Dexes</h1>
          <p className="pb-4 underline">Target: {targetDex}</p>
          <div className="h-[250px] max-w-2xl border p-2 scrollbar">
            {dexes[targetNetwork].slice(0, 100).map((dex) => (
              <div
                className="cursor-pointer py-1"
                key={dex.id}
                onClick={() => {
                  setTargetDex(dex.id)
                  getPools()
                }}
              >
                {dex.attributes.name}
                {dex.type}
              </div>
            ))}
          </div>
        </div>
      )}
      {dexes[targetNetwork] && (
        <div className="col-span-2">
          <h1>Top {targetNetwork} Pools</h1>
          <p className="pb-4 underline" onClick={getPools}>
            Refresh
          </p>
          <div className="flex">
            <div className="h-[250px] max-w-2xl border p-2 scrollbar">
              {pools.slice(0, 100).map((pool) => (
                <div key={pool.id}>
                  {pool.attributes.name + ' - ' + pool.id}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="col-span-full p-12">
        <motion.div
          className="flex gap-4 p-2"
          animate={{ color: bgColor, backgroundColor: bgColor }}
        >
          <p className="px-2 text-center">
            Price on Dex A:
            <motion.input
              className="text-center"
              animate={{ color: 'black', backgroundColor: bgColor }}
              type="number"
              defaultValue={price1}
              onChange={(e) => {
                setPrice1(parseFloat(e.target.value))
                calculateArbitrage()
              }}
            />
          </p>
          <p className="px-2 text-center">
            Price on Dex B:
            <motion.input
              className="text-center"
              animate={{ color: 'black', backgroundColor: bgColor }}
              type="number"
              value={price2}
              onChange={(e) => {
                setPrice2(parseFloat(e.target.value))
                calculateArbitrage()
              }}
            />
          </p>
          <p className="px-2 text-center">
            Token amount:{' '}
            <motion.input
              className="text-center"
              animate={{ color: 'black' }}
              type="number"
              value={tokenAmount}
              onChange={(e) => {
                setTokenAmount(parseFloat(e.target.value))
                calculateArbitrage()
              }}
            />
          </p>
          <div>
            Percentage difference: {percentageDifference.toFixed(2)}%<br />
            Potential profit: ${potentialProfit.toFixed(2)}
            <br />
            Total cost including fee: ${totalCost.toFixed(2)}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ArbitrageCalculator
