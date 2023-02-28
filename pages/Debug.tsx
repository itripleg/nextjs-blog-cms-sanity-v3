import Chart from 'ChartWidget/Chart'
import TradeData from 'ChartWidget/TradeData'
import { useEffect, useState } from 'react'

type Props = {}

export default function TradingPage() {
  const [pair, setPair] = useState('BTCUSDT')
  const [tradeData, setTradeData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/trades?pair=${pair}`)
      const data = await response.json()
      setTradeData(data)
    }

    fetchData()
  }, [pair])

  return (
    <div>
      <h1>Select a Trading Pair:</h1>
      <div>
        <button onClick={() => setPair('BTCUSDT')}>BTC/USDT</button>
        <button onClick={() => setPair('ETHUSDT')}>ETH/USDT</button>
        <button onClick={() => setPair('BNBUSDT')}>BNB/USDT</button>
      </div>
      <div>
        <Chart data={tradeData} width={800} height={400} />
      </div>
    </div>
  )
}
