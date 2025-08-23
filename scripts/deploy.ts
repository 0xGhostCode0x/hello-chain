
import { ethers } from "hardhat";

async function main() {
  // log the deployer
  const [deployer] = await ethers.getSigners();
  const addr = await deployer.getAddress();
  const balanceWei = await ethers.provider.getBalance(addr);

  console.log("Deployer:", addr);
  console.log("Balance (wei):", balanceWei.toString());
  console.log("Balance (ETH):", ethers.formatEther(balanceWei));

  if (balanceWei === 0n) {
    throw new Error("No funds: your deployer has 0 ETH on the target network.");
  }

  // deploy GhostCounter
  const GhostCounter = await ethers.getContractFactory("GhostCounter");
  console.log("Deploying GhostCounter...");
  const ghostCounter = await GhostCounter.deploy();
  await ghostCounter.waitForDeployment();

  const deployedAddress = await ghostCounter.getAddress();
  console.log("👻 GhostCounter deployed to:", deployedAddress);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

