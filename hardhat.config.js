require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

console.log("RPC:", process.env.RPC_URL);

module.exports = {
  solidity: "0.8.24",
  networks: {
    robinhood: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

