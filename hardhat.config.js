require("@nomiclabs/hardhat-waffle");
require('@ensdomains/ens');
require('@ensdomains/resolver');
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv")
dotenv.config()

// TODO check contracts
const CONTRACTS = {
  'fantom': '0x613c3a985ed730c261cc4643ea1774b5c58e364e'
}

const {
  MNEMONIC = '',
  INFURA_ID = '',
  ETHERSCANKEY = '',
} = process.env

task("names", "query reverse records")
  .addParam("addresses", "List of accounts, comma delimited")
  .setAction(async (taskArgs, hre) => {
    const addresses = taskArgs.addresses.split(',')
    const reverseRecords = await hre.ethers.getContractAt('ReverseRecords', CONTRACTS[hre.network.name])
    console.log(await reverseRecords.getNames(addresses))
  });

module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    fantom:{
      url: `https://rpc.fantom.network`,
      chainId: 250,
      gasPrice: 50000000000, // 50 gwei
      accounts: {mnemonic: MNEMONIC}
    },
    fantomTestnet:{
      url: `https://rpc.testnet.fantom.network`,
      chainId: 4002,
      gasPrice: 50000000000, // 50 gwei
      accounts: {mnemonic: MNEMONIC}
    }
  },
  etherscan: {
    apiKey: ETHERSCANKEY
  },
  solidity: {
    compilers: [
      {
        version: "0.7.4"
      },
      {
        version: "0.7.6"
      },
      {
        version: "0.8.17"
      },
    ]
  }
}