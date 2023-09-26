import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-foundry';
import helpers from '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();
const { ETHERSCAN_API_KEY, POLYGONSCAN_API_KEY, SEPOLIA_RPC, PRIVATE_KEY } =
  process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: { optimizer: { enabled: true, runs: 1000 } },
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC || 'https://eth-sepolia.g.alchemy.com/v2/demo',
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
  },
};

export default config;
