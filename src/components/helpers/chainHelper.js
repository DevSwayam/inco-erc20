import {defineChain} from 'viem';

export const myIncoChain = defineChain({
  id: 9090, // Replace this with your chain's ID
  name: 'Inco Network',
  network: 'Inco Network',
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: 'Inco Network',
    symbol: 'INCO',
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.inco.org"],
    },
  },
  blockExplorers: {
    default: {name: 'Explorer', url: 'https://explorer.testnet.inco.org/'},
  },
});