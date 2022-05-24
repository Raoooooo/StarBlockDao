import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Protocol } from "./protocol";
import { CallbackHandle, Network, MasterchefInfo, MasterChefPoolsInfo } from "./types";

export class DaoPort {
  public account = "";
  private _protocol: Protocol;
  constructor(provider: Web3, networkName: Network) {
    this._protocol = new Protocol(provider, networkName);
    this._protocol.account = this.account;
  }

  public async deposit(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void> {
    try {
      const txHash = await this._protocol.deposit(pid, tokenIds);
      handle(txHash, "");
    } catch (error) {
      handle("", error);
    }
  }

  public async withdraw(pid: number, tokenIds: number[], handle: CallbackHandle): Promise<void> {
    try {
      const txHash = await this._protocol.withdraw(pid, tokenIds);
      handle(txHash, "");
    } catch (error) {
      handle("", error);
    }
  }

  public async harvestToken(
    pid: number,
    tokenIds: number[],
    handle: CallbackHandle
  ): Promise<void> {
    try {
      const txHash = await this._protocol.harvestToken(pid, tokenIds);
      handle(txHash, "");
    } catch (error) {
      handle("", error);
    }
  }

  public async pendingToken(
    pid: number,
    tokenIds: number[],
    handle: CallbackHandle
  ): Promise<void> {
    try {
      const isPendingToken = await this._protocol.pendingToken(pid, tokenIds);
      handle(isPendingToken, "");
    } catch (error) {
      handle("", false);
    }
  }

  public async getNFTMasterChefInfos({
    nftMasterchef,
    pid,
    owner,
    maxTokenId
  }: {
    nftMasterchef: string;
    pid: number;
    owner: string;
    maxTokenId: number;
  }): Promise<MasterChefPoolsInfo> {
    const { poolInfo, mining, dividend, nftQuantity, wnftQuantity } = await (this._protocol
      .NFTUtilsContract as Contract).methods
      .getNFTMasterChefInfos(nftMasterchef, pid, owner, maxTokenId)
      .call();
    console.log(
      "chefInfo---",
      poolInfo["rewardPerNFTForEachBlock"],
      mining,
      dividend,
      nftQuantity,
      wnftQuantity
    );
    return {
      poolInfo,
      mining,
      dividend,
      nftQuantity,
      wnftQuantity
    };
  }

  public async getNFTMasterChefInfo(pid: number) {
    const { chefInfo = [] } = await (this._protocol.NFTMasterChefContract as Contract).methods
      .poolInfos(pid)
      .call();
    console.log("chefInfo---", chefInfo);
  }
}
