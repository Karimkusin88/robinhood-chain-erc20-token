require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const referralAddr = process.env.REFERRAL_ADDR;
  const referrer = process.env.REFERRER_ADDRESS;

  if (!referralAddr) throw new Error("Set REFERRAL_ADDR in .env");
  if (!referrer || referrer === "0x0000000000000000000000000000000000000000") {
    throw new Error("Set REFERRER_ADDRESS (wallet lain) in .env");
  }

  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("Referral:", referralAddr);
  console.log("Referrer:", referrer);

  const referral = await ethers.getContractAt("ReferralRegistry", referralAddr, signer);

  console.log("Registering...");
  const tx = await referral.register(referrer);
  console.log("tx:", tx.hash);
  await tx.wait();

  console.log("✅ registered referral (and rewards paid if pool funded)");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
