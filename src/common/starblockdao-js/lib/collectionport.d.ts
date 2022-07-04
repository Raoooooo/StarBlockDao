import Web3 from "web3";
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
    setSaleConfig(whitelistSaleConfig: [], publicSaleConfig: []): Promise<string>;
    addWhitelists(addresses: string[]): Promise<string>;
    whitelistMint(amount: number, price: BigNumber): Promise<string>;
    publicMint(amount: number, price: BigNumber): Promise<string>;
    getCollectionInfo(starBlockCollectionAddress: string, user: string): Promise<{}>;
}
