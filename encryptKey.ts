import { ethers } from "ethers";
import "dotenv/config";
import * as fs from "fs-extra";

const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const PASSWORD = process.env.PASSWORD!;

async function main() {
    const wallet = new ethers.Wallet(PRIVATE_KEY);
    const encryptedJsonKey = await wallet.encrypt(PASSWORD);

    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
