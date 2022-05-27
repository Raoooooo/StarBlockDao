import { AbiItem } from "web3-utils";

export enum Network {
  Main = "main",
  Rinkeby = "rinkeby"
}

export interface CallbackHandle {
  (arg1: any, arg2: any): void;
}

export type Web3Callback<T> = (err: Error | null, result: T | null | T[]) => void;

export type PartialReadonlyContractAbi = AbiItem[];

export interface MasterChefPoolsInfo {
  poolInfo: {};
  mining: number | null;
  dividend: number | null;
  nftQuantity: number | null;
  wnftQuantity: number | null;
}
