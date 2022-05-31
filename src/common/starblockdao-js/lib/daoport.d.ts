import Web3 from "web3";
import { Network, MasterChefPoolsInfo, Web3Callback } from "./types";
export declare class DaoPort {
    private _protocol;
    constructor(provider: Web3, networkName: Network);
    setAccount(account: string): void;
    deposit({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }): Promise<string>;
    withdraw({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }): Promise<string>;
    isApprovedForAll({ owner, operator, wnftContract, isApproveNFT }: {
        owner: string;
        operator?: string;
        wnftContract: string;
        isApproveNFT: Boolean;
    }): Promise<boolean>;
    setApprovalForAll({ owner, operator, wnftContract, isApproveNFT }: {
        owner: string;
        operator?: string;
        wnftContract: string;
        isApproveNFT: Boolean;
    }): Promise<string>;
    harvest({ pid, to, wnftTokenIds }: {
        pid: number;
        to: string;
        wnftTokenIds: number[];
    }): Promise<string>;
    ownedTokens({ contractAddress, owner }: {
        contractAddress: string;
        owner: string;
    }): Promise<number[]>;
    getNFTContractAddress(wnftContract: string): Promise<string>;
    pending<T>({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }, handle: Web3Callback<T>): Promise<void>;
    getNFTMasterChefInfos({ nftMasterchef, pid, owner, maxTokenId }: {
        nftMasterchef?: string;
        pid: number;
        owner: string;
        maxTokenId?: number;
    }): Promise<MasterChefPoolsInfo>;
}
