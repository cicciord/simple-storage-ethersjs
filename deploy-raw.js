const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf-8"
    );

    const nonce = await wallet.getTransactionCount();
    const gasPrice = await wallet.getGasPrice();
    const binaryHex = "0x" + binary;
    const chainId = await wallet.getChainId();

    const tx = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: 1000000,
        to: null,
        value: 0,
        data: binaryHex,
        chainId: chainId,
    };

    //   const signedTransaction = await wallet.signTransaction(tx); // don't need to sign, if you send an unsigned tx it will sign automatically

    console.log("Deploying contract...");

    const transactionResponse = await wallet.sendTransaction(tx);
    await transactionResponse.wait(1);

    console.log("Contract deployed!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
