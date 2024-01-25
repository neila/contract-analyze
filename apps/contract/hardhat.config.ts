import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-foundry';
import '@nomicfoundation/hardhat-network-helpers';
import '@nomicfoundation/hardhat-toolbox-viem';
import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenvConfig();

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
    cache: './cache/hardhat',
    artifacts: './artifacts/hardhat',
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC || 'https://eth-sepolia.g.alchemy.com/v2/demo',
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
  },
};

export default config;
