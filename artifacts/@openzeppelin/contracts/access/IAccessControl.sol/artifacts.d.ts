// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { IAccessControl$Type } from "./IAccessControl";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["IAccessControl"]: IAccessControl$Type;
    ["@openzeppelin/contracts/access/IAccessControl.sol:IAccessControl"]: IAccessControl$Type;
  }

  interface ContractTypesMap {
    ["IAccessControl"]: GetContractReturnType<IAccessControl$Type["abi"]>;
    ["@openzeppelin/contracts/access/IAccessControl.sol:IAccessControl"]: GetContractReturnType<IAccessControl$Type["abi"]>;
  }
}
