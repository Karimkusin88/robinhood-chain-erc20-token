require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const TOKEN = process.env.TOKEN_ADDRESS;
  if (!TOKEN) throw new Error("TOKEN_ADDRESS belum di-set di .env");

  const [owner] = await ethers.getSigners();

  // kita pakai owner sebagai spender biar ga butuh signer lain
  const spender = owner.address;
  const recipient = "0x000000000000000000000000000000000000dEaD";

  const token = await ethers.getContractAt("KarimToken", TOKEN);

  const name = await token.name();
  const version = "1";
  const chainId = Number((await ethers.provider.getNetwork()).chainId);

  console.log("Token   :", TOKEN);
  console.log("Owner   :", owner.address);
  console.log("Spender :", spender);
  console.log("Recv    :", recipient);
  console.log("chainId :", chainId);

  const value = ethers.parseUnits("5", 18);
  const nonce = await token.nonces(owner.address);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 menit

  const domain = {
    name,
    version,
    chainId,
    verifyingContract: TOKEN,
  };

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  const message = {
    owner: owner.address,
    spender,
    value,
    nonce,
    deadline,
  };

  console.log("\n1) sign permit (off-chain)");
  const sig = await owner.signTypedData(domain, types, message);
  const { v, r, s } = ethers.Signature.from(sig);

  console.log("   nonce   :", nonce.toString());
  console.log("   value   :", ethers.formatUnits(value, 18));
  console.log("   deadline:", deadline);

  console.log("\n2) call permit() on-chain");
  const txPermit = await token.permit(owner.address, spender, value, deadline, v, r, s);
  console.log("   tx:", txPermit.hash);
  await txPermit.wait();
  console.log("   ✅ permit success");

  const allowance = await token.allowance(owner.address, spender);
  console.log("   allowance:", ethers.formatUnits(allowance, 18));

  console.log("\n3) transferFrom() using permit allowance");
  const txTf = await token.transferFrom(owner.address, recipient, value);
  console.log("   tx:", txTf.hash);
  await txTf.wait();
  console.log("   ✅ transferFrom success");

  const balOwner = await token.balanceOf(owner.address);
  const balRecv = await token.balanceOf(recipient);

  console.log("\n==== RESULT ====");
  console.log("Owner balance    :", ethers.formatUnits(balOwner, 18));
  console.log("Recipient balance:", ethers.formatUnits(balRecv, 18));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
