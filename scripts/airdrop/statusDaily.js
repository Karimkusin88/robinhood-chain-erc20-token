require("dotenv").config();
const { ethers } = require("hardhat");

async function safeCall(fn, fallback = null) {
  try {
    const v = await fn();
    return v;
  } catch {
    return fallback;
  }
}

async function main() {
  const addr = process.env.DAILY_CHECKIN_ADDR || process.env.DAILY_ADDRESS;
  if (!addr) throw new Error("Set DAILY_CHECKIN_ADDR (or DAILY_ADDRESS) in .env");

  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("Daily:", addr);

  const daily = await ethers.getContractAt("DailyCheckin", addr, signer);

  const points = await daily.points(signer.address);
  const streak = await daily.streak(signer.address);
  const lastCheckin = await daily.lastCheckin(signer.address);

  console.log("points:", points.toString());
  console.log("streak:", streak.toString());
  console.log("lastCheckin:", lastCheckin.toString());

  // optional fields (beda-beda tergantung versi contract)
  const pointsToClaim = await safeCall(() => daily.pointsToClaim(), null);
  const tokenPerClaim = await safeCall(() => daily.tokenPerClaim(), null);

  if (pointsToClaim !== null) console.log("pointsToClaim:", pointsToClaim.toString());
  if (tokenPerClaim !== null) console.log("tokenPerClaim:", tokenPerClaim.toString());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
