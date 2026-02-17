require("dotenv").config();
const { ethers } = require("hardhat");

const ERC20_ABI = [
  "function transfer(address,uint256) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

async function main() {
  const tokenAddr = process.env.TOKEN_ADDRESS;
  const referralAddr = process.env.REFERRAL_ADDR;
  if (!tokenAddr) throw new Error("Set TOKEN_ADDRESS in .env");
  if (!referralAddr) throw new Error("Set REFERRAL_ADDR in .env (deploy first)");

  const amountHuman = process.env.REFERRAL_FUND_AMOUNT || "500";

  const [signer] = await ethers.getSigners();
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, signer);

  const [dec, sym] = await Promise.all([token.decimals(), token.symbol()]);
  const amt = ethers.parseUnits(amountHuman, dec);

  console.log("Signer:", signer.address);
  console.log("Funding Referral:", referralAddr);
  console.log("Token:", tokenAddr, `(${sym})`);
  console.log("Amount:", amountHuman, sym);

  const tx = await token.transfer(referralAddr, amt);
  console.log("tx:", tx.hash);
  await tx.wait();

  console.log("✅ Referral pool funded");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
