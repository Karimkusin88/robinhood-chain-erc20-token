require("dotenv").config();
const { ethers, artifacts } = require("hardhat");

async function main() {
  const addr = process.env.DAILY_CHECKIN_ADDR || process.env.DAILY_ADDRESS;
  if (!addr) throw new Error("Set DAILY_CHECKIN_ADDR in .env");

  // GANTI ini kalau ternyata contract name lo V2
  const contractName = process.env.DAILY_CONTRACT_NAME || "DailyCheckin";

  const artifact = await artifacts.readArtifact(contractName);
  console.log("Using artifact:", contractName);
  console.log("Daily addr:", addr);

  const fns = artifact.abi
    .filter((x) => x.type === "function")
    .map((x) => `${x.name}(${(x.inputs || []).map((i) => i.type).join(",")})`);

  console.log("\n=== ABI Functions ===");
  fns.forEach((f) => console.log("-", f));
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
