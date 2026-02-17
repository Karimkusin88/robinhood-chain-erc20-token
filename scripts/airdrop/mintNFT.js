const hre = require("hardhat");

async function main() {
  const nftAddress = "0x265a208eE43A8dBc11BA8f28629D8eE377a31830";

  const NFT = await hre.ethers.getContractAt("KarimNFT", nftAddress);

  const tx = await NFT.mint(process.env.MY_ADDRESS);
  await tx.wait();

  console.log("NFT Minted!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
