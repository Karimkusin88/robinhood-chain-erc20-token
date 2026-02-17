require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const referralAddr = process.env.REFERRAL_ADDR;
  if (!referralAddr) throw new Error("Set REFERRAL_ADDR in .env");

  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("Referral:", referralAddr);

  const referral = await ethers.getContractAt("ReferralRegistry", referralAddr, signer);

  const by = await referral.referredBy(signer.address);
  const myCount = await referral.referralCount(signer.address);
  const pool = await referral.poolBalance();

  console.log("referredBy:", by);
  console.log("my referralCount:", myCount.toString());
  console.log("poolBalance (raw):", pool.toString());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
