// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface Nonces$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "Nonces",
  "sourceName": "@openzeppelin/contracts/utils/Nonces.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "currentNonce",
          "type": "uint256"
        }
      ],
      "name": "InvalidAccountNonce",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "nonces",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "Nonces",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Nonces$Type["abi"]>>;
  export function deployContract(
    contractName: "@openzeppelin/contracts/utils/Nonces.sol:Nonces",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Nonces$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "Nonces",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Nonces$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@openzeppelin/contracts/utils/Nonces.sol:Nonces",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Nonces$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "Nonces",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Nonces$Type["abi"]>>;
  export function getContractAt(
    contractName: "@openzeppelin/contracts/utils/Nonces.sol:Nonces",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Nonces$Type["abi"]>>;
}
