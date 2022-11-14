const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying contract...");

  const contract = await contractFactory.deploy(); // deploy function accept an overrides object to set gasPrice, gasLimit, etc...

  console.log("Contract deployed!");

  const transactionReceipt = await contract.deployTransaction.wait(1);

  console.log(transactionReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
