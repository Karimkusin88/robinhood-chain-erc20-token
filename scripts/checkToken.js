require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [wallet] = await ethers.getSigners();
  console.log("Wallet:", wallet.address);

  const TOKEN_ADDRESS = "0x69c445eB7233457bFF8BdDa40e151159b669678f";

  const token = await ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  console.log("Name:", await token.name());
  console.log("Symbol:", await token.symbol());

  const balance = await token.balanceOf(wallet.address);
  console.log("Balance:", ethers.formatUnits(balance, 18));
}

main();
