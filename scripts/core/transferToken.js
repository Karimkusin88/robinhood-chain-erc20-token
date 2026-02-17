require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [wallet] = await ethers.getSigners();
  const TOKEN_ADDRESS = "0x69c445eB7233457bFF8BdDa40e151159b669678f";
  const RECEIVER = "0x000000000000000000000000000000000000dEaD";

  const token = await ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  console.log("Sender:", wallet.address);
  console.log("Receiver:", RECEIVER);

  const tx = await token.transfer(
    RECEIVER,
    ethers.parseUnits("5", 18)
  );

  console.log("Tx hash:", tx.hash);

  await tx.wait();

  console.log("✅ Transfer success!");
}

main();
