import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Network } from "./types";
export declare class Protocol {
    account: string;
    NFTMasterChefContractAddress: string;
    NFTMasterChefContract: {};
    NFTUtilsContract: {};
    web3: Web3;
    private _networkName;
    constructor(provider: Web3, networkName: Network);
    setERC721Addess(address: string): Contract;
    setIWrappedNFTAddress(address: string): Contract;
    deposit(pid: number, tokenIds: number[]): Promise<string>;
    withdraw(pid: number, tokenIds: number[]): Promise<string>;
    harvestToken(pid: number, tokenIds: number[]): Promise<string>;
    pending(pid: number, tokenIds: number[]): Promise<{}>;
}
