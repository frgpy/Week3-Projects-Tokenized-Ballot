// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { IERC6372$Type } from "./IERC6372";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["IERC6372"]: IERC6372$Type;
    ["@openzeppelin/contracts/interfaces/IERC6372.sol:IERC6372"]: IERC6372$Type;
  }

  interface ContractTypesMap {
    ["IERC6372"]: GetContractReturnType<IERC6372$Type["abi"]>;
    ["@openzeppelin/contracts/interfaces/IERC6372.sol:IERC6372"]: GetContractReturnType<IERC6372$Type["abi"]>;
  }
}
