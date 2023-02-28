import { useEffect, useState } from 'react'

export default function TradeData() {
  const [data, setData] = useState([])
  const [pair, setPair] = useState('ETHBTC')

  const handleChange = (event) => {
    setPair(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/trades?pair=${pair}`)
      const newData = await response.json()
      setData(newData)
    }
    fetchData()
    const interval = setInterval(fetchData, 10000) // fetch data every 10 seconds
    return () => clearInterval(interval)
  }, [pair])

  return (
    <div>
      <label htmlFor="pair">Select a trading pair:</label>
      <select id="pair" name="pair" value={pair} onChange={handleChange}>
        <option value="ETHBTC">ETHBTC</option>
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSDT">ETHUSDT</option>
      </select>
      {data.map((trade) => (
        <div key={trade.id}>
          {trade.price} - {trade.qty}
        </div>
      ))}
    </div>
  )
}
