const hre = require("hardhat");

const TOKEN_ADDRESS = "0x96a22C3E595E4eE8dB903C88FD1A70e4D018AaB3";

async function main() {
  const [wallet] = await hre.ethers.getSigners();

  console.log("Wallet:", wallet.address);

  const code = await hre.ethers.provider.getCode(TOKEN_ADDRESS);
  console.log("Code:", code.slice(0, 20), "...");

  const token = await hre.ethers.getContractAt("KarimToken", TOKEN_ADDRESS);

  const name = await token.name();
  const symbol = await token.symbol();
  const bal = await token.balanceOf(wallet.address);

  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Balance:", bal.toString());
}

main();
