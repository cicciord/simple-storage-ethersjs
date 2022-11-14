# Simple Storage Solidity

Learning exercive project to interact with a smartcontract with `ethers.js`.

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
