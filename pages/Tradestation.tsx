/* eslint-disable @next/next/no-img-element */

import Binance from 'binance-api-node'
import Chart from 'ChartWidget/Chart'
import { motion, useAnimationControls } from 'framer-motion'
import gsap from 'gsap'
import ButtonControl from 'Moon/ButtonControl'
import CoingeckoData from 'Moon/CoingeckoData'
import SpaceScene from 'Moon/SpaceScene'
import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

import Mage from '../mages/old.Mage'
import MoonPhase from '../Moon/MoonPhase'
import Retrograde from '../Moon/Retrograde'

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

  const times = { day: '#fff', night: '#000' }
  const [time, setTime] = useState('#fff')
  const [bgColor, setBgColor] = useState('#fff')
  const [txtColor, setTxtColor] = useState('#000')

  const firstSentence = data ? getFirstSentence(data?.description.en) : null

  const [chartContainer, bounds] = useMeasure()
  const mageControls = useAnimationControls()

  const cameraRef = useRef(null)
  const controlRef = useRef(null)
  const lightRef = useRef(null)

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

  const dayNight = () => {
    setTime(time == times.day ? times.night : times.day)
    bgColor == '#fff' ? setBgColor('#000') : setBgColor('#fff')
    txtColor == '#000' ? setTxtColor('#fff') : setTxtColor('#000')

    const newIntensity = time == times.day ? 0.3 : 1
    gsap.to(lightRef.current, {
      intensity: newIntensity,
      duration: 2.5,
    })
  }

  if (!DEBUG) {
    return (
      <motion.div
        animate={{ color: txtColor }}
        transition={{ duration: 3 }}
        className="mx-auto grid max-w-4xl flex-shrink grid-cols-1 gap-y-20 p-2 scrollbar-thin scrollbar-track-blue-800"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8, color: txtColor, backgroundColor: bgColor }}
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
          animate={{ opacity: 1, backgroundColor: bgColor }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute left-0 -z-40 -m-2 h-[1500px] w-full overflow-hidden "
        >
          <SpaceScene
            cameraRef={cameraRef}
            controlRef={controlRef}
            lightRef={lightRef}
          />
        </motion.div>
        <div className="absolute right-20">
          <ButtonControl
            txtColor={txtColor}
            controlRef={controlRef}
            cameraRef={cameraRef}
            callback={dayNight}
          />
        </div>
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
                animate={{ opacity: 0.7, backgroundColor: bgColor }}
                transition={{ delay: 2, duration: 3 }}
                className="p-8 text-center shadow"
              >
                {firstSentence}
              </motion.p>
            </div>
            <div className="info">
              <motion.div
                animate={{ color: txtColor, backgroundColor: bgColor }}
                transition={{ delay: 2, duration: 3 }}
                className=" mx-auto my-2 flex h-56 place-content-center border pl-2 opacity-60"
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
              </motion.div>
              <div className="grid grid-cols-2 place-items-center bg-blue-800/20 py-4 text-center">
                <MoonPhase />
                <Retrograde />
              </div>
            </div>
            <CoingeckoData data={data} />
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
          {data?.tickers.map((ticker: any, i: number) => (
            <>
              <div key={i} className="p-4">
                <h1>{ticker.market.name}</h1>
                <p>${ticker.last.toLocaleString('en-US')}</p>
                <p>
                  Volume: {Math.floor(ticker.volume).toLocaleString('en-US')}
                </p>
              </div>
            </>
          ))}
        </div>
      </motion.div>
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
