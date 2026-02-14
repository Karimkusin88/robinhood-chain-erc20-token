require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sendWithRetry(fn, retries = 5, delayMs = 1500) {
  let lastErr;
  for (let i = 1; i <= retries; i++) {
    try {
      return await fn(i);
    } catch (err) {
      lastErr = err;
      console.log(`⚠️  Attempt ${i}/${retries} failed: ${err?.code || err?.message}`);
      await sleep(delayMs * i); // backoff
    }
  }
  throw lastErr;
}

async function main() {
  const [wallet] = await ethers.getSigners();

  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
  if (!TOKEN_ADDRESS) throw new Error("TOKEN_ADDRESS belum ada di .env");

  const list = JSON.parse(fs.readFileSync("airdrop.json", "utf-8"));
  if (!Array.isArray(list)) throw new Error("airdrop.json harus array");

  const token = await ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  console.log("Token:", TOKEN_ADDRESS);
  console.log("Sender:", wallet.address);
  console.log("Total recipients:", list.length);

  let success = 0;
  let failed = 0;

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const to = item.to;
    const amountStr = item.amount;

    if (!ethers.isAddress(to)) {
      console.log(`❌ [${idx}] invalid address: ${to}`);
      failed++;
      continue;
    }
    if (!amountStr || isNaN(Number(amountStr))) {
      console.log(`❌ [${idx}] invalid amount: ${amountStr}`);
      failed++;
      continue;
    }

    const amount = ethers.parseUnits(amountStr, 18);

    console.log(`\n➡️  [${idx + 1}/${list.length}] Sending ${amountStr} KRM to ${to}`);

    try {
      const tx = await sendWithRetry(async (attempt) => {
        if (attempt > 1) console.log(`   retry #${attempt}...`);
        const t = await token.transfer(to, amount);
        return t;
      });

      console.log("   Tx:", tx.hash);

      await sendWithRetry(async (attempt) => {
        if (attempt > 1) console.log(`   waiting retry #${attempt}...`);
        return await tx.wait();
      });

      console.log("   ✅ success");
      success++;
    } catch (err) {
      console.log("   ❌ failed:", err?.message || err);
      failed++;
    }

    // jeda biar RPC nggak gampang reset
    await sleep(700);
  }

  console.log("\n==== SUMMARY ====");
  console.log("✅ Success:", success);
  console.log("❌ Failed :", failed);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
