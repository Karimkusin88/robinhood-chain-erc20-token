require("dotenv").config();
const { ethers } = require("hardhat");
const retry = require("../utils/retry");

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

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
  const tokenAddr = process.env.TOKEN_ADDRESS;

  if (!dailyAddr) throw new Error("Set DAILY_CHECKIN_ADDR (or DAILY_ADDRESS) in .env");
  if (!tokenAddr) throw new Error("Set TOKEN_ADDRESS in .env");

  // config: minimal pool & jumlah topup (dalam token)
  const MIN_POOL = process.env.MIN_AIRDROP_POOL || "50";      // kalau pool < 50 token → topup
  const TOPUP = process.env.TOPUP_AMOUNT || "500";            // topup 500 token

  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("Daily:", dailyAddr);
  console.log("Token:", tokenAddr);

  const daily = await ethers.getContractAt("DailyCheckin", dailyAddr, signer);
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, signer);

  const [dec, sym] = await Promise.all([token.decimals(), token.symbol()]);

  // 1) cek pool token
  const pool = await retry(() => token.balanceOf(dailyAddr), 3);
  const minPoolWei = ethers.parseUnits(MIN_POOL, dec);

  console.log("Pool:", ethers.formatUnits(pool, dec), sym, "| min:", MIN_POOL, sym);

  // 2) topup kalau pool kurang
  if (pool < minPoolWei) {
    const topupWei = ethers.parseUnits(TOPUP, dec);
    console.log(`Topup pool ${TOPUP} ${sym}...`);
    const tx = await token.transfer(dailyAddr, topupWei);
    console.log("topup tx:", tx.hash);
    const rc = await waitTx(tx);
    console.log("✅ topup confirmed in block", rc.blockNumber);
  }

  // 3) status sebelum
  const pointsBefore = await retry(() => daily.points(signer.address), 3);
  const streakBefore = await retry(() => daily.streak(signer.address), 3);
  console.log("Before => points:", pointsBefore.toString(), "| streak:", streakBefore.toString());

  // 4) checkin (skip kalau sudah)
  try {
    console.log("CheckIn...");
    const tx = await daily.checkIn();
    console.log("checkin tx:", tx.hash);
    const rc = await waitTx(tx);
    console.log("✅ checkIn confirmed in block", rc.blockNumber);
  } catch (e) {
    const m = errMsg(e);
    if (m.includes("Already checked in today")) {
      console.log("ℹ️ Already checked in today → skip.");
    } else {
      console.log("❌ checkIn failed:", m);
      throw e;
    }
  }

  // 5) claim (kalau gagal, print reason)
  try {
    console.log("Claim...");
    const tx = await daily.claim();
    console.log("claim tx:", tx.hash);
    const rc = await waitTx(tx);
    console.log("✅ claim confirmed in block", rc.blockNumber);
  } catch (e) {
    const m = errMsg(e);
    if (m.includes("Airdrop empty")) {
      console.log("❌ Airdrop empty → pool kosong (topup dulu).");
      return;
    }
    if (m.includes("Not enough points")) {
      console.log("❌ Not enough points → tunggu poin cukup / besok checkin lagi.");
      return;
    }
    console.log("❌ claim failed:", m);
    throw e;
  }

  // 6) status sesudah
  const pointsAfter = await retry(() => daily.points(signer.address), 3);
  const streakAfter = await retry(() => daily.streak(signer.address), 3);
  const lastCheckin = await retry(() => daily.lastCheckin(signer.address), 3);

  console.log("After => points:", pointsAfter.toString(), "| streak:", streakAfter.toString());
  console.log("lastCheckin:", lastCheckin.toString());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
