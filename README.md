# Simple Storage Solidity

Learning exercise project to deploy and interact with a smartcontract using `ethers.js`.

# Smartcontract

The smartcontract that is used is a simple implementation of a contract where you can change the value of a number saved on the blockchain. You can also save the number associated to a person.

# Requirements

To use the following repository you need to have installed this packages:

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` and get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` and get an output like: `x.x.x`
    - You might need to install it with npm
- [ganache](https://trufflesuite.com/ganache/)
  - You can alternatively use [ganache-cli](https://www.npmjs.com/package/ganache-cli) or [hardhat](https://hardhat.org/)

# Compiling

To compile the solidity code `solc` is used

```
yarn add solc
```

if you are using in your contract a solidity version older than the latest you can type

```
yarn add solc@x.x.x
```

Finally, to compile the solidity code run the following command

```
yarn solcjs --bin --abi --include-path node_modules/ --base-path <base-path> -o <output path> <solidity-file-name>
```

it is easier to add this line in the `package.json` file.

```
{
    "scripts": {
        "compile": "<compile-command>"
    }
}
```

# Blockchain

This repo can work with any EVM compatible blockchain. To connect to a blockchain you need an `RPC_URL`.

For developement purpouses we'll use a local enviroment as `ganache`.

# Deploy (and interact)

To deploy the contract is enough to run the command

```
node deploy.js
```

Make sure to have set the `RPC_URL` and the `PRIVATE_KEY` in the `.env` file.

**IMPORTANT** -> remember never to push the `.env` file to github or never make it public. Add a `.gitignore` file!

# Security improvement

If you are worried you might leak in some way your `.env`

## Set enviromental variables at execution time

you can run the script as this without the need of any file

```
RPC_URL=<rpc url> PRIVATE_KEY=<private key> node deploy.js
```

## Encrypt the key

If you don't wont to insert your enviromental variables every time but you still don't want to show the private key to everyone who has access to your project the solution would be to **encrypt the key**.

The steps to follow are:

- Insert the `PRIVATE_KEY` and a `PASSWORD` in `.env` or at execution time
- Run the `encrypt script`

```
node encryptKey.js
```

- The output will be saved in `.encryptedKey.json`
- Delete PRIVATE_KEY and PASSWORD from `.env`
- Now you can run the deploy script as this

```
PASSWORD=<your password> node deploy-encrypted.js
```

after the execution is suggest to run

```
history -c
```

to delete the terminal history so it is not possible to find out what the password used is.
