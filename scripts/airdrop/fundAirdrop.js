require("dotenv").config();
const { ethers } = require("hardhat");

const ERC20_ABI = [
  "function transfer(address,uint256) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

async function main() {
  const dailyAddr = process.env.DAILY_CHECKIN_ADDR || process.env.DAILY_ADDRESS;
  if (!dailyAddr) throw new Error("Set DAILY_CHECKIN_ADDR in .env");

  const tokenAddr = process.env.TOKEN_ADDRESS;
  if (!tokenAddr) throw new Error("Set TOKEN_ADDRESS in .env");

  // default: 1000 token
  const amountHuman = process.env.FUND_AMOUNT || "1000";

  const [signer] = await ethers.getSigners();
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, signer);

  const [dec, sym] = await Promise.all([token.decimals(), token.symbol()]);
  const amount = ethers.parseUnits(amountHuman, dec);

  console.log("Signer:", signer.address);
  console.log("Funding Daily:", dailyAddr);
  console.log("Token:", tokenAddr, `(${sym})`);
  console.log("Amount:", amountHuman, sym);

  const tx = await token.transfer(dailyAddr, amount);
  console.log("tx:", tx.hash);
  await tx.wait();
  console.log("✅ Airdrop funded");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
