require("dotenv").config();
const { ethers } = require("hardhat");

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
];

async function main() {
  const dailyAddr = process.env.DAILY_CHECKIN_ADDR || process.env.DAILY_ADDRESS;
  if (!dailyAddr) throw new Error("Set DAILY_CHECKIN_ADDR in .env");

  const tokenAddr = process.env.TOKEN_ADDRESS;
  if (!tokenAddr) throw new Error("Set TOKEN_ADDRESS in .env");

  const token = new ethers.Contract(tokenAddr, ERC20_ABI, ethers.provider);
  const [sym, dec] = await Promise.all([token.symbol(), token.decimals()]);
  const bal = await token.balanceOf(dailyAddr);

  console.log("Daily:", dailyAddr);
  console.log("Token:", tokenAddr, `(${sym})`);
  console.log("Airdrop token balance:", ethers.formatUnits(bal, dec), sym);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
