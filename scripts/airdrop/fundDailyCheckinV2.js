const hre = require("hardhat");

async function main() {
  const TOKEN = "0x69c445eB7233457bFF8BdDa40e151159b669678f";
  const DAILY = "0xB7b8488386A92DC0D53543101934834b7383655D";

  const [signer] = await hre.ethers.getSigners();

  const token = await hre.ethers.getContractAt("KarimToken", TOKEN);
  const amount = hre.ethers.parseUnits("100000", 18); // kirim 100k token ke contract

  const tx = await token.transfer(DAILY, amount);
  console.log("Fund tx:", tx.hash);
  await tx.wait();

  console.log("✅ Funded DailyCheckinV2 with 100k KRM");
}

main().catch(console.error);
