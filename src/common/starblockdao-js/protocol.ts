import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Network, PartialReadonlyContractAbi, MasterchefInfo } from "./types";
import { constants } from "./protocolConstants";

export class Protocol {
  public account = "";
  public NFTMasterChefContract: {};
  public NFTUtilsContract: {};
  public web3: Web3;
  private _networkName: Network;

  constructor(provider: Web3, networkName: Network) {
    this.web3 = provider;
    this._networkName = networkName;

    const NFTMasterChefContractAddress = constants.DEPLOYED[networkName].NFTMasterChef;
    const NFTMasterChefAbi: PartialReadonlyContractAbi = constants.NFTMASTERCHEF_ABI;

    this.NFTMasterChefContract = new this.web3.eth.Contract(
      NFTMasterChefAbi,
      NFTMasterChefContractAddress
    );

    const NFTUtilsAddress = constants.DEPLOYED[networkName].NFTUtils;
    const NFTUtilsAbi: PartialReadonlyContractAbi = constants.NFTUtils_ABI;

    this.NFTUtilsContract = new this.web3.eth.Contract(NFTUtilsAbi, NFTUtilsAddress);
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

  public async pendingToken(pid: number, tokenIds: number[]): Promise<boolean> {
    const isPendingToken = await (this.NFTMasterChefContract as Contract).methods
      .pendingToken(pid, tokenIds)
      .call();
    if (!isPendingToken) {
      throw new Error(`Failed to pendingToken!`);
    }
    return isPendingToken;
  }

  public async ownTokens() {
    const poolInfos = await (this.NFTMasterChefContract as Contract).methods.ownTokens().call();

    if (Array.isArray(poolInfos) && poolInfos.length) {
      poolInfos.forEach(element => console.log(element));
    }
  }
}
