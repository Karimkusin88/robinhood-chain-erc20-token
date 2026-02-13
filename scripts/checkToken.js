require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [wallet] = await ethers.getSigners();
  console.log("Wallet:", wallet.address);

  const TOKEN_ADDRESS = "0xC8A531b37A1E8fBd860A853a5C6B7c75A753621C";

  const token = await ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  console.log("Name:", await token.name());
  console.log("Symbol:", await token.symbol());

  const balance = await token.balanceOf(wallet.address);
  console.log("Balance:", ethers.formatUnits(balance, 18));
}

main();
