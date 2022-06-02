import Web3 from "web3";
import { MasterChefPoolsInfo, Web3Callback } from "./types";
export declare class DaoPort {
    private _protocol;
    constructor(provider: Web3, chainId: number);
    setAccount(account: string): void;
    setOnlyReadWeb3Provider(provider: Web3): void;
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
    setApprovalForAll({ owner, nftContract, wnftContract, isApproveNFT }: {
        owner: string;
        nftContract?: string;
        wnftContract: string;
        isApproveNFT: Boolean;
    }): Promise<string>;
    harvest({ pid, to, wnftTokenIds }: {
        pid: number;
        to: string;
        wnftTokenIds: number[];
    }): Promise<string>;
    ownedNFTTokens({ contractAddress, owner, rangeTokenIds }: {
        contractAddress: string;
        owner: string;
        rangeTokenIds: number[];
    }): Promise<number[]>;
    pending<T>({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }, handle: Web3Callback<T>): Promise<void>;
    getNFTMasterChefInfos({ nftMasterchef, pid, owner, rangeTokenIds }: {
        nftMasterchef?: string;
        pid: number;
        owner: string;
        rangeTokenIds: number[];
    }): Promise<MasterChefPoolsInfo>;
}
