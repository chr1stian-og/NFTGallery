require("@nomiclabs/hardhat-waffle");

const privateKey =
  "f07cb793dd8966fd4b013b6aa673eaf7eaf252ca18c28891f5eefdbe23d82bbb";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/bdc0b87027c84b32a1e812ea10c096a6",
      accounts: [privateKey],
    },
    ganache: {
      chainId: 5777,
      url: "http://172.0.0.1:7545",
    },
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/bdc0b87027c84b32a1e812ea10c096a6",
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
};
