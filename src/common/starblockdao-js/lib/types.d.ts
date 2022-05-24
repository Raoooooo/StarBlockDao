import { AbiItem } from "web3-utils";
export declare enum Network {
    Main = "main",
    Rinkeby = "rinkeby"
}
export interface CallbackHandle {
    (arg1: any, arg2: any): void;
}
export declare type PartialReadonlyContractAbi = AbiItem[];
export interface MasterchefInfo {
    nftMasterchef: string;
    pid: number;
    owner: string | null;
    maxTokenId: number;
}
export interface MasterChefPoolsInfo {
    poolInfo: {};
    mining: number | null;
    dividend: number | null;
    nftQuantity: number | null;
    wnftQuantity: number | null;
}
