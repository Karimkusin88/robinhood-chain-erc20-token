require("dotenv").config();
const { ethers } = require("hardhat");

const GAS_LIMIT = 5_000_000;
const MAX_RETRIES = 5;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await ethers.getContractFactory("KarimToken");

  let lastErr;
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      console.log(`Attempt ${i}/${MAX_RETRIES}...`);
      const token = await Token.deploy({ gasLimit: GAS_LIMIT });
      await token.waitForDeployment();
      const addr = await token.getAddress();
      console.log("✅ KarimToken deployed to:", addr);
      return;
    } catch (err) {
      lastErr = err;
      console.log("Deploy failed, retrying...", err?.code || err?.message || err);
      await sleep(2000);
    }
  }

  throw lastErr;
}

main().catch((err) => {
  console.error("❌ Final error:", err);
  process.exitCode = 1;
});
