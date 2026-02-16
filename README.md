# 🚀 Karim Token (KRM)

![CI](https://github.com/Karimkusin88/robinhood-chain-test/actions/workflows/ci.yml/badge.svg)
![Network](https://img.shields.io/badge/Network-Robinhood%20Testnet-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-orange)
![Hardhat](https://img.shields.io/badge/Built%20With-Hardhat-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

Custom ERC20 Token deployed on **Robinhood Chain Testnet**  
Built for deployment automation, scripting, and token distribution experiments.

---

## 📌 Contract Information

**Token Name:** Karim Token  
**Symbol:** KRM  
**Standard:** ERC20 (OpenZeppelin)

**Network:** Robinhood Chain Testnet  
**Contract Address:**  
`0x69c445eB7233457bFF8BdDa40e151159b669678f`

**Explorer (if available):**  
https://explorer.testnet.chain.robinhood.com/address/0x69c445eB7233457bFF8BdDa40e151159b669678f

---

## 🧠 Why This Matters

This repository is not just a token deploy example.

It demonstrates:

- Real testnet deployment workflow
- Script-driven automation
- Token distribution logic (airdrop + permit)
- Gas-aware development practices
- Clean modular project structure

This is how production-level smart contract repos are structured.

---

## 🔥 Core Features

- ERC20 Standard Token
- Deployment via Hardhat
- Transfer automation scripts
- Single & Batch Airdrop
- Permit-based distribution
- Gas measurement support
- Automated test suite
- Environment-safe configuration

---

## 🛠 Tech Stack

- Solidity ^0.8.24
- Hardhat
- OpenZeppelin Contracts
- Ethers.js v6
- dotenv
- Mocha + Chai

---

## 🏗 Architecture Overview

User Wallet
│
▼
Hardhat Scripts
│
├── deployToken.js
├── transferToken.js
├── airdrop.js
├── batchAirdrop.js
├── permit scripts
│
▼
KarimToken.sol (ERC20)
│
▼
Robinhood Chain Testnet


Flow:

Deploy → Interact → Distribute → Measure Gas → Iterate

---

## 📦 Installation

```bash
npm install


Flow:

Deploy → Interact → Distribute → Measure Gas → Iterate

---

## 📦 Installation

```bash
npm install

⚙️ Environment Setup
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://rpc.testnet.chain.robinhood.com
TOKEN_ADDRESS=0x69c445eB7233457bFF8BdDa40e151159b669678f

🚀 Deploy Token
npx hardhat run scripts/core/checkToken.js --network robinhood

🔁 Token Interaction
npx hardhat run scripts/core/checkToken.js --network robinhood

npx hardhat run scripts/core/transferToken.js --network robinhood

🎁 Airdrop

Single address:

npx hardhat run scripts/airdrop/airdrop.js --network robinhood


Batch distribution:

npx hardhat run scripts/airdrop/batchAirdrop.js --network robinhood

🧾 Permit Distribution
npx hardhat run scripts/permit/permitTest.js --network robinhood

npx hardhat run scripts/permit/batchPermitAirdrop.js --network robinhood

🧪 Testing

Run tests:

npx hardhat test


Gas benchmark:

REPORT_GAS=true npx hardhat test

📊 CI Integration

This repository includes CI support.

On every push:

Contracts compile

Tests run automatically

Failures are detected early

Workflow file location:
.github/workflows/ci.yml

📂 Project Structure
contracts/
scripts/
  core/
  airdrop/
  permit/
  dev/
test/
hardhat.config.js

🗺 Roadmap

 ERC20 Deployment

 Interaction Scripts

 Airdrop Automation

 Permit Distribution

 Gas Reporting

 Contract Verification Script

 Merkle-based Airdrop

 Frontend Dashboard

 Snapshot-based distribution tool

🎯 Purpose

This project demonstrates:

Clean contract deployment workflow

Script-based token automation

Token distribution mechanics

Permit signature usage

Real testnet readiness

Production-style project structure

Built with precision by Karim
GitHub: https://github.com/Karimkusin88