require("dotenv").config();
const hre = require("hardhat");

const TOKEN_ADDRESS = "0xc49FbeadAf5f5F4eA30e08F19C7B03C7730d4E73";

async function main() {
  const [wallet] = await hre.ethers.getSigners();
  console.log("Wallet:", wallet.address);

  const token = await hre.ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  console.log("Name:", await token.name());
  console.log("Symbol:", await token.symbol());
  console.log("Balance:", (await token.balanceOf(wallet.address)).toString());
}

main();
