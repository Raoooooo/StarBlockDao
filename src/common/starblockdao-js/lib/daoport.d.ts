import Web3 from "web3";
import { MasterChefPoolsInfo, Web3Callback } from "./types";
import BigNumber from "bignumber.js";
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
    harvestAll({ owner, pid, tokenIdRange }: {
        owner: string;
        pid: number;
        tokenIdRange: number[][];
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
    pendingAll<T>({ owner, pid, tokenIdRange }: {
        owner: string;
        pid: number;
        tokenIdRange: number[][];
    }, handle: Web3Callback<T>): Promise<void>;
    getNFTMasterChefInfos({ nftMasterchef, pid, owner, rangeTokenIds }: {
        nftMasterchef?: string;
        pid: number;
        owner: string;
        rangeTokenIds: number[];
    }): Promise<MasterChefPoolsInfo>;
    canClaim<T>({ user, treeIds, amounts, merkleProofs }: {
        user: string;
        treeIds: number[];
        amounts: BigNumber[];
        merkleProofs: string[][];
    }, handle: Web3Callback<T>): Promise<void>;
    updateTradingRewards({ treeIds, merkleRoots, maxAmountsPerUser, merkleProofsSafeGuards }: {
        treeIds: number[];
        merkleRoots: string[];
        maxAmountsPerUser: BigNumber[];
        merkleProofsSafeGuards: string[][];
    }): Promise<string>;
    claim({ treeIds, amounts, merkleProofs }: {
        treeIds: number[];
        amounts: BigNumber[];
        merkleProofs: string[][];
    }): Promise<string>;
}
