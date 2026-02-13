require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await ethers.getContractFactory("KarimToken");
  const token = await Token.deploy();

  await token.waitForDeployment();

  console.log("✅ Token deployed to:", await token.getAddress());
}

main();
