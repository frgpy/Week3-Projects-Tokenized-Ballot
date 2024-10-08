// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { IVotes$Type } from "./IVotes";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["IVotes"]: IVotes$Type;
    ["@openzeppelin/contracts/governance/utils/IVotes.sol:IVotes"]: IVotes$Type;
  }

  interface ContractTypesMap {
    ["IVotes"]: GetContractReturnType<IVotes$Type["abi"]>;
    ["@openzeppelin/contracts/governance/utils/IVotes.sol:IVotes"]: GetContractReturnType<IVotes$Type["abi"]>;
  }
}
