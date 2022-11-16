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

  // deploying the contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying contract...");

  const contract = await contractFactory.deploy(); // deploy function accept an overrides object to set gasPrice, gasLimit, etc...

  console.log("Contract deployed!");

  const transactionReceipt = await contract.deployTransaction.wait(1);

  // interacting with the contract

  // get initial value for the stored number
  // this is a view function, thus it does not alter the state of the blockchain and it does not cost any gas
  const initialFavouriteNumber = (await contract.retrieve()).toString();
  console.log(`Current favourite number: ${initialFavouriteNumber}`);

  // change stored number
  // this time we change the blockchain state, then we'll use gas
  console.log("Setting new favourite number...");
  const changeNumberTxResponse = await contract.store("23"); // use string format when passing int (for small numbers would work even passing int)
  const changeNumberTxReceipt = await changeNumberTxResponse.wait(1);
  console.log("Favourite number set!");

  const updatedNumber = await contract.retrieve();
  console.log(`The new favourite number is: ${updatedNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
