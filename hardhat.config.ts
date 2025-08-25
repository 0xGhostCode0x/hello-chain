import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL!;
const BASE_SEPOLIA_RPC = process.env.BASE_SEPOLIA_RPC_URL!;
const PK = process.env.PRIVATE_KEY!;

if (!SEPOLIA_RPC) throw new Error("Missing SEPOLIA_RPC_URL in .env");
if (!BASE_SEPOLIA_RPC) throw new Error("Missing BASE_SEPOLIA_RPC_URL in .env");
if (!PK) throw new Error("Missing PRIVATE_KEY in .env");

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.24", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.8.28", settings: { optimizer: { enabled: true, runs: 200 } } },
    ],
    // Optional: per-file overrides if you want to force a version for specific files
    // overrides: {
    //   "contracts/Lock.sol": { version: "0.8.28", settings: { optimizer: { enabled: true, runs: 200 } } }
    // }
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC,
      accounts: [PK],
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC,
      chainId: 84532,
      accounts: [PK],
    },
  },
};

export default config;
