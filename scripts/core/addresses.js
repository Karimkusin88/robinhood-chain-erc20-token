require("dotenv").config();

function pick(...names) {
  for (const n of names) {
    const v = process.env[n];
    if (v && v.trim()) return v.trim();
  }
  return undefined;
}

module.exports = {
  RPC_URL: pick("RPC_URL"),
  PRIVATE_KEY: pick("PRIVATE_KEY"),

  // token/nft/vault optional (jangan bikin error kalau belum di-set)
  TOKEN_ADDRESS: pick("TOKEN_ADDRESS", "TOKEN_ADDR"),
  NFT_ADDRESS: pick("NFT_ADDRESS", "NFT_ADDR"),
  VAULT_ADDRESS: pick("VAULT_ADDRESS", "VAULT_ADDR"),

  // daily: support dua nama env biar kompatibel
  DAILY_ADDRESS: pick("DAILY_CHECKIN_ADDR", "DAILY_ADDRESS", "DAILY_ADDR"),
};
