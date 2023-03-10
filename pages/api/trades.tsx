import Binance from 'binance-api-node'

export default async function handler(req, res) {
  const client = Binance({ httpBase: 'https://api.binance.us' })
  const { pair } = req.query
  const candleData = await client.candles({
    symbol: pair,
    interval: '1h', // time interval for each candlestick (1 minute in this example)
    limit: 100, // number of candlesticks to retrieve (100 in this example)
  })
  const tradeData = candleData.map((candle) => ({
    time: candle.openTime,
    price: candle.close,
  }))
  //   console.log(tradeData)
  res.status(200).json(tradeData)
}
