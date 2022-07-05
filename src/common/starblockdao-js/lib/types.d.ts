import { AbiItem } from "web3-utils";
export declare enum Network {
    Main = "main",
    Rinkeby = "rinkeby"
}
export interface CallbackHandle {
    (arg1: any, arg2: any): void;
}
export declare type Web3Callback<T> = (err: Error | null, result: T | null | T[]) => void;
export declare type ContractCallCallback = (txHash: string) => void;
export declare type ContractResultCallback = (res: {}) => void;
export declare type ContractErrorCallback = (err: Error) => void;
export declare type PartialReadonlyContractAbi = AbiItem[];
export interface MasterChefPoolsInfo {
    poolInfo: {};
    rewardForEachBlock: number | null;
    rewardPerNFTForEachBlock: number | null;
    endBlock: number | null;
    mining: number | null;
    dividend: number | null;
    nftQuantity: number | null;
    wnftQuantity: number | null;
    isNFTApproved: boolean;
    isWNFTApproved: boolean;
    nft: string;
}
