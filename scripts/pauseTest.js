require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const tokenAddress = process.env.TOKEN_ADDRESS;

  const token = await ethers.getContractAt("KarimToken", tokenAddress);

  console.log("Owner:", owner.address);
  console.log("Token:", tokenAddress);

  console.log("\n1) pause()");
  await (await token.pause()).wait();
  console.log("✅ paused");

  console.log("\n2) coba transfer saat paused (harus gagal)");
  try {
    await (await token.transfer("0x000000000000000000000000000000000000dEaD", ethers.parseUnits("1", 18))).wait();
    console.log("❌ harusnya gagal tapi malah sukses");
  } catch (e) {
    console.log("✅ transfer gagal (expected):", e.shortMessage || e.message);
  }

  console.log("\n3) unpause()");
  await (await token.unpause()).wait();
  console.log("✅ unpaused");

  console.log("\n4) transfer lagi (harus sukses)");
  await (await token.transfer("0x000000000000000000000000000000000000dEaD", ethers.parseUnits("1", 18))).wait();
  console.log("✅ transfer sukses");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
