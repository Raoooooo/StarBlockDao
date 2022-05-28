import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Network, PartialReadonlyContractAbi } from "./types";
import { constants } from "./protocolConstants";

export class Protocol {
  public account = "";
  public NFTMasterChefContractAddress: string;
  public NFTMasterChefContract: {};
  public NFTUtilsContract: {};
  public web3: Web3;
  private _networkName: Network;

  constructor(provider: Web3, networkName: Network) {
    this.web3 = provider;
    this._networkName = networkName;

    this.NFTMasterChefContractAddress = constants.DEPLOYED[networkName].NFTMasterChef;
    const NFTMasterChefAbi: PartialReadonlyContractAbi = constants.NFTMASTERCHEF_ABI;

    this.NFTMasterChefContract = new this.web3.eth.Contract(
      NFTMasterChefAbi,
      this.NFTMasterChefContractAddress
    );

    const NFTUtilsAddress = constants.DEPLOYED[networkName].NFTUtils;
    const NFTUtilsAbi: PartialReadonlyContractAbi = constants.NFTUtils_ABI;

    this.NFTUtilsContract = new this.web3.eth.Contract(NFTUtilsAbi, NFTUtilsAddress);
  }

  public setERC721Addess(address: string): Contract {
    return new this.web3.eth.Contract(constants.REC721_ABI, address);
  }

  public setIWrappedNFTAddress(address: string): Contract {
    return new this.web3.eth.Contract(constants.IWrappedNFT_ABI, address);
  }

  public async deposit(pid: number, tokenIds: number[]): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this.account };
      txHash = await (this.NFTMasterChefContract as Contract).methods
        .deposit(pid, tokenIds)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to deposit transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async withdraw(pid: number, tokenIds: number[]): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this.account };
      txHash = await (this.NFTMasterChefContract as Contract).methods
        .withdraw(pid, tokenIds)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to withdraw transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async harvestToken(pid: number, tokenIds: number[]): Promise<string> {
    const account = this.web3.eth.defaultAccount;
    let txHash;
    try {
      const txnData = { from: account };
      txHash = await (this.NFTMasterChefContract as Contract).methods
        .harvestToken(pid, tokenIds)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to harvestToken transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async pending(pid: number, tokenIds: number[]): Promise<{}> {
    const { mining, dividend } = await (this.NFTMasterChefContract as Contract).methods
      .pending(pid, tokenIds)
      .call();
    return { mining, dividend };
  }
}
