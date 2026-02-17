const hre = require("hardhat");

async function main() {

  const vaultAddress = "0xe95dA05F5587219AC38e5EFaF356f59139B09206";

  const Vault = await hre.ethers.getContractAt("SimpleVault", vaultAddress);

  const balance = await Vault.getBalance();

  console.log("Vault balance:", hre.ethers.formatEther(balance), "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
