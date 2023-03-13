/* eslint-disable @next/next/no-img-element */

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal } from '@web3modal/react'
import Chart from 'ChartWidget/Chart'
import { motion, useAnimationControls } from 'framer-motion'
import gsap from 'gsap'
import ButtonControl from 'Moon/ButtonControl'
import InitialInfo from 'Moon/InitialInfo'
import Interface from 'Moon/Interface'
import MoonLoading from 'Moon/MoonLoading'
import MoonPhase from 'Moon/MoonPhase'
import PriceHeader from 'Moon/PriceHeader'
import Retrograde from 'Moon/Retrograde'
import SpaceScene from 'Moon/SpaceScene'
import OuijAi from 'ouija/OuijAi'
import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, polygonMumbai]
const projectId = '53f8095fe255452059183eda8a5632bf'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

import Mage from '../mages/old.Mage'

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
  const [page, setPage] = useState('initial')

  const times = { day: '#fff', night: '#000' }
  const [time, setTime] = useState(null)
  const [bgColor, setBgColor] = useState('#000')
  const [txtColor, setTxtColor] = useState('#fff')
  const [autoRotate, setAutoRotate] = useState(false)

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
    const binanceData = await response.json()
    setTradeData(binanceData)
    return binanceData
  }
  useEffect(() => {
    console.log(
      'tradestation useEffect fetching data',
      'coinId: ' + coinId,
      'pair: ' + pair
    )
    const fetchData = async () => {
      const coinGeckoData = await fetchCoinGeckoData(coinId)
      setData(coinGeckoData)

      if (pair) {
        const binanceData = await fetchBinanceData(pair)
        console.log('binanceData:', binanceData)
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
  const initialPage = useRef(null)

  const [displayWindow, setDisplayWindow] = useState('home')

  const [chartContainer, bounds] = useMeasure()
  if (!DEBUG) {
    return (
      <>
        <WagmiConfig client={wagmiClient}>
          <>
            <motion.div
              animate={{ color: txtColor }}
              transition={{ duration: 3 }}
              className="mx-auto grid max-w-7xl grid-cols-1 gap-y-20"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Mage controls={mageControls} />
              </motion.div>
              <div className="absolute right-20 top-10 z-20 hidden lg:block">
                <ButtonControl
                  setDisplayWindow={setDisplayWindow}
                  txtColor={txtColor}
                  controlRef={controlRef}
                  cameraRef={cameraRef}
                  callback={dayNight}
                />
              </div>

              {/* If theres data loaded: */}
              {data ? (
                displayWindow === 'home' ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 0.8,
                        color: txtColor,
                        backgroundColor: bgColor,
                      }}
                      transition={{ duration: 1, delay: 2 }}
                      className="fixed left-20 mt-20 hidden  flex-col items-center gap-2 rounded-md border bg-white/80 p-2 uppercase shadow 2xl:flex"
                    >
                      {/* <h1>👑</h1> */}
                      {Object.values(coinNameMap).map((coin, i) => {
                        return (
                          <p
                            className="cursor-pointer"
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
                    {/* Main window */}
                    <div className="">
                      <div className="overflow-hidden" ref={initialPage}>
                        <PriceHeader data={data} bgColor={bgColor} />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                          className="h-4/5 bg-black/30 p-6"
                          ref={chartContainer}
                        >
                          <Chart
                            data={tradeData}
                            width={Math.floor(bounds.width)}
                            height={Math.floor(bounds.height / 1.06)}
                          />
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-2 scrollbar">
                        <div className="col-span-2 scrollbar">
                          <InitialInfo
                            data={data}
                            tradeData={tradeData}
                            coinId={coinId}
                            pair={pair}
                            txtColor={txtColor}
                            bgColor={bgColor}
                          />
                        </div>
                      </div>{' '}
                    </div>
                  </>
                ) : // ) : displayWindow === 'arb' ? (
                //   <div className="w-[1400px] p-2">{/* <Arbiter /> */}</div>
                displayWindow === 'ouija' ? (
                  <motion.div
                    className="h-[400px] overflow-hidden "
                    animate={{ opacity: 1, color: txtColor }}
                    transition={{ delay: 2, duration: 3 }}
                  >
                    <OuijAi />
                  </motion.div>
                ) : displayWindow === 'arb' ? (
                  <motion.div
                    className="bg-black/50 p-6"
                    animate={{
                      opacity: 1,
                      color: txtColor,
                      // backgroundColor: bgColor,
                    }}
                    transition={{ delay: 2, duration: 3 }}
                  >
                    <div className="pb-20">
                      <h1>Interface</h1>
                      <p>some user selectable inputs and details here like:</p>
                      <p>
                        Target network - arbitrage contract will need to be
                        deployed to each network we want to work with.
                      </p>
                      <p>Target decentralized exchange</p>
                      <p>
                        Target coin, this is the one we will need to flash loan.
                      </p>
                      <p>
                        Price difference %. The higher percent the better
                        opportunity.
                      </p>
                      <p>Amount of coin to trade</p>
                      <p>Flash loan provider address</p>
                      <br />
                      <p>
                        I also plan to store results in a database and show them
                        one this page. Hopefully we can feed the results into a
                        machine learning process to figure out what kind of
                        trade setups are most successful.
                      </p>
                    </div>
                    <div className="">
                      <Interface txtColor={txtColor} bgColor={bgColor} />
                    </div>
                    <Web3Button />
                  </motion.div>
                ) : displayWindow === 'moon' ? (
                  <div className="bg-purple-800 p-20">
                    <MoonPhase />
                    <Retrograde />
                  </div>
                ) : (
                  <div></div>
                )
              ) : (
                <MoonLoading />
              )}

              {/* otherwise we're loading or an error */}
            </motion.div>

            {/* Space scene container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, backgroundColor: bgColor }}
              transition={{ duration: 2, delay: 3 }}
              className="absolute top-0 left-0 -z-40 h-[1400px] w-full "
            >
              <SpaceScene
                cameraRef={cameraRef}
                controlRef={controlRef}
                lightRef={lightRef}
              />
            </motion.div>
            <div className="fixed bottom-0 col-span-full text-center lg:hidden">
              <ButtonControl
                setDisplayWindow={setDisplayWindow}
                txtColor={txtColor}
                controlRef={controlRef}
                cameraRef={cameraRef}
                callback={dayNight}
              />
            </div>
          </>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </WagmiConfig>
      </>
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
