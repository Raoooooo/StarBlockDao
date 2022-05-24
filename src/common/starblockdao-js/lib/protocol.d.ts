import Web3 from "web3";
import { Network } from "./types";
export declare class Protocol {
    account: string;
    NFTMasterChefContract: {};
    NFTUtilsContract: {};
    web3: Web3;
    private _networkName;
    constructor(provider: Web3, networkName: Network);
    deposit(pid: number, tokenIds: number[]): Promise<string>;
    withdraw(pid: number, tokenIds: number[]): Promise<string>;
    harvestToken(pid: number, tokenIds: number[]): Promise<string>;
    pendingToken(pid: number, tokenIds: number[]): Promise<boolean>;
    ownTokens(): Promise<void>;
}
