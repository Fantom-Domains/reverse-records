const hre = require("hardhat");
const CONTRACTS = {
  'mainnet': '0x613c3a985ed730c261cc4643ea1774b5c58e364e'
}

async function main(env) {
  console.log('hre.network.name', hre.network.name, CONTRACTS[hre.network.name]);
  const reverseRecords = await hre.ethers.getContractAt('ReverseRecords', CONTRACTS[hre.network.name])
  const addresses = [
    '0x75ED8E9EB0c0eA4d9C9c91E44516C76316018368',
  ]
  const result = await reverseRecords.getNames(addresses)
  for (let index = 0; index < result.length; index++) {
    console.log(addresses[index], result[index])
  }
}

main(process.env)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
