require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const token = await ethers.getContractAt(
    "KarimToken",
    process.env.TOKEN_ADDRESS
  );

  const [w] = await ethers.getSigners();

  console.log("Network:", (await ethers.provider.getNetwork()).chainId);
  console.log("Wallet :", w.address);
  console.log("Token  :", process.env.TOKEN_ADDRESS);

  console.log("name   :", await token.name());
  console.log("symbol :", await token.symbol());
  console.log("nonces :", (await token.nonces(w.address)).toString());
}

main().catch(console.error);
