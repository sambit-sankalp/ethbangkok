const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

// Settlement Deployment
async function main() {
  // Compile the contracts (if not already compiled)
  await hre.run("compile");

  // Define constructor parameters
  const endpoint = "0x6EDCE65403992e310A62460808c4b910D972f10f";
//   const owner = "0x49535e0D37E232F43b1c35541978c562051473D6";
  const owner = "0xaB41Ebb2c06Fd1488A21268D9DfA6536735a0b7E";
  const option = "0x0003010011010000000000000000000000000000c350"; // Bytes parameter
  const solverDaoEid = 40170; // uint32 parameter

  // Get the contract factory
  const Settlement = await ethers.getContractFactory("Settlement");

  // Deploy the contract with constructor parameters
  const settlement = await Settlement.deploy(endpoint, owner, option, solverDaoEid);

  // Wait for the contract deployment to complete
  await settlement.deployed();

  console.log("Settlement deployed to:", settlement.address);

  // Save the contract's address and ABI for frontend
  saveFrontendFiles(settlement, "Settlement");
}

// Function to save contract files for frontend
function saveFrontendFiles(contract, contractName) {
  const contractsDir = path.join(__dirname, "..", "trial3-main", "src", "contracts");

  // Create the directory if it doesn't exist
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Save contract address to a JSON file
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ [contractName]: contract.address }, undefined, 2)
  );

  // Save contract ABI to a JSON file
  const contractArtifact = artifacts.readArtifactSync(contractName);
  fs.writeFileSync(
    path.join(contractsDir, `${contractName}.json`),
    JSON.stringify(contractArtifact, null, 2)
  );

  console.log(`Frontend files for ${contractName} written to:`, contractsDir);
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
