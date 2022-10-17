// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  // const lockedAmount = hre.ethers.utils.parseEther("1");
console.log("Début du déploiement !")
  const Data = await hre.ethers.getContractFactory("Data");
  console.log("Déploiement en cours !")
  const data = await Data.deploy();
  console.log("Déploiement en phase terminale !")
  await data.deployed();
console.log("Le contrat est déployé à l'adresse: " + data.address)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
