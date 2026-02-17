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
    // fallback kalau RPC ngambek pas nunggu receipt
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

  // print quick status dulu
  const points = await retry(() => daily.points(signer.address), 3);
  const streak = await retry(() => daily.streak(signer.address), 3);
  console.log("status => points:", points.toString(), "| streak:", streak.toString());

  try {
    console.log("Calling claim()...");
    const tx = await daily.claim();
    console.log("tx:", tx.hash);

    const rc = await waitTx(tx);
    console.log("✅ claimed in block", rc.blockNumber);
  } catch (e) {
    const m = errMsg(e);
    if (m.includes("Airdrop empty")) {
      console.log("❌ Airdrop empty → pool token Daily kosong. Jalankan fundAirdrop.js dulu.");
      return;
    }
    if (m.includes("Not enough points")) {
      console.log("❌ Not enough points → checkIn dulu, lalu coba claim lagi.");
      return;
    }
    console.log("❌ claim failed:", m);
    throw e;
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
