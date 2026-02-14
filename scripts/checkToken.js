require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [wallet] = await ethers.getSigners();

  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
if (!TOKEN_ADDRESS) throw new Error("TOKEN_ADDRESS missing in .env");

  const RECEIVER = "0x000000000000000000000000000000000000dEaD";

  const token = await ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();

  const balSender = await token.balanceOf(wallet.address);
  const balReceiver = await token.balanceOf(RECEIVER);

  console.log("Token:", TOKEN_ADDRESS);
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Sender:", wallet.address);
  console.log("Sender balance:", ethers.formatUnits(balSender, decimals));
  console.log("Receiver:", RECEIVER);
  console.log("Receiver balance:", ethers.formatUnits(balReceiver, decimals));
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
