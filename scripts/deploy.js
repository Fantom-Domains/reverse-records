// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// TODO change REGISTRY_ADDRESS (ENSRegistryWithFallback)
const REGISTRY_ADDRESS = '0xA6770E2036feA13045Aec56bEF7e85f45938E428'
async function main(env) {
  const ReverseRecords = await hre.ethers.getContractFactory("ReverseRecords");
  reverseRecords = await ReverseRecords.deploy(REGISTRY_ADDRESS);

  await reverseRecords.deployed();
  console.log(`ReverseRecords deployed to ${env.HARDHAT_NETWORK}:${reverseRecords.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(process.env)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
