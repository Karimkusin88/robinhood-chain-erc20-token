const { ethers } = require("hardhat");
const { VAULT_ADDRESS, NFT_ADDRESS, DAILY_ADDRESS } = require("../core/addresses");

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);

  
  const vault = await ethers.getContractAt("Vault", VAULT_ADDRESS, signer);

  console.log("1) Deposit 0.0001 ETH");
  await (await vault.deposit({ value: ethers.parseEther("0.0001") })).wait();

  console.log("2) Withdraw 0.00005 ETH");
  await (await vault.withdraw(ethers.parseEther("0.00005"))).wait();

  console.log("3) Vault balance now:");
  const bal = await ethers.provider.getBalance(VAULT_ADDRESS);
  console.log("Vault:", ethers.formatEther(bal), "ETH");

  
  console.log("4) Mint 1 NFT");
  const nft = await ethers.getContractAt("KarimNFT", NFT_ADDRESS, signer);

  
  const tx = await nft.mint(signer.address);
  console.log("mint tx:", tx.hash);
  await tx.wait();
  console.log("Mint success ✅");

  
  console.log("5) Daily check-in");
  const daily = await ethers.getContractAt("DailyRewards", 0xDe9965B61cb89C3f937097A0886dccc41418B5aE, signer);
  await (await daily.checkIn()).wait();
  console.log("Check-in success ✅");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
