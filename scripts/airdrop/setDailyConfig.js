const hre = require("hardhat");

async function main() {
  const DAILY = process.env.DAILY_CHECKIN_ADDR;
  if (!DAILY) throw new Error("Set DAILY_CHECKIN_ADDR in .env");

  const c = await hre.ethers.getContractAt("DailyCheckinV2", DAILY);

  // ubah ini biar gampang claim buat testing
  const pointsToClaim = 1; // super gampang
  const tokenPerClaim = hre.ethers.parseUnits("10", 18);

  const tx = await c.setClaimConfig(pointsToClaim, tokenPerClaim);
  console.log("setClaimConfig tx:", tx.hash);
  await tx.wait();
  console.log("✅ updated config");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
