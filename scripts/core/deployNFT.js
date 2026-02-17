const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("KarimNFT");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();

  console.log("KarimNFT deployed to:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
