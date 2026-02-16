# Karim Token (KRM)

Custom ERC20 Token deployed on Robinhood Chain Testnet.
Built for deployment automation, scripting, and token distribution experiments.

------------------------------------------------------------

CONTRACT INFORMATION

Token Name: Karim Token
Symbol: KRM
Standard: ERC20 (OpenZeppelin)

Network: Robinhood Chain Testnet
Contract Address:
0x69c445eB7233457bFF8BdDa40e151159b669678f

------------------------------------------------------------

CORE FEATURES

- ERC20 Standard Token
- Deployment via Hardhat
- Transfer automation scripts
- Single & Batch Airdrop
- Permit-based distribution
- Gas measurement support
- Automated test suite

------------------------------------------------------------

TECH STACK

- Solidity ^0.8.24
- Hardhat
- OpenZeppelin Contracts
- Ethers.js v6
- dotenv
- Mocha + Chai

------------------------------------------------------------

INSTALLATION

npm install

------------------------------------------------------------

ENVIRONMENT SETUP

Create a .env file:

PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://rpc.testnet.chain.robinhood.com
TOKEN_ADDRESS=0x69c445eB7233457bFF8BdDa40e151159b669678f

IMPORTANT:
Never expose your private key.

------------------------------------------------------------

DEPLOY TOKEN

npx hardhat run scripts/core/deployToken.js --network robinhood

------------------------------------------------------------

CHECK TOKEN

npx hardhat run scripts/core/checkToken.js --network robinhood

------------------------------------------------------------

TRANSFER TOKEN

npx hardhat run scripts/core/transferToken.js --network robinhood

------------------------------------------------------------

AIRDROP

Single address:
npx hardhat run scripts/airdrop/airdrop.js --network robinhood

Batch distribution:
npx hardhat run scripts/airdrop/batchAirdrop.js --network robinhood

------------------------------------------------------------

PERMIT DISTRIBUTION

Test permit:
npx hardhat run scripts/permit/permitTest.js --network robinhood

Batch permit-based airdrop:
npx hardhat run scripts/permit/batchPermitAirdrop.js --network robinhood

------------------------------------------------------------

TESTING

Run tests:
npx hardhat test

Gas benchmark:
REPORT_GAS=true npx hardhat test

------------------------------------------------------------

PROJECT STRUCTURE

contracts/
scripts/
  core/
  airdrop/
  permit/
  dev/
test/
hardhat.config.js

------------------------------------------------------------

PURPOSE

This project demonstrates:

- Smart contract deployment workflow
- Script-based token automation
- Token distribution logic
- Permit signature usage
- Real testnet interaction readiness

------------------------------------------------------------

Built by Karim
GitHub: https://github.com/Karimkusin88
