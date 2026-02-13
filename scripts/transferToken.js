const { ethers } = require("hardhat");

async function main() {
  const tokenAddress = "0xC8A531b37A1E8fBd860A853a5C6B7c75A753621C";

  const token = await ethers.getContractAt("KarimToken", tokenAddress);

  const [me] = await ethers.getSigners();

  const tx = await token.transfer(
    "0x000000000000000000000000000000000000dead",
    ethers.parseUnits("10", 18)
  );

  await tx.wait();

  console.log("✅ Transfer success");
}

main();
