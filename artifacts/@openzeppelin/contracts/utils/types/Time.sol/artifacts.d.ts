// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { Time$Type } from "./Time";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["Time"]: Time$Type;
    ["@openzeppelin/contracts/utils/types/Time.sol:Time"]: Time$Type;
  }

  interface ContractTypesMap {
    ["Time"]: GetContractReturnType<Time$Type["abi"]>;
    ["@openzeppelin/contracts/utils/types/Time.sol:Time"]: GetContractReturnType<Time$Type["abi"]>;
  }
}
