import { privateKeyToAccount } from "viem/accounts";
import {
    createPublicClient,
    http,
    createWalletClient,
    formatEther,
} from "viem";
import { abi as myERC20TokenContractAbi } from "../artifacts/contracts/MyToken.sol/MyToken.json";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();
import { toHex, hexToString } from "viem";

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
    // **define the address of the ERC20 token contract
    const myERC20TokenContract = "0x798fe65fefb58e2da6b25e24423f86869360113d"

    // connect to Sepolia testnet
    console.log("\nConnecting to blockchain with publicClient...")
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });
    // read the deployer’s voting rights from the ERC20 token contract
    const deployerVotingRightsAfter = await publicClient.readContract({
        address: myERC20TokenContract as `0x${string}`,
        abi: myERC20TokenContractAbi,
        functionName: "getVotes",
        args: ["0x0aCA03DA72A643f5403d07d7657C17B6E3ED575D"],
    });
    
    console.log(`Deployer has ${deployerVotingRightsAfter} of voting tokens`)
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});