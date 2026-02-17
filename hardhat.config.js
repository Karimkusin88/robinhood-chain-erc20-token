require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox"); // ✅ ini yang bikin ethers + chai matchers aktif

console.log("RPC:", process.env.RPC_URL);

module.exports = {
  solidity: "0.8.24",
  networks: {
    robinhood: {
      url: process.env.RPC_URL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
