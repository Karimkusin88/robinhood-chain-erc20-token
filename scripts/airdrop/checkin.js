require("dotenv").config();
const { ethers } = require("hardhat");
const retry = require("../utils/retry");

function errMsg(e) {
  return e?.shortMessage || e?.reason || e?.message || String(e);
}

async function waitTx(tx) {
  try {
    return await retry(() => tx.wait(), 3);
  } catch (e) {
    console.log("⚠️ wait() error, fallback waitForTransaction:", errMsg(e));
    return await retry(() => ethers.provider.waitForTransaction(tx.hash, 1), 5);
  }
}

async function main() {
  const dailyAddr = process.env.DAILY_CHECKIN_ADDR || process.env.DAILY_ADDRESS;
  if (!dailyAddr) throw new Error("Set DAILY_CHECKIN_ADDR (or DAILY_ADDRESS) in .env");

  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("Daily:", dailyAddr);

  const daily = await ethers.getContractAt("DailyCheckin", dailyAddr, signer);

  try {
    console.log("Calling checkIn()...");
    const tx = await daily.checkIn();
    console.log("tx:", tx.hash);

    const rc = await waitTx(tx);
    console.log("✅ checkIn confirmed in block", rc.blockNumber);
  } catch (e) {
    const m = errMsg(e);
    if (m.includes("Already checked in today")) {
      console.log("ℹ️ Already checked in today → aman, skip.");
      return;
    }
    console.log("❌ checkIn failed:", m);
    throw e;
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
