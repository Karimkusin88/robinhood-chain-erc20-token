<div align="center">

# 🪙 Karim Token (KRM)
### Robinhood Chain Testnet • ERC20 + Airdrop + Permit Playground

<p>
  <img alt="Solidity" src="https://img.shields.io/badge/Solidity-^0.8.24-363636?logo=solidity">
  <img alt="Hardhat" src="https://img.shields.io/badge/Hardhat-Runner-yellow?logo=ethereum">
  <img alt="Ethers" src="https://img.shields.io/badge/Ethers-v6-4c6ef5">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-success">
</p>

<p>
  <a href="https://github.com/Karimkusin88/robinhood-chain-test/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/Karimkusin88/robinhood-chain-test/actions/workflows/ci.yml/badge.svg">
  </a>
</p>

**A clean, modular Hardhat repo showcasing token deployment, scripting automation, and distribution mechanics on Robinhood Chain Testnet.**  
Built for testnet participation + portfolio proof.

</div>

---

## ✨ What’s inside

✅ ERC20 token deployment (OpenZeppelin)  
✅ Interaction scripts (check / transfer / interact)  
✅ Airdrop scripts (single + batch)  
✅ Permit scripts (batch permit airdrop)  
✅ Automated tests (Hardhat)  
✅ `.env` safety + clean folder structure  

---

## 🧠 Why this repo exists

This repository is designed to prove practical skills:

- shipping contracts + scripts
- repeatable workflows (deploy → interact → distribute)
- clean structure that others can run
- testnet-ready tooling for contributions

---

## 📦 Project Structure

```bash
contracts/
  Hello.sol
  KarimToken.sol

scripts/
  core/        # deploy + basic interactions
  airdrop/     # airdrop scripts
  permit/      # permit signature flows
  dev/         # experiments: mint/burn/pause

test/
hardhat.config.js
.env.example
⚙️ Quickstart
1) Install

npm install
2) Setup env
Create .env (never commit your private key):

cp .env.example .env
Edit .env:

env

PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://rpc.testnet.chain.robinhood.com
TOKEN_ADDRESS=0x69c445eB7233457bFF8BdDa40e151159b669678f
3) Compile + Test

npx hardhat compile
npx hardhat test
Gas report:

REPORT_GAS=true npx hardhat test
🚀 Deploy
Deploy token to Robinhood Chain Testnet:

npx hardhat run scripts/core/deployToken.js --network robinhood
Deployed token for this repo:
0x69c445eB7233457bFF8BdDa40e151159b669678f

🔁 Interact
Check token details:

npx hardhat run scripts/core/checkToken.js --network robinhood
Transfer tokens:

npx hardhat run scripts/core/transferToken.js --network robinhood
🎁 Airdrop
Single airdrop:

npx hardhat run scripts/airdrop/airdrop.js --network robinhood
Batch airdrop:

npx hardhat run scripts/airdrop/batchAirdrop.js --network robinhood
🧾 Permit (Gas-friendly distribution)
Test permit flow:

npx hardhat run scripts/permit/permitTest.js --network robinhood
Batch permit airdrop:

npx hardhat run scripts/permit/batchPermitAirdrop.js --network robinhood
🧪 Testing
Run tests:

npx hardhat test
Run tests with gas report:

REPORT_GAS=true npx hardhat test
🌐 Network
Network: Robinhood Chain Testnet
RPC: https://rpc.testnet.chain.robinhood.com

📌 Contract Info
Field	Value
Token Name	Karim Token
Symbol	KRM
Network	Robinhood Chain Testnet
Contract	0x69c445eB7233457bFF8BdDa40e151159b669678f

🔒 Security Notes
Never commit .env or private keys

Use a burner wallet for testnet

Keep scripts deterministic and reviewable

🧭 Next Up
If you want to evolve this repo into “airdrop-grade”:

Merkle Airdrop (proof-based claims)

Snapshot-based distribution (CSV/JSON)

Frontend dashboard (balances + claim UI)

Contract verification script

Ownership hardening (Ownable / AccessControl / multisig)

<div align="center">
Built with ❤️ by Karim
GitHub: https://github.com/Karimkusin88

Learning in public. Shipping consistently.

</div> ``` ::contentReference[oaicite:0]{index=0}