import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Protocol } from "./protocol";
import { Network, MasterChefPoolsInfo, Web3Callback } from "./types";
import BigNumber from "bignumber.js";

export class DaoPort {
  private _protocol: Protocol;
  constructor(provider: Web3, chainId: number) {
    this._protocol = new Protocol(provider, chainId);
  }

  public setAccount(account: string) {
    this._protocol.account = account;
  }

  public setOnlyReadWeb3Provider(provider: Web3) {
    this._protocol.onlyReadNFTUtilsContract(provider);
  }

  public async deposit({ pid, tokenIds }: { pid: number; tokenIds: number[] }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.NFTMasterChefContract.methods
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

  public async withdraw({ pid, tokenIds }: { pid: number; tokenIds: number[] }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.NFTMasterChefContract.methods
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

  public async setApprovalForAll({
    owner,
    nftContract,
    wnftContract,
    isApproveNFT
  }: {
    owner: string;
    nftContract?: string;
    wnftContract: string;
    isApproveNFT: Boolean;
  }): Promise<string> {
    let txHash;
    let REC721Address = wnftContract;
    if (isApproveNFT) {
      REC721Address = nftContract as string;
    }

    const operator = isApproveNFT ? wnftContract : this._protocol.NFTMasterChefContractAddress;
    try {
      const txnData = { from: owner };
      const REC721Contract = this._protocol.setERC721Addess(REC721Address);
      txHash = await REC721Contract.methods.setApprovalForAll(operator, true).send(txnData);
    } catch (error) {
      throw new Error(
        `Failed to setApprovalForAll transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async harvest({
    pid,
    to,
    wnftTokenIds
  }: {
    pid: number;
    to: string;
    wnftTokenIds: number[];
  }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.NFTMasterChefContract.methods
        .harvest(pid, to, wnftTokenIds)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to harvest transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async harvestAll({
    owner,
    pid,
    tokenIdRange
  }: {
    owner: string;
    pid: number;
    tokenIdRange: number[][];
  }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      const nftMasterchef = this._protocol.NFTMasterChefContractAddress;
      txHash = await this._protocol.NFTMasterChefContract.methods
        .harvestAll(nftMasterchef, owner, pid, tokenIdRange)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to harvest transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async ownedNFTTokens({
    contractAddress,
    owner,
    rangeTokenIds
  }: {
    contractAddress: string;
    owner: string;
    rangeTokenIds: number[];
  }): Promise<number[]> {
    if (rangeTokenIds.length != 2) {
      throw new Error(`beyend token range..."`);
    }
    const tokenIds = await this._protocol.NFTUtilsContract.methods
      .ownedNFTTokens(contractAddress, owner, rangeTokenIds[0], rangeTokenIds[1])
      .call();
    return tokenIds;
  }

  public async pending<T>(
    {
      pid,
      tokenIds
    }: {
      pid: number;
      tokenIds: number[];
    },
    handle: Web3Callback<T>
  ): Promise<void> {
    try {
      const { _mining, _dividend } = await this._protocol.NFTMasterChefContract.methods
        .pending(pid, tokenIds)
        .call();
      const result: T[] = [_mining, _dividend];
      handle(null, result);
    } catch (error) {
      handle(
        new Error(
          `Failed to pending transaction: "${
            error instanceof Error && error.message ? error.message : "user denied"
          }..."`
        ),
        null
      );
    }
  }

  public async pendingAll<T>(
    {
      owner,
      pid,
      tokenIdRange
    }: {
      owner: string;
      pid: number;
      tokenIdRange: number[][];
    },
    handle: Web3Callback<T>
  ): Promise<void> {
    try {
      const nftMasterchef = this._protocol.NFTMasterChefContractAddress;
      const { mining, dividend } = await this._protocol.NFTUtilsContract.methods
        .pendingAll(nftMasterchef, owner, pid, tokenIdRange)
        .call();
      const result: T[] = [mining, dividend];
      handle(null, result);
    } catch (error) {
      handle(
        new Error(
          `Failed to pending transaction: "${
            error instanceof Error && error.message ? error.message : "user denied"
          }..."`
        ),
        null
      );
    }
  }

  public async getNFTMasterChefInfos({
    nftMasterchef,
    pid,
    owner,
    rangeTokenIds
  }: {
    nftMasterchef?: string;
    pid: number;
    owner: string;
    rangeTokenIds: number[];
  }): Promise<MasterChefPoolsInfo> {
    if (rangeTokenIds.length != 2) {
      throw new Error(` beyend token range..."`);
    }
    nftMasterchef = this._protocol.NFTMasterChefContractAddress;
    const {
      _poolInfo,
      _rewardInfo,
      _userInfo,
      _currentRewardIndex,
      _endBlock,
      _nft
    } = await this._protocol.NFTUtilsContract.methods
      .getNFTMasterChefInfos(nftMasterchef, pid, owner, rangeTokenIds[0], rangeTokenIds[1])
      .call();

    const rewardForEachBlock = _rewardInfo["rewardForEachBlock"];
    const rewardPerNFTForEachBlock = _rewardInfo["rewardPerNFTForEachBlock"];
    const mining = _userInfo["mining"];
    const dividend = _userInfo["dividend"];
    const nftQuantity = _userInfo["nftQuantity"];
    const wnftQuantity = _userInfo["wnftQuantity"];
    const isNFTApproved = _userInfo["isNFTApproved"];
    const isWNFTApproved = _userInfo["isWNFTApproved"];

    const poolInfo = _poolInfo;
    const endBlock = _endBlock;
    const nft = _nft;

    return {
      poolInfo,
      rewardForEachBlock,
      rewardPerNFTForEachBlock,
      endBlock,
      mining,
      dividend,
      nftQuantity,
      wnftQuantity,
      isNFTApproved,
      isWNFTApproved,
      nft
    };
  }

  public async canClaim<T>(
    {
      user,
      treeIds,
      amounts,
      merkleProofs
    }: {
      user: string;
      treeIds: number[];
      amounts: BigNumber[];
      merkleProofs: string[][];
    },
    handle: Web3Callback<T>
  ): Promise<void> {
    try {
      const {
        statuses,
        adjustedAmounts
      } = await this._protocol.MerkletRootDistributorContract.methods
        .canClaim(user, treeIds, amounts, merkleProofs)
        .call();
      const result: T[] = [statuses, adjustedAmounts];
      handle(null, result);
    } catch (error) {
      handle(
        new Error(
          `Failed to canClaim transaction: "${
            error instanceof Error && error.message ? error.message : "user denied"
          }..."`
        ),
        null
      );
    }
  }

  public async updateTradingRewards({
    treeIds,
    merkleRoots,
    maxAmountsPerUser,
    merkleProofsSafeGuards
  }: {
    treeIds: number[];
    merkleRoots: string[];
    maxAmountsPerUser: BigNumber[];
    merkleProofsSafeGuards: string[][];
  }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.MerkletRootDistributorContract.methods
        .updateTradingRewards(treeIds, merkleRoots, maxAmountsPerUser, merkleProofsSafeGuards)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to updateTradingRewards transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async claim({
    treeIds,
    amounts,
    merkleProofs
  }: {
    treeIds: number[];
    amounts: BigNumber[];
    merkleProofs: string[][];
  }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.MerkletRootDistributorContract.methods
        .claim(treeIds, amounts, merkleProofs)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to claim transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }
}
