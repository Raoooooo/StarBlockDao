import Web3 from "web3";
import { CallbackHandle, Network, MasterChefPoolsInfo, Web3Callback } from "./types";
export declare class DaoPort {
    account: string;
    private _protocol;
    constructor(provider: Web3, networkName: Network);
    deposit(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    withdraw(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    isApprovedForAll({ owner, operator, contractAddress, isApproveNFT }: {
        owner: string;
        operator: string;
        contractAddress: string;
        isApproveNFT: Boolean;
    }): Promise<boolean>;
    setApprovalForAll({ owner, operator, contractAddress, isApproveNFT }: {
        owner: string;
        operator: string;
        contractAddress: string;
        isApproveNFT: Boolean;
    }): Promise<string>;
    harvestToken(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    pending<T>({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }, handle: Web3Callback<T>): Promise<void>;
    getNFTMasterChefInfos({ nftMasterchef, pid, owner, maxTokenId }: {
        nftMasterchef: string;
        pid: number;
        owner: string;
        maxTokenId: number;
    }): Promise<MasterChefPoolsInfo>;
}
