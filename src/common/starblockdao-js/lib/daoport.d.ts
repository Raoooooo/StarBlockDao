import Web3 from "web3";
import { CallbackHandle, Network, MasterChefPoolsInfo, Web3Callback } from "./types";
export declare class DaoPort {
    private _protocol;
    constructor(provider: Web3, networkName: Network);
    setAccount(account: string): void;
    deposit({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }): Promise<string>;
    withdraw(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    isApprovedForAll({ owner, operator, wnftContract, isApproveNFT }: {
        owner: string;
        operator: string;
        wnftContract: string;
        isApproveNFT: Boolean;
    }): Promise<boolean>;
    setApprovalForAll({ owner, operator, wnftContract, isApproveNFT }: {
        owner: string;
        operator?: string;
        wnftContract: string;
        isApproveNFT: Boolean;
    }): Promise<string>;
    harvestToken(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    ownedTokens({ contractAddress, owner }: {
        contractAddress: string;
        owner: string;
    }): Promise<number[]>;
    getNFTContractAddress(wnftContract: string): Promise<string>;
    pending<T>({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }, handle: Web3Callback<T>): Promise<void>;
    getNFTMasterChefInfos({ nftMasterchef, pid, owner }: {
        nftMasterchef?: string;
        pid: number;
        owner: string;
        maxTokenId: number;
    }): Promise<MasterChefPoolsInfo>;
}
