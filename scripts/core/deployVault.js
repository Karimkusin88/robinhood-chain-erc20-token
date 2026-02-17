const hre = require("hardhat");
require("dotenv").config();

async function main() {

  const Vault = await hre.ethers.getContractFactory("SimpleVault");
  const vault = await Vault.deploy();

  await vault.waitForDeployment();

  console.log("Vault deployed to:", await vault.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
