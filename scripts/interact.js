const { ethers } = require("hardhat");

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Wallet:", signer.address);

  console.log(
    "Balance:",
    ethers.formatEther(await signer.provider.getBalance(signer.address))
  );

  const address = "0xC63B0bDECC2c2d68B59d521Ef51C2b3fb5B39A18";

  const Hello = await ethers.getContractFactory("Hello");
  const contract = Hello.attach(address);

  console.log("Old message:", await contract.message());

  const tx = await contract.setMessage("GM Robinhood");
  await tx.wait();

  console.log("New message:", await contract.message());
}

main();
