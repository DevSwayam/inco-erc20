import { defineChain } from "viem"

export const incoTestnet = defineChain({
  id: 9090,
  name: "Inco Network",
  network: "inco",
  nativeCurrency: {
    decimals: 18,
    name: "Inco",
    symbol: "INCO",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.inco.org"]
    },
    public: {
      http: ["https://testnet.inco.org"]
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.testnet.inco.org/",
    },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xcA11bde05977b3631167028862bE2a173976CA11',
  //     blockCreated: 5882,
  //   },
  // },
})
