import Web3 from "web3";
import { CallbackHandle, Network, MasterChefPoolsInfo } from "./types";
export declare class DaoPort {
    account: string;
    private _protocol;
    constructor(provider: Web3, networkName: Network);
    deposit(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    withdraw(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    harvestToken(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    pendingToken(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void>;
    getNFTMasterChefInfos({ nftMasterchef, pid, owner, maxTokenId }: {
        nftMasterchef: string;
        pid: number;
        owner: string;
        maxTokenId: number;
    }): Promise<MasterChefPoolsInfo>;
    getNFTMasterChefInfo(pid: number): Promise<void>;
}
