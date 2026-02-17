const hre = require("hardhat");
require("dotenv").config();

async function main() {

  const nftAddress = "0x265a208eE43A8dBc11BA8f28629D8eE377a31830";

  const provider = new hre.ethers.JsonRpcProvider(process.env.RPC_URL);

  const wallet1 = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const wallet2 = new hre.ethers.Wallet(process.env.SECOND_PRIVATE_KEY, provider);

  const NFT = await hre.ethers.getContractAt("KarimNFT", nftAddress, wallet1);

  const tx = await NFT["safeTransferFrom(address,address,uint256)"](
    wallet1.address,
    wallet2.address,
    0
  );

  await tx.wait();

  console.log("NFT Transferred to second wallet!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
