/* eslint-disable @next/next/no-img-element */
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion, useAnimationControls } from 'framer-motion'
import Chart from 'Moon/Chart'
import Script from 'next/script'
import { Suspense, useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import Mage from '../mages/old.Mage'
import Moon from '../models/Moon'
import MoonPhase from '../Moon/MoonPhase'
import Retrograde from '../Moon/Retrograde'

const DEBUG = false
const apiEndpoint = DEBUG ? '/api/' : 'https://api.coingecko.com/api/v3/coins/'

const dummyData = [
  [0, 0],
  [2, 11],
  [4, 8],
  [20, 77],
  [30, 26],
  [40, 42],
  [50, 68],
  [60, 18],
  [70, 38],
  [80, 18],
  [100, 100],
  [120, 40],
  [140, 58],
  [160, 90],
]

interface CoinData {
  id: string
  symbol: string
  name: string
  asset_platform_id: null | string
  platforms: Record<string, any>
  detail_platforms: Record<string, any>
  block_time_in_minutes: number
  hashing_algorithm: string
  categories: any[]
  public_notice: null | string
  additional_notices: any[]
  localization: Record<string, any>
  description: Record<string, any>
  links: Record<string, any>
  image: Record<string, any>
  country_origin: string
  genesis_date: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  market_cap_rank: number
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  market_data: Record<string, any>
  community_data: Record<string, any>
  developer_data: Record<string, any>
  public_interest_stats: Record<string, any>
  status_updates: any[]
  last_updated: string
  tickers: any[]
}

const Tradestation = () => {
  const [data, setData] = useState<CoinData | null>(null)
  const [coinId, setCoinId] = useState('bitcoin')
  const [currency, setCurrency] = useState('usd')
  const [newCoinId, setNewCoinId] = useState('bitcoin')

  useEffect(() => {
    const fetchData = async () => {
      // console.log('Fetching data from', apiEndpoint)
      const res = await fetch(`${apiEndpoint}/${coinId}`)

      if (res.ok) {
        const data = await res.json()

        setData({
          id: data.id,
          symbol: data.symbol,
          name: data.name,
          asset_platform_id: data.asset_platform_id,
          platforms: data.platforms,
          detail_platforms: data.detail_platforms,
          block_time_in_minutes: data.block_time_in_minutes,
          hashing_algorithm: data.hashing_algorithm,
          categories: data.categories,
          public_notice: data.public_notice,
          additional_notices: data.additional_notices,
          localization: data.localization,
          description: data.description,
          links: data.links,
          image: data.image,
          country_origin: data.country_origin,
          genesis_date: data.genesis_date,
          sentiment_votes_up_percentage: data.sentiment_votes_up_percentage,
          sentiment_votes_down_percentage: data.sentiment_votes_down_percentage,
          market_cap_rank: data.market_cap_rank,
          coingecko_rank: data.coingecko_rank,
          coingecko_score: data.coingecko_score,
          developer_score: data.developer_score,
          community_score: data.community_score,
          liquidity_score: data.liquidity_score,
          public_interest_score: data.public_interest_score,
          market_data: data.market_data,
          community_data: data.community_data,
          developer_data: data.developer_data,
          public_interest_stats: data.public_interest_stats,
          status_updates: data.status_updates,
          last_updated: data.last_updated,
          tickers: data.tickers,
        })
      }
    }
    // get initial price then update every 10 seconds
    fetchData()
    const intervalId = setInterval(fetchData, 10 * 1000)
    return () => clearInterval(intervalId)
  }, [coinId])

  const handleSubmit = (event) => {
    event.preventDefault()
    setCoinId(newCoinId)
  }

  // returns just the first sentence of the coin description
  // can be buggy if the first sentence has a e.g. URL
  function getFirstSentence(paragraph: string) {
    const firstSentence = paragraph.match(/^[^\.\?!]*/)[0]
    return firstSentence + '.'
  }

  const firstSentence = data ? getFirstSentence(data?.description.en) : null
  const lastNewMoon = new Date(2023, 0, 21, 21, 53)

  const [chartContainer, bounds] = useMeasure()
  const mageControls = useAnimationControls()

  if (!DEBUG) {
    return (
      <div className="mx-auto grid max-w-4xl flex-shrink grid-cols-1 gap-y-20 p-2 scrollbar-thin scrollbar-track-blue-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Mage controls={mageControls} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 3 }}
          className="absolute -z-40 -m-2 h-full w-full overflow-hidden "
        >
          <Suspense>
            <Canvas>
              <Environment preset="sunset" />
              <ambientLight />
              <OrbitControls autoRotate={true} autoRotateSpeed={0.1} />
              <Moon scale={3.4} />
            </Canvas>
          </Suspense>
        </motion.div>
        {data ? (
          <>
            <div className="text-center text-6xl">
              <div className="flex items-center justify-center gap-4 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1 }}
                >
                  ${data.market_data.current_price.usd.toLocaleString('en-US')}
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
                    src={data.image.small}
                    alt="logo"
                  />
                </motion.div>
              </div>
            </div>
            <div className="max-h-[400px]">
              <p className="p-8 text-center shadow">{firstSentence}</p>
            </div>{' '}
            <div className="info">
              <div
                className="mx-auto my-2 flex h-56 place-content-center bg-white/20 pl-2 text-gray-800/60"
                ref={chartContainer}
              >
                <Chart
                  data={dummyData}
                  width={Math.floor(bounds.width)}
                  height={Math.floor(bounds.height / 1.35)}
                  // height={100}
                />
              </div>
              <div className="grid grid-cols-2 place-items-center bg-blue-800/20 py-4 text-center">
                <MoonPhase lastNewMoon={lastNewMoon} />
                <Retrograde />
              </div>
            </div>
            <div className="flex flex-col pb-8 text-center lg:p-12">
              <div className="mx-auto flex lg:flex-col">
                <motion.img src={data.image.small} />
              </div>
              <div>
                <p>
                  All time high: $
                  {data.market_data.ath.usd.toLocaleString('en-US')}
                </p>
                <p>
                  24 Hour High: $
                  {data.market_data.high_24h.usd.toLocaleString('en-US')}
                </p>
                <p>
                  24 Hour Low: $
                  {data.market_data.low_24h.usd.toLocaleString('en-US')}
                </p>
                <p>
                  Volume: $
                  {data.market_data.total_volume.usd.toLocaleString('en-US')}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="col-span-auto">
              <input
                type="text"
                name="coinId"
                value={newCoinId}
                onChange={(event) => setNewCoinId(event.target.value)}
                className="mb-20 h-20 w-full  text-center uppercase tracking-widest shadow-lg"
              />

              <button
                type="submit"
                className=" w-full bg-blue-800 text-white/90 "
              >
                Refresh Data
              </button>
            </form>
          </>
        ) : (
          <div className="flex h-screen place-content-center items-center justify-center">
            <motion.p initial={{ scale: 0.1 }} animate={{ scale: 2, y: -200 }}>
              🚀
              {/* <p className="text-center">Lifting Off...</p> */}
            </motion.p>
          </div>
        )}
        <div className="flex gap-8 overflow-x-scroll text-center scrollbar scrollbar-track-blue-800 scrollbar-thumb-white/60">
          {data?.tickers.map((ticker, i) => (
            <>
              <div className="p-4">
                <h1>{ticker.market.name}</h1>
                <p>${ticker.last.toLocaleString('en-US')}</p>
                <p>
                  Volume: {Math.floor(ticker.volume).toLocaleString('en-US')}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    )
  } else {
    console.log(data)
    return (
      <>
        <div>debug</div>
        <div>{data?.market_data.current_price.usd}</div>
      </>
    )
  }
}

export default Tradestation
