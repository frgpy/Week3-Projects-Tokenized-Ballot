import { viem } from 'hardhat';
import { createPublicClient, http, createWalletClient, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv"; // importing `dotenv` to load variables from a .env file

dotenv.config(); // loading environment variables from the .env file

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const BALLOT_CONTRACT_ADDRESS = process.env.BALLOT_CONTRACT_ADDRESS || "";

async function main() {
    // create a public client for interacting with Sepolia 
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`)
  });

  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);


  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`)
  });

  const tokenizedBallotContract = await viem.getContractAt("TokenizedBallot", "0xbf011577418cffec1433b0354aa17f10d04e0a83");

  console.log("Voting on proposals...");

  // voting on the first proposal with 7 tokens
  const voteTx1 = await tokenizedBallotContract.write.vote([0n, parseEther("7")], {
    account: account.address,
  });
  await publicClient.waitForTransactionReceipt({ hash: voteTx1 });
  console.log(`Account ${account.address} voted 5 tokens for proposal 0`);

  // looking to check voting results
  for (let i = 0; i < 3; i++) {
    const proposal = await tokenizedBallotContract.read.proposals([BigInt(i)]);
    console.log(`Proposal ${i}: ${proposal[0]} has ${proposal[1]} votes`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});