const { ethers } = require("hardhat");

async function main() {
  const Hello = await ethers.getContractFactory("Hello");
  const hello = await Hello.deploy();

  await hello.waitForDeployment();

  console.log("✅ Contract deployed to:", await hello.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

