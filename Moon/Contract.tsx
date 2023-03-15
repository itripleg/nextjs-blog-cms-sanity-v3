import WalletConnectProvider from 'walletconnect/web3-provider'
import { ethers } from 'ethers'

async function connectToWalletConnect() {
  // create a new WalletConnectProvider instance
  const provider = new WalletConnectProvider({
    // replace with the WalletConnect bridge URL for the desired network
    rpc: {
      1: 'https://mainnet.infura.io/v3/your-project-id',
      56: 'https://bsc-dataseed.binance.org/',
      137: 'https://rpc-mainnet.matic.network',
    },
    // replace with your app's name and logo
    qrcode: true,
    qrcodeModalOptions: {
      mobileLinks: [
        'rainbow',
        'metamask',
        'argent',
        'trust',
        'imtoken',
        'pillar',
      ],
    },
  })

  // connect to the WalletConnect provider
  await provider.enable()

  // create an ethers.js provider using the WalletConnect provider
  const ethersProvider = new ethers.providers.Web3Provider(provider)

  // get the signer using the connected provider
  const signer = ethersProvider.getSigner()

  // now you can interact with contracts using the signer
  const contractAddress = '0x123456789...'
  const abi = ['function balanceOf(address) view returns (uint256)']
  const contract = new ethers.Contract(contractAddress, abi, signer)
  const balance = await contract.balanceOf('0x123...')
  console.log(`Balance: ${balance}`)
}
