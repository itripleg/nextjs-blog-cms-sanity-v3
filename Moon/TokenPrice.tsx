import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

interface TokenPriceProps {
  tokenAddress: string
  network: string
}

interface ChainlinkResponse {
  decimals: string
  description: string
  name: string
  symbol: string
  answer: string
  updatedAt: string
}

const TokenPrice = ({ tokenAddress, network }: TokenPriceProps) => {
  const [price, setPrice] = useState<string | null>(null)

  useEffect(() => {
    const provider = new ethers.providers.InfuraProvider(
      network,
      'your-infura-project-id'
    )
    const priceFeedContractAddress =
      '0x0567F2323251f0Aae0Ab2cCeaCcE2c3D49777C37' // Chainlink price feed contract address
    const priceFeedContractABI = [
      'function latestAnswer() view returns (int256)',
      'function decimals() view returns (uint8)',
    ]

    const getPrice = async () => {
      const priceFeedContract = new ethers.Contract(
        priceFeedContractAddress,
        priceFeedContractABI,
        provider
      )
      const chainlinkResponse = await priceFeedContract.latestAnswer()
      const decimals = await priceFeedContract.decimals()
      const formattedPrice = ethers.utils.formatUnits(
        chainlinkResponse,
        decimals
      )
      setPrice(formattedPrice)
    }

    getPrice()
  })

  return <div>{price ? `$${price}` : 'Loading...'}</div>
}

export default TokenPrice
