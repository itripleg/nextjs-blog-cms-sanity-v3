/* eslint-disable @next/next/no-img-element */
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Binance from 'binance-api-node'
import Chart from 'ChartWidget/Chart'
import { motion, useAnimationControls } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import Mage from '../mages/old.Mage'
import MoonPhase from '../Moon/MoonPhase'
import Retrograde from '../Moon/Retrograde'
import Moon from '../myModels/Moon'

const DEBUG = false
const apiEndpoint = DEBUG ? '/api/' : 'https://api.coingecko.com/api/v3/coins/'

const coinNameMap = {
  bitcoin: { binance: 'BTC', coingecko: 'bitcoin', pair: 'BTCUSDT' },
  ethereum: { binance: 'ETH', coingecko: 'ethereum', pair: 'ETHUSDT' },
  tether: { binance: 'USDT', coingecko: 'tether', pair: 'USDTUSD' },
  binancecoin: { binance: 'BNB', coingecko: 'binancecoin', pair: 'BNBUSDT' },
  cardano: { binance: 'ADA', coingecko: 'cardano', pair: 'ADAUSDT' },
  chainlink: { binance: 'LINK', coingecko: 'chainlink', pair: 'LINKUSDT' },
  polkadot: { binance: 'DOT', coingecko: 'polkadot', pair: 'DOTUSDT' },
  // 'avalanche-2': { binance: 'AVAX', coingecko: 'avalanche', pair: 'AVAXUSDT' },
}

const Tradestation = () => {
  const [data, setData] = useState(null)
  const [coinId, setCoinId] = useState('bitcoin')
  const [newCoinId, setNewCoinId] = useState('bitcoin')
  const [pair, setPair] = useState('BTCUSDT')
  const [tradeData, setTradeData] = useState([])

  async function fetchCoinGeckoData(id) {
    const response = await fetch(`${apiEndpoint}/${id}`)
    const data = await response.json()
    return data
  }

  async function fetchBinanceData(pair) {
    const response = await fetch(`/api/trades?pair=${pair}`)
    const tradeData = await response.json()
    setTradeData(tradeData)
    return tradeData
  }
  useEffect(() => {
    const fetchData = async () => {
      const coinGeckoData = await fetchCoinGeckoData(coinId)
      setData(coinGeckoData)

      if (pair) {
        const binanceData = await fetchBinanceData(pair)
        setTradeData(binanceData)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 10 * 1000)
    return () => clearInterval(intervalId)
  }, [coinId, pair])

  const newFetch = async (coin) => {
    setCoinId(coin.coingecko)
    setNewCoinId(coin.coingecko)
    setPair(coin.pair)
    await fetchBinanceData(coin.pair)
  }

  const handleSubmit = (e, coin) => {
    e.preventDefault()
    newFetch(coin)
  }

  // returns just the first sentence of the coin description
  // can be buggy if the first sentence has a e.g. URL
  function getFirstSentence(paragraph: string) {
    const firstSentence = paragraph.match(/^[^\.\?!]*/)[0]
    return firstSentence + '.'
  }

  const firstSentence = data ? getFirstSentence(data?.description.en) : null

  // TODO: move to MoonPhase
  const lastNewMoon = new Date(2023, 0, 21, 21, 53)

  const [chartContainer, bounds] = useMeasure()
  const mageControls = useAnimationControls()

  if (!DEBUG) {
    return (
      <div className="mx-auto grid max-w-4xl flex-shrink grid-cols-1 gap-y-20 p-2 scrollbar-thin scrollbar-track-blue-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed left-20 mt-20 hidden flex-col items-center gap-2 border bg-white/80 p-2 uppercase shadow 2xl:flex"
        >
          <h1>👑</h1>
          {Object.values(coinNameMap).map((coin) => {
            return (
              <p
                key={coin.coingecko}
                onClick={() => {
                  newFetch(coin)
                }}
              >
                {coin.coingecko}
              </p>
            )
          })}
        </motion.div>
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="p-8 text-center shadow"
              >
                {firstSentence}
              </motion.p>
            </div>{' '}
            <div className="info border">
              <div
                className=" mx-auto my-2 flex h-56 place-content-center border bg-white/20 pl-2 text-gray-800/60"
                ref={chartContainer}
              >
                {tradeData.length > 0 && (
                  <Chart
                    key={`${coinId}-${pair}`}
                    data={tradeData}
                    width={Math.floor(bounds.width)}
                    height={Math.floor(bounds.height / 1.15)}
                  />
                )}
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
            {/* <form
              onSubmit={(e) => {
                handleSubmit(e, coinId)
              }}
              className="col-span-auto"
            >
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
            </form> */}
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
