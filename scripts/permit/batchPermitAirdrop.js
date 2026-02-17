require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withRetry(fn, label, tries = 5) {
  let lastErr;
  for (let i = 1; i <= tries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const msg = e?.shortMessage || e?.message || String(e);
      console.log(`⚠️  ${label} attempt ${i}/${tries} failed: ${msg}`);
      if (i < tries) await sleep(1200 * i);
    }
  }
  throw lastErr;
}

async function main() {
  const TOKEN = process.env.TOKEN_ADDRESS;
  if (!TOKEN) throw new Error("TOKEN_ADDRESS belum diset di .env");
  if (!process.env.SPENDER_PRIVATE_KEY) throw new Error("SPENDER_PRIVATE_KEY belum diset di .env");

  const [owner] = await ethers.getSigners();
  const spender = new ethers.Wallet(process.env.SPENDER_PRIVATE_KEY, ethers.provider);

  const tokenAsRead = await ethers.getContractAt("KarimToken", TOKEN);
  const tokenAsSpender = tokenAsRead.connect(spender);

  console.log("Token  :", TOKEN);
  console.log("Owner  :", owner.address);
  console.log("Spender:", spender.address);

  const listPath = path.join(process.cwd(), "airdrop.json");
  const recipients = JSON.parse(fs.readFileSync(listPath, "utf8"));
  if (!Array.isArray(recipients) || recipients.length === 0) throw new Error("airdrop.json kosong / format salah");

  // validate + hitung total
  let total = 0n;
  for (const [i, r] of recipients.entries()) {
    if (!r?.to || !ethers.isAddress(r.to)) throw new Error(`Recipient [${i}] address invalid: ${r?.to}`);
    if (!r?.amount) throw new Error(`Recipient [${i}] amount kosong`);
    const amt = ethers.parseUnits(String(r.amount), 18);
    if (amt <= 0n) throw new Error(`Recipient [${i}] amount harus > 0`);
    total += amt;
  }

  const ownerBal = await tokenAsRead.balanceOf(owner.address);
  console.log("Total recipients:", recipients.length);
  console.log("Total airdrop   :", ethers.formatUnits(total, 18), "KRM");
  console.log("Owner balance   :", ethers.formatUnits(ownerBal, 18), "KRM");
  if (ownerBal < total) throw new Error("Balance owner tidak cukup buat total airdrop");

  // ======== PERMIT (owner sign offchain) ========
  const chainId = (await ethers.provider.getNetwork()).chainId;
  const nonce = await tokenAsRead.nonces(owner.address); // harusnya jalan kalau contract bener
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 30); // 30 menit

  // OZ ERC20Permit: name = token name, version = "1"
  const name = await tokenAsRead.name();
  const domain = {
    name,
    version: "1",
    chainId: Number(chainId),
    verifyingContract: TOKEN,
  };

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  const values = {
    owner: owner.address,
    spender: spender.address,
    value: total,
    nonce,
    deadline,
  };

  console.log("\n1) Sign permit (offchain)...");
  const sig = await owner.signTypedData(domain, types, values);
  const { v, r, s } = ethers.Signature.from(sig);

  console.log("2) Submit permit() onchain (spender bayar gas)...");
  await withRetry(
    async () => {
      const tx = await tokenAsSpender.permit(owner.address, spender.address, total, deadline, v, r, s);
      console.log("   Tx:", tx.hash);
      await tx.wait();
    },
    "permit()"
  );

  const allowance = await tokenAsRead.allowance(owner.address, spender.address);
  console.log("Allowance now:", ethers.formatUnits(allowance, 18));

  // ======== TRANSFERFROM LOOP ========
  console.log("\n3) Batch transferFrom...");
  let ok = 0;
  for (const [i, r] of recipients.entries()) {
    const amt = ethers.parseUnits(String(r.amount), 18);
    console.log(`➡️  [${i + 1}/${recipients.length}] ${ethers.formatUnits(amt, 18)} KRM -> ${r.to}`);

    await withRetry(
      async () => {
        const tx = await tokenAsSpender.transferFrom(owner.address, r.to, amt);
        console.log("   Tx:", tx.hash);
        await tx.wait();
      },
      `transferFrom #${i + 1}`
    );

    ok++;
  }

  console.log("\n==== SUMMARY ====");
  console.log("✅ Success:", ok);
}

main().catch((e) => {
  console.error("❌ Error:", e?.shortMessage || e?.message || e);
  process.exit(1);
});
