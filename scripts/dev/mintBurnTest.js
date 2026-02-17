require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [wallet] = await ethers.getSigners();
  const TOKEN_ADDRESS = "0x8E6E6Ec615a0487E0A87e44d7c11290a52cAf0Fb";

  const token = await ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  console.log("Owner:", await token.owner());
  console.log("Caller:", wallet.address);

  // mint 10 token ke diri sendiri
  const mintTx = await token.mint(wallet.address, ethers.parseUnits("10", 18));
  await mintTx.wait();
  console.log("✅ Mint 10 token sukses");

  // burn 3 token dari diri sendiri
  const burnTx = await token.burn(ethers.parseUnits("3", 18));
  await burnTx.wait();
  console.log("✅ Burn 3 token sukses");

  const bal = await token.balanceOf(wallet.address);
  console.log("Balance now:", ethers.formatUnits(bal, 18));
}

main();
