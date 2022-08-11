import Web3 from "web3";
import { Web3Callback, ContractCallCallback, ContractResultCallback, ContractErrorCallback } from "./types";
import BigNumber from "bignumber.js";
export declare class DaoPort {
    private _protocol;
    constructor(provider: Web3, chainId: number);
    setAccount(account: string): void;
    setOnlyReadWeb3Provider(provider: Web3): void;
    deposit(pid: number, tokenIds: number[], callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void>;
    withdraw(pid: number, tokenIds: number[], callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void>;
    setApprovalForAll(owner: string, nftContract: string, wnftContract: string, isApproveNFT: Boolean, callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void>;
    harvest(pid: number, to: string, wnftTokenIds: number[], callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void>;
    pending<T>({ pid, tokenIds }: {
        pid: number;
        tokenIds: number[];
    }, handle: Web3Callback<T>): Promise<void>;
    getPoolSta({ user, withOwnedNFTTokenIds }: {
        user: string;
        withOwnedNFTTokenIds: boolean;
    }): Promise<{}>;
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
    getTokenPrice(): Promise<number>;
    getPoolInfo({ pid, user, withOwnedNFTTokenIds }: {
        pid: number;
        user: string;
        withOwnedNFTTokenIds: boolean;
    }): Promise<{}>;
    getAllPoolInfos({ user, canDeposite, deposited }: {
        user: string;
        canDeposite: boolean;
        deposited: boolean;
    }): Promise<[]>;
    getPoolInfosByNFTorWNFTs({ nftOrWNFTs, user }: {
        nftOrWNFTs: string[];
        user: string;
    }): Promise<[]>;
    pendingAll(forUser: string): Promise<{}>;
    harvestAll(forUser: string): Promise<string>;
    pendingByNFTorWNFT({ poolNFTorWNFT, poolWNFTTokenIds }: {
        poolNFTorWNFT: string;
        poolWNFTTokenIds: number[];
    }): Promise<{}>;
    pendingAllByWNFTTokenIds({ pids, poolWNFTTokenIds }: {
        pids: number[];
        poolWNFTTokenIds: number[][];
    }): Promise<{}>;
    harvestAllByWNFTTokenIds(forUser: string, pids: number[], poolWNFTTokenIds: number[][], callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void>;
    ownedNFTsTokenIdsByPids({ pids, user }: {
        pids: number[];
        user: string;
    }): Promise<[][]>;
    ownedWNFTsTokenIdsByPids({ pids, user }: {
        pids: number[];
        user: string;
    }): Promise<[][]>;
    ownedNFTsTokenIdsByNFTs({ nfts, user }: {
        nfts: string[];
        user: string;
    }): Promise<[][]>;
    ownedNFTTokenIds({ nft, user }: {
        nft: string;
        user: string;
    }): Promise<[]>;
    getPoolInfosUserCanDeposit({ user, withOwnedNFTTokenIds }: {
        user: string;
        withOwnedNFTTokenIds: boolean;
    }): Promise<{}>;
    getPoolInfosUserDeposited({ user, withOwnedNFTTokenIds }: {
        user: string;
        withOwnedNFTTokenIds: boolean;
    }): Promise<{}>;
}
