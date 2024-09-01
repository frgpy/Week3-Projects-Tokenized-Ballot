import { privateKeyToAccount } from "viem/accounts";
import {
  createPublicClient,
  http,
  createWalletClient,
  parseEther,
  formatEther,
} from "viem";

import { abi, bytecode } from "../artifacts/contracts/MyToken.sol/MyToken.json";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();


const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const MINT_VALUE = parseEther('70');


async function main() {
  // get addresses from command-line arguments
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error("Please provide ACCT1 and ACCT2 addresses as arguments");
  }
  const acct1PubAddress = args[0];
  const acct2PubAddress = args[1];

  // connect to the Sepolia testnet using Alchemy
  console.log("Connecting to blockchain with publicClient...");
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  //check if the connection was successful by getting the latest block number
  const blockNumber = await publicClient.getBlockNumber();
  console.log("Last block number:", blockNumber, "\n");

  // set up the deployer's wallet using the private key
  console.log("Setting up deployer wallet...");
  const deployerPK = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const deployer = createWalletClient({
    account: deployerPK,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
   
  const deployerPubAddress = deployer.account.address;
  console.log("Deployer address:", deployerPubAddress);

  const balance = await publicClient.getBalance({
    address: deployer.account.address,
  });
  console.log(
    "Deployer balance: ",
    formatEther(balance),
    deployer.chain.nativeCurrency.symbol
  );

  // deploy the MyERC20Token contract to Sepolia
  console.log("\nDeploying MyERC20Token contract...");
  const deployment = await deployer.deployContract({
    abi,
    bytecode: bytecode as `0x${string}`,
  });
  
  console.log("Contract deployment transaction hash:", deployment);

  console.log("Waiting for confirmations...");
  const deploymentReceipt = await publicClient.waitForTransactionReceipt({
    hash: deployment,
  });
  const contractAddress = deploymentReceipt.contractAddress;
  
  console.log("MyERC20 contract deployed to:", contractAddress, "\n");
  
  if (!contractAddress) {
    console.log("Contract deployment failed");
    return;
  }

  // mint tokens to the deployer's address
  console.log("Minting tokens for Deployer...");
  //**const deployerPubAddress = "0x0aCA03DA72A643f5403d07d7657C17B6E3ED575D";
  const deployerMintTx = await deployer.writeContract({
    address: contractAddress,
    abi,
    functionName: "mint",
    args: [deployerPubAddress, MINT_VALUE],
  });

  // log the mint transaction hash and wait for confirmation
  console.log(`Transaction hash of Deployer Account token mint: ${deployerMintTx}`);
  console.log(
    `[Minted] ${MINT_VALUE.toString()} decimal units to account ${deployerPubAddress}`
  );
  console.log("Waiting for confirmations...");
  await publicClient.waitForTransactionReceipt({
    hash: deployerMintTx,
  });
  // check and display the deployer's token balance
  const deployerB = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "balanceOf",
    args: [deployerPubAddress]
  });
  console.log(
    `[Tokens] Account ${deployerPubAddress} has ${deployerB} decimal units of MyToken\n`
  );

  /// mint token for account 1 
  console.log("Minting tokens for Account 1...");
  // ** const acct1PubAddress = "0x0aCA03DA72A643f5403d07d7657C17B6E3ED575D";
  const acct1MintTx = await deployer.writeContract({
    address: contractAddress,
    abi,
    functionName: "mint",
    args: [acct1PubAddress, MINT_VALUE]
  });
  console.log(`Transaction hash of Account 1 token mint: ${acct1MintTx}`);
  console.log(
    `[Minted] ${MINT_VALUE.toString()} decimal units to account ${acct1PubAddress}`
  );
  console.log("Waiting for confirmations...");
  await publicClient.waitForTransactionReceipt({
    hash: acct1MintTx,
  });
  // get account 1 balance 
  const acct1Balance = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "balanceOf",
    args: [acct1PubAddress]
  });
  console.log(
    `[Tokens] Account ${acct1PubAddress} has ${acct1Balance} decimal units of MyToken\n`
  );

  //mint tokens for account 2 
  console.log("Minting tokens for Account 2...");
  // ** const acct2PubAddress = "0x98dd07d88aFE0E5C318747AabC360E8E3A741767";
  const acct2MintTx = await deployer.writeContract({
    address: contractAddress,
    abi,
    functionName: "mint",
    args: [acct2PubAddress, MINT_VALUE]
  });
  console.log(`Transaction hash of Account 2 token mint: ${acct2MintTx}`);
  console.log(
    `[Minted] ${MINT_VALUE.toString()} decimal units to account ${acct2PubAddress}`
  );
  console.log("Waiting for confirmations...");
  await publicClient.waitForTransactionReceipt({
    hash: acct2MintTx,
  });
  //get account 2 balance 
  const acct2Balance = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "balanceOf",
    args: [acct2PubAddress]
  });
  console.log(
    `[Tokens] Account ${acct2PubAddress} has ${acct2Balance} decimal units of MyToken\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});