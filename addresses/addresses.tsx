//VET ALL ADDRESSES BEFORE USE!
export const addresses = {
  //vetted
  rpc: {
    oneInch: {
      ethereum: {
        mainnet: 'https://api.1inch.io/swagger/ethereum-json/v5/',
      },
      bsc: {
        mainnet: 'https://api.1inch.io/swagger/binance-json/v5/',
      },
      polygon: {
        mainnet: 'https://api.1inch.io/swagger/polygon-json/v5/',
      },
    },
    infura: {
      ethereum: {
        mainnet: 'https://mainnet.infura.io/v3/',
        goerli: 'https://goerli.infura.io/v3/',
        sepolia: 'https://sepolia.infura.io/v3/',
      },
      polygon: {
        mainnet: 'https://polygon-mainnet.infura.io/',
        mumbai: 'https://polygon-mumbai.infura.io/v3/',
      },
    },
  },
  coins: {
    WETH: {
      ticker: 'WETH',
      mainnet: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      bsc: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      polygon: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      fantom: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
      avalanche: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    },
    DAI: {
      ticker: 'DAI',
      mainnet: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      bsc: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    LINK: {
      ticker: 'LINK',
      mainnet: '',
      bsc: '0x514910771AF9Ca656af840dff83E8264EcF986CA', //LINK token
      polygon: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
      goerli: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    },
  },
  contracts: {
    // vet tf out of these
    chainlinkVRF: {
      mainnet: '0x514910771AF9Ca656af840dff83E8264EcF986CA', //not vrf
      ropsten: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
      rinkeby: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      kovan: '0xa36085F69e2889c224210F603D836748e7dC0088',
      bsc: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
      polygon: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
      fantom: '0xb5b692a88BDFc81ca69dcB1d924f59f0413A602a',
      avalanche: '0x60781C2586D68229fde47564546784ab3fACA982',
    },
    magicDice: {
      mumbai: '0x50B72e5400b1Fa93b3BcCee23Ccf8451F3Ba91BE',
    },
  },
  networks: {
    ethereum: {
      chainId: 1,
      coins: {
        ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        LINK: '0x514910771af9ca656af840dff83e8264ecf986ca',
        UNI: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        AAVE: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
        COMP: '0xc00e94cb662c3520282e6f5717214004a7f26888',
        SNX: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
        SUSHI: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      },
    },
    bsc: {
      chainId: 56,
      coins: {
        WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        DAI: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
        WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      },
    },
    polygon: {
      chainId: 137,
      coins: {
        USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        MATIC: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
        SUSHI: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
        AAVE: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
        WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        LINK: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
      },
      //vetted
      contracts: {
        chainlink: {
          PoolAddressesProvider: '0xeb7A892BB04A8f836bDEeBbf60897A7Af1Bf5d7F',
          DAIAToken: '0xFAF6a49b4657D9c8dDa675c41cB9a05a94D3e9e9',
        },
      },
    },
  },
}
