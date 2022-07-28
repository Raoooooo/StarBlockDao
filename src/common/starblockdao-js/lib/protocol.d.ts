import Web3 from "web3";
import { Contract } from "web3-eth-contract";
export declare class Protocol {
    account: string;
    NFTMasterChefContractAddress: string;
    NFTMasterChefContract: Contract;
    NFTUtilsContract: Contract;
    web3: Web3;
    private NFTUtilsAddress;
    private NFTUtilsAbi;
    MerkletRootDistributorContractAddress: string;
    MerkletRootDistributorContract: Contract;
    NFTMasterChefBatchContract: Contract;
    StarblockCollectionContract: Contract;
    StarblockCollectionUtilsContract: Contract;
    private _networkName;
    constructor(provider: Web3, chainId: number);
    setStarblockCollectionAddress(contractAddress: string): void;
    setERC721Addess(address: string): Contract;
    setIWrappedNFTAddress(address: string): Contract;
    onlyReadNFTUtilsContract(provider: Web3): void;
    onlyReadNFTMasterChefBatchContract(provider: Web3): void;
    onlyReadCollectionUtilsContract(provider: Web3): void;
    deposit(pid: number, tokenIds: number[]): Promise<string>;
    withdraw(pid: number, tokenIds: number[]): Promise<string>;
    harvestToken(pid: number, tokenIds: number[]): Promise<string>;
    pending(pid: number, tokenIds: number[]): Promise<{}>;
}
