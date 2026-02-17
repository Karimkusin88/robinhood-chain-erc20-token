const hre = require("hardhat");

async function main() {
  const TOKEN = "0x69c445eB7233457bFF8BdDa40e151159b669678f"; // KRM token lo

  const Factory = await hre.ethers.getContractFactory("DailyCheckinV2");
  const c = await Factory.deploy(TOKEN);
  await c.waitForDeployment();

  console.log("DailyCheckinV2 deployed to:", c.target);
  console.log("Reward token:", TOKEN);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
