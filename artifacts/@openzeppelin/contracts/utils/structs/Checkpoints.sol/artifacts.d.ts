// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { Checkpoints$Type } from "./Checkpoints";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["Checkpoints"]: Checkpoints$Type;
    ["@openzeppelin/contracts/utils/structs/Checkpoints.sol:Checkpoints"]: Checkpoints$Type;
  }

  interface ContractTypesMap {
    ["Checkpoints"]: GetContractReturnType<Checkpoints$Type["abi"]>;
    ["@openzeppelin/contracts/utils/structs/Checkpoints.sol:Checkpoints"]: GetContractReturnType<Checkpoints$Type["abi"]>;
  }
}
