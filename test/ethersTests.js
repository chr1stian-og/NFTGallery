const { ethers } = require("ethers");

const projectId = "bdc0b87027c84b32a1e812ea10c096a6";
const address = "0xBE74B8603C56ebCBFCd1f8F4368Eb43cAEE071D1"

const provider = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${projectId}`
);

const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(`\nChecking ETH balance of ${address} ----> ${ethers.utils.formatEther(balance)} ETH \n`);
};

main();
