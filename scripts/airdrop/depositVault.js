const hre = require("hardhat");
require("dotenv").config();

async function main() {

  const vaultAddress = "0xe95dA05F5587219AC38e5EFaF356f59139B09206";

  const Vault = await hre.ethers.getContractAt("SimpleVault", vaultAddress);

  const tx = await Vault.deposit({
    value: hre.ethers.parseEther("0.001")
  });

  await tx.wait();

  console.log("Deposit successful!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
