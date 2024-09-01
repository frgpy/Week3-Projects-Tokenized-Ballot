import { privateKeyToAccount } from "viem/accounts";
import {
  createPublicClient,
  http,
  createWalletClient,
  formatEther,
} from "viem";
import {
  abi,
  bytecode,
} from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";

import { abi as myERC20TokenContractAbi } from "../artifacts/contracts/MyToken.sol/MyToken.json";

import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();
import { toHex, hexToString } from "viem";

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function waitTransactionSuccess(publicClient: any, txHash: any) {
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

  if (!receipt || receipt.status !== "success") {
      throw new Error(`Transaction failed. Hash: ${txHash}`);
  }
  return receipt;
}

async function main() {

  const args = process.argv.slice(2);
  if (args.length < 4) {
    throw new Error("Please provide 3 proposals and the ERC20 token contract address");
  }
  const proposals = args.slice(0, 3);
  const myERC20TokenContract = args[3];

  // print proposals and ERC20 token address
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal #${index + 1}: ${element}`);
  });
  console.log(`ERC20 Token Contract Address: ${myERC20TokenContract}`);

  // connect to Sepolia testnet
  console.log("\nConnecting to blockchain with publicClient...")
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  // print the last block number to confirm connection
  let blockNumber = await publicClient.getBlockNumber();
  console.log("Last block number:", blockNumber);
  const targetBlockNumber = blockNumber + 10n;

  // set up wallet client with deployer's private key
  console.log("\nSetting up deployer wallet...")
  const deployerAcct = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const deployer = createWalletClient({
    account: deployerAcct,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
  
  console.log("Deployer address:", deployer.account.address);
  //proof of success 
  const balance = await publicClient.getBalance({
    address: deployer.account.address,
  });
  console.log(
    "Deployer balance: ",
    formatEther(balance),
    deployer.chain.nativeCurrency.symbol
  );

  
  console.log("\nDeploying TokenizedBallot contract...");
  const hash = await deployer.deployContract({
    abi,
    bytecode: bytecode as `0x${string}`,
    args: [
      proposals.map((prop) => toHex(prop, { size: 32 })),
      myERC20TokenContract,
      targetBlockNumber
    ],
  });
  
  // proof of successful deployment transaction 
  console.log("Transaction hash:", hash);
  
  console.log("Waiting for confirmations...");
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
 
  console.log("Ballot contract deployed to:", receipt.contractAddress);
  
  if (!receipt.contractAddress) {
    console.log("Contract deployment failed");
    return;
  }

  console.log("Proposals:");
  for (let index = 0; index < proposals.length; index++) {
    const proposal = (await publicClient.readContract({
      address: receipt.contractAddress as `0x${string}`,
      abi,
      functionName: "proposals",
      args: [BigInt(index)]
    })) as any[];
    const name = hexToString(proposal[0], { size: 32 });
    console.log({ index, name, proposal });
  }
  // Check and delegate voting rights
  console.log("\nChecking Deployer's voting rights...");
  const deployerVotingRights = await publicClient.readContract({
    address: myERC20TokenContract as `0x${string}`,
    abi: myERC20TokenContractAbi,
    functionName: "getVotes",
    args: [deployer.account.address]
  });
  console.log(`Deployer has ${deployerVotingRights} of voting tokens`)

  
  // deployer self delegates voting rights
  const deployerDelegateVotingRights = await deployer.writeContract({
    address: myERC20TokenContract as `0x${string}`,
    abi: myERC20TokenContractAbi,
    functionName: "delegate",
    account: deployerAcct,
    args: [deployer.account.address], 
  });
  console.log(`Deployer has delegated himself voting tokens`)

  await waitTransactionSuccess(publicClient, deployerDelegateVotingRights);

  // check voting rights
  const deployerVotingRightsAfter = await publicClient.readContract({
    address: myERC20TokenContract as `0x${string}`,
    abi: myERC20TokenContractAbi,
    functionName: "getVotes",
    args: [deployer.account.address],
  });
  console.log(`Deployer has ${deployerVotingRightsAfter} of voting tokens`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});