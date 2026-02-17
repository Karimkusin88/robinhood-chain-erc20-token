require("dotenv").config();
const { ethers } = require("hardhat");

const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

async function main() {
  const tokenAddr = process.env.TOKEN_ADDRESS;
  if (!tokenAddr) throw new Error("Set TOKEN_ADDRESS in .env");

  const refAmtHuman = process.env.REFERRAL_REWARD_REFERRER || "5";
  const userAmtHuman = process.env.REFERRAL_REWARD_REFEREE || "2";

  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("Token:", tokenAddr);

  const token = new ethers.Contract(tokenAddr, ERC20_ABI, ethers.provider);
  const [dec, sym] = await Promise.all([token.decimals(), token.symbol()]);

  const refAmt = ethers.parseUnits(refAmtHuman, dec);
  const userAmt = ethers.parseUnits(userAmtHuman, dec);

  console.log("Rewards => referrer:", refAmtHuman, sym, "| referee:", userAmtHuman, sym);

  const Factory = await ethers.getContractFactory("ReferralRegistry");
  const c = await Factory.deploy(tokenAddr, refAmt, userAmt);
  await c.waitForDeployment();

  const addr = await c.getAddress();
  console.log("✅ ReferralRegistry deployed:", addr);
  console.log("\nAdd this to .env:");
  console.log(`REFERRAL_ADDR=${addr}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
