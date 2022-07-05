import Web3 from "web3";
import { ContractCallCallback, ContractResultCallback, ContractErrorCallback } from "./types";
import BigNumber from "bignumber.js";
export declare class CollectionPort {
    private _protocol;
    constructor(provider: Web3, chainId: number);
    setAccount(account: string): void;
    setStarblockCollectionAddress(contractAddress: string): void;
    getStarBlockByteCodeAbi(): {};
    setOnlyReadWeb3Provider(provider: Web3): void;
    publicSaleConfig(): Promise<{}>;
    getInfo(user: string): Promise<{}>;
    userCanMint(user: string, amount: number): Promise<{}>;
    updateWhitelistSaleConfig(whitelistSaleConfig: []): Promise<string>;
    updatePublicSaleConfig(publicSaleConfig: []): Promise<string>;
    addWhitelists(addresses: string[]): Promise<string>;
    whitelistMint(amount: number, price: BigNumber, callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void>;
    publicMint(amount: number, price: BigNumber, callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void>;
    getCollectionInfo(starBlockCollectionAddress: string, user: string): Promise<{}>;
}
