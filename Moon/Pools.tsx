import { useEffect, useState } from 'react'

const getPools = async (targetNetwork) => {
  const res = await fetch(
    `https://api.geckoterminal.com/api/v2/networks/${targetNetwork}/pools`
  )
  const pools = await res.json()
  return pools.data
}

const getCachedPools = (targetNetwork) => {
  const cachedPools = localStorage.getItem(`pools-${targetNetwork}`)
  if (cachedPools) {
    return JSON.parse(cachedPools)
  }
  return null
}

const setCachedPools = (targetNetwork, pools) => {
  localStorage.setItem(`pools-${targetNetwork}`, JSON.stringify(pools))
}

const PoolsComponent = (targetNetwork) => {
  const [pools, setPools] = useState([])

  useEffect(() => {
    const cachedPools = getCachedPools(targetNetwork)
    if (cachedPools) {
      setPools(cachedPools)
      return
    }

    getPools(targetNetwork).then((pools) => {
      setPools(pools)
      setCachedPools(targetNetwork, pools)
    })
  }, [targetNetwork])

  return (
    <div>
      {/* <select value={targetNetwork} onChange={handleNetworkChange}>
        <option value="mainnet">Mainnet</option>
        <option value="testnet">Testnet</option>
      </select> */}
      <ul>
        {pools.map((pool) => (
          <li key={pool.id}>{pool.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PoolsComponent
