require("dotenv").config();
const { ethers } = require("hardhat");
const recipients = require("../airdrop.json");

async function main() {
  const [wallet] = await ethers.getSigners();
  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

  if (!TOKEN_ADDRESS) throw new Error("TOKEN_ADDRESS missing in .env");

  const token = await ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  console.log("Sender:", wallet.address);

  for (const r of recipients) {
    const tx = await token.transfer(
      r.address,
      ethers.parseUnits(r.amount, 18)
    );

    await tx.wait();
    console.log(`Sent ${r.amount} KRM to ${r.address}`);
  }

  console.log("✅ Airdrop complete!");
}

main();
