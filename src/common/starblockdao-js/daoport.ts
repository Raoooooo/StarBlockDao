import Web3 from "web3";
import { Protocol } from "./protocol";
import { Network, MasterChefPoolsInfo, Web3Callback, ContractCallCallback, ContractResultCallback, ContractErrorCallback } from "./types";
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
    this._protocol.onlyReadNFTMasterChefBatchContract(provider);
  }

  public async deposit(pid: number, tokenIds: number[], callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void> {
    // let txHash;
    // try {
    //   const txnData = { from: this._protocol.account };
    //   txHash = await this._protocol.NFTMasterChefContract.methods
    //     .deposit(pid, tokenIds)
    //     .send(txnData);
    // } catch (error) {
    //   console.error(error);
    //   throw new Error(
    //     `Failed to deposit transaction: "${error instanceof Error && error.message ? error.message : "user denied"
    //     }..."`
    //   );
    // }
    // return txHash;


    const txnData = { from: this._protocol.account };

    await this._protocol.NFTMasterChefContract.methods
      .deposit(pid, tokenIds)
      .send(txnData)
      .on("transactionHash", (txHash: string) => {
        callCallback(txHash);
      })
      .then((res: {}) => {
        resultCallback(res);
      })
      .catch((error: Error) => {
        errorCallback(
          new Error(
            `Failed to deposit transaction: "${error instanceof Error && error.message ? error.message : "user denied"
            }..."`
          )
        );
      });
  }

  public async withdraw(pid: number, tokenIds: number[], callCallback: ContractCallCallback, resultCallback: ContractResultCallback, errorCallback: ContractErrorCallback): Promise<void> {
    // let txHash;
    // try {
    //   const txnData = { from: this._protocol.account };
    //   txHash = await this._protocol.NFTMasterChefContract.methods
    //     .withdraw(pid, tokenIds)
    //     .send(txnData);
    // } catch (error) {
    //   console.error(error);
    //   throw new Error(
    //     `Failed to withdraw transaction: "${error instanceof Error && error.message ? error.message : "user denied"
    //     }..."`
    //   );
    // }
    // return txHash;

    const txnData = { from: this._protocol.account };

    await this._protocol.NFTMasterChefContract.methods
      .withdraw(pid, tokenIds)
      .send(txnData)
      .on("transactionHash", (txHash: string) => {
        callCallback(txHash);
      })
      .then((res: {}) => {
        resultCallback(res);
      })
      .catch((error: Error) => {
        errorCallback(
          new Error(
            `Failed to withdraw transaction: "${error instanceof Error && error.message ? error.message : "user denied"
            }..."`
          )
        );
      });
  }

  public async setApprovalForAll(
    owner: string,
    nftContract: string,
    wnftContract: string,
    isApproveNFT: Boolean,
    callCallback: ContractCallCallback,
    resultCallback: ContractResultCallback,
    errorCallback: ContractErrorCallback
  ): Promise<void> {
    // let txHash;
    // let REC721Address = wnftContract;
    // if (isApproveNFT) {
    //   REC721Address = nftContract as string;
    // }

    // const operator = isApproveNFT ? wnftContract : this._protocol.NFTMasterChefContractAddress;
    // try {
    //   const txnData = { from: owner };
    //   const REC721Contract = this._protocol.setERC721Addess(REC721Address);
    //   txHash = await REC721Contract.methods.setApprovalForAll(operator, true).send(txnData);
    // } catch (error) {
    //   throw new Error(
    //     `Failed to setApprovalForAll transaction: "${error instanceof Error && error.message ? error.message : "user denied"
    //     }..."`
    //   );
    // }
    // return txHash;

    let REC721Address = wnftContract;
    if (isApproveNFT) {
      REC721Address = nftContract as string;
    }
    const REC721Contract = this._protocol.setERC721Addess(REC721Address);
    const operator = isApproveNFT ? wnftContract : this._protocol.NFTMasterChefContractAddress;

    const txnData = { from: owner };
    await REC721Contract.methods
      .setApprovalForAll(operator, true)
      .send(txnData)
      .on("transactionHash", (txHash: string) => {
        callCallback(txHash);
      })
      .then((res: {}) => {
        resultCallback(res);
      })
      .catch((error: Error) => {
        errorCallback(
          new Error(
            `Failed to setApprovalForAll transaction: "${error instanceof Error && error.message ? error.message : "user denied"
            }..."`
          )
        );
      });
  }

  public async harvest(
    pid: number,
    to: string,
    wnftTokenIds: number[],
    callCallback: ContractCallCallback,
    resultCallback: ContractResultCallback,
    errorCallback: ContractErrorCallback
  ): Promise<void> {
    // let txHash;
    // try {
    //   const txnData = { from: this._protocol.account };
    //   txHash = await this._protocol.NFTMasterChefContract.methods
    //     .harvest(pid, to, wnftTokenIds)
    //     .send(txnData);
    // } catch (error) {
    //   console.error(error);
    //   throw new Error(
    //     `Failed to harvest transaction: "${error instanceof Error && error.message ? error.message : "user denied"
    //     }..."`
    //   );
    // }
    // return txHash;

    const txnData = { from: this._protocol.account };
    await this._protocol.NFTMasterChefContract.methods
      .harvest(pid, to, wnftTokenIds)
      .send(txnData)
      .on("transactionHash", (txHash: string) => {
        callCallback(txHash);
      })
      .then((res: {}) => {
        resultCallback(res);
      })
      .catch((error: Error) => {
        errorCallback(
          new Error(
            `Failed to harvest transaction: "${error instanceof Error && error.message ? error.message : "user denied"
            }..."`
          )
        );
      });
  }

  /*  public async harvestAll({
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
  } */

  // public async ownedNFTTokens({
  //   contractAddress,
  //   owner,
  //   rangeTokenIds
  // }: {
  //   contractAddress: string;
  //   owner: string;
  //   rangeTokenIds: number[];
  // }): Promise<number[]> {
  //   if (rangeTokenIds.length != 2) {
  //     throw new Error(`beyend token range..."`);
  //   }
  //   const tokenIds = await this._protocol.NFTUtilsContract.methods
  //     .ownedNFTTokens(contractAddress, owner, rangeTokenIds[0], rangeTokenIds[1])
  //     .call();
  //   return tokenIds;
  // }

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
          `Failed to pending transaction: "${error instanceof Error && error.message ? error.message : "user denied"
          }..."`
        ),
        null
      );
    }
  }

  /*   public async pendingAll<T>(
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
  } */


  public async getPoolSta({
    user,
    withOwnedNFTTokenIds
  }: {
    user: string;
    withOwnedNFTTokenIds: boolean;
  }): Promise<{}> {
    const { _poolSta, _userInfo, _wrappedPoolInfos, } = await this._protocol.NFTMasterChefBatchContract.methods
      .getPoolSta(user, withOwnedNFTTokenIds)
      .call();
    // console.log("getPoolSta _poolSta、_userInfo、_wrappedPoolInfos:::", _poolSta, _userInfo, _wrappedPoolInfos);
    const poolSta = _poolSta;
    const userInfo = _userInfo;
    const wrappedPoolInfos = _wrappedPoolInfos;
    return {
      poolSta,
      userInfo,
      wrappedPoolInfos
    };
  }

  // public async getNFTMasterChefInfos({
  //   nftMasterchef,
  //   pid,
  //   owner,
  //   rangeTokenIds
  // }: {
  //   nftMasterchef?: string;
  //   pid: number;
  //   owner: string;
  //   rangeTokenIds: number[];
  // }): Promise<MasterChefPoolsInfo> {
  //   if (rangeTokenIds.length != 2) {
  //     throw new Error(` beyend token range..."`);
  //   }
  //   nftMasterchef = this._protocol.NFTMasterChefContractAddress;
  //   const {
  //     _poolInfo,
  //     _rewardInfo,
  //     _userInfo,
  //     _currentRewardIndex,
  //     _endBlock,
  //     _nft
  //   } = await this._protocol.NFTUtilsContract.methods
  //     .getNFTMasterChefInfos(nftMasterchef, pid, owner, rangeTokenIds[0], rangeTokenIds[1])
  //     .call();

  //   const rewardForEachBlock = _rewardInfo["rewardForEachBlock"];
  //   const rewardPerNFTForEachBlock = _rewardInfo["rewardPerNFTForEachBlock"];
  //   const mining = _userInfo["mining"];
  //   const dividend = _userInfo["dividend"];
  //   const nftQuantity = _userInfo["nftQuantity"];
  //   const wnftQuantity = _userInfo["wnftQuantity"];
  //   const isNFTApproved = _userInfo["isNFTApproved"];
  //   const isWNFTApproved = _userInfo["isWNFTApproved"];

  //   const poolInfo = _poolInfo;
  //   const endBlock = _endBlock;
  //   const nft = _nft;

  //   return {
  //     poolInfo,
  //     rewardForEachBlock,
  //     rewardPerNFTForEachBlock,
  //     endBlock,
  //     mining,
  //     dividend,
  //     nftQuantity,
  //     wnftQuantity,
  //     isNFTApproved,
  //     isWNFTApproved,
  //     nft
  //   };
  // }

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
      const array = await this._protocol.MerkletRootDistributorContract.methods
        .canClaim(user, treeIds, amounts, merkleProofs)
        .call();
      const result: T[] = [array[0], array[1]];
      handle(null, result);
    } catch (error) {
      handle(
        new Error(
          `Failed to canClaim transaction: "${error instanceof Error && error.message ? error.message : "user denied"
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
        `Failed to updateTradingRewards transaction: "${error instanceof Error && error.message ? error.message : "user denied"
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
        `Failed to claim transaction: "${error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async getTokenPrice(): Promise<number> {
    const tokenPrice = await this._protocol.NFTMasterChefBatchContract.methods
      .getTokenPrice()
      .call();
    return tokenPrice;
  }

  public async getPoolInfo({
    pid,
    user,
    withOwnedNFTTokenIds
  }: {
    pid: number;
    user: string;
    withOwnedNFTTokenIds: boolean;
  }): Promise<{}> {
    const _wrappedPoolInfo = await this._protocol.NFTMasterChefBatchContract.methods
      .getPoolInfo(pid, user, withOwnedNFTTokenIds)
      .call();
    console.log("getPoolInfo _wrappedPoolInfo:::", _wrappedPoolInfo);
    return _wrappedPoolInfo;
  }

  public async getAllPoolInfos({
    user,
    canDeposite,
    deposited
  }: {
    user: string;
    canDeposite: boolean;
    deposited: boolean
  }): Promise<[]> {
    const _wrappedPoolInfos = await this._protocol.NFTMasterChefBatchContract.methods
      .getAllPoolInfos(user, canDeposite, deposited)
      .call();
    console.log("getPoolInfo _wrappedPoolInfos:::", _wrappedPoolInfos);
    return _wrappedPoolInfos;
  }

  public async getPoolInfosByNFTorWNFTs({
    poolNFTorWNFTs,
    user,
    withOwnedNFTTokenIds
  }: {
    poolNFTorWNFTs: string[];
    user: string;
    withOwnedNFTTokenIds: boolean;
  }): Promise<[]> {
    const _wrappedPoolInfos = await this._protocol.NFTMasterChefBatchContract.methods
      .getPoolInfosByNFTorWNFTs(poolNFTorWNFTs, user, withOwnedNFTTokenIds)
      .call();
    console.log("getPoolInfo _wrappedPoolInfos:::", _wrappedPoolInfos);
    return _wrappedPoolInfos;
  }

  public async pendingAll(forUser: string): Promise<{}> {
    let txHash;
    const _userInfo = await this._protocol.NFTMasterChefBatchContract.methods
      .pendingAll(forUser)
      .call();
    return _userInfo;
  }

  public async harvestAll(forUser: string): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.NFTMasterChefBatchContract.methods
        .harvestAll(forUser)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to harvestAll transaction: "${error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async pendingByNFTorWNFT({
    poolNFTorWNFT,
    poolWNFTTokenIds
  }: {
    poolNFTorWNFT: string;
    poolWNFTTokenIds: number[];
  }): Promise<{}> {
    const {
      _poolExists,
      _pid,
      _mining,
      _dividend
    } = await this._protocol.NFTMasterChefBatchContract.methods
      .pendingByNFTorWNFT(poolNFTorWNFT, poolWNFTTokenIds)
      .call();
    console.log("pendingByNFTorWNFT:::", _poolExists, _pid, _mining, _dividend);
    return { _poolExists, _pid, _mining, _dividend };
  }

  public async pendingAllByWNFTTokenIds({
    pids,
    poolWNFTTokenIds
  }: {
    pids: number[];
    poolWNFTTokenIds: number[][];
  }): Promise<{}> {
    const {
      _mining,
      _dividend
    } = await this._protocol.NFTMasterChefBatchContract.methods
      .pendingAllByWNFTTokenIds(pids, poolWNFTTokenIds)
      .call();
    console.log("pendingAllByWNFTTokenIds:::", _mining, _dividend);
    return { _mining, _dividend };
  }

  public async harvestAllByWNFTTokenIds(
    forUser: string,
    pids: number[],
    poolWNFTTokenIds: number[][],
    callCallback: ContractCallCallback,
    resultCallback: ContractResultCallback,
    errorCallback: ContractErrorCallback
  ): Promise<void> {
    const txnData = { from: this._protocol.account };
    await this._protocol.NFTMasterChefBatchContract.methods
      .harvestAllByWNFTTokenIds(forUser, pids, poolWNFTTokenIds)
      .send(txnData)
      .on("transactionHash", (txHash: string) => {
        callCallback(txHash);
      })
      .then((res: {}) => {
        resultCallback(res);
      })
      .catch((error: Error) => {
        errorCallback(
          new Error(
            `Failed to harvestAllByWNFTTokenIds transaction: "${error instanceof Error && error.message ? error.message : "user denied"
            }..."`
          )
        );
      });
    // let txHash;
    // try {
    //   const txnData = { from: this._protocol.account };
    //   txHash = await this._protocol.NFTMasterChefBatchContract.methods
    //     .harvestAllByWNFTTokenIds(forUser, pids, poolWNFTTokenIds)
    //     .send(txnData);
    // } catch (error) {
    //   console.error(error);
    //   throw new Error(
    //     `Failed to harvestAllByWNFTTokenIds transaction: "${error instanceof Error && error.message ? error.message : "user denied"
    //     }..."`
    //   );
    // }
    // return txHash;
  }

  public async ownedNFTsTokenIdsByPids({
    pids,
    user
  }: {
    pids: number[];
    user: string;
  }): Promise<[][]> {
    const _ownedTokenIds = await this._protocol.NFTMasterChefBatchContract.methods
      .ownedNFTsTokenIdsByPids(pids, user)
      .call();
    console.log("ownedNFTsTokenIdsByPids:::", _ownedTokenIds);
    return _ownedTokenIds;
  }

  public async ownedWNFTsTokenIdsByPids({
    pids,
    user
  }: {
    pids: number[];
    user: string;
  }): Promise<[][]> {
    const _ownedTokenIds = await this._protocol.NFTMasterChefBatchContract.methods
      .ownedWNFTsTokenIdsByPids(pids, user)
      .call();
    console.log("ownedWNFTsTokenIdsByPids:::", _ownedTokenIds);
    return _ownedTokenIds;
  }

  public async ownedNFTsTokenIdsByNFTs({
    nfts,
    user
  }: {
    nfts: string[];
    user: string;
  }): Promise<[][]> {
    const _ownedTokenIds = await this._protocol.NFTMasterChefBatchContract.methods
      .ownedNFTsTokenIdsByNFTs(nfts, user)
      .call();
    console.log("ownedNFTsTokenIdsByNFTs:::", _ownedTokenIds);
    return _ownedTokenIds;
  }

  public async ownedNFTTokenIds({ nft, user }: { nft: string; user: string }): Promise<[]> {
    const _ownedTokenIds = await this._protocol.NFTMasterChefBatchContract.methods
      .ownedNFTTokenIds(nft, user)
      .call();
    console.log("ownedNFTTokenIds:::", _ownedTokenIds);
    return _ownedTokenIds;
  }

  public async getPoolInfosUserCanDeposit({
    user,
    withOwnedNFTTokenIds
  }: {
    user: string;
    withOwnedNFTTokenIds: boolean;
  }): Promise<{}> {
    const _wrappedPoolInfos = await this._protocol.NFTMasterChefBatchContract.methods
      .getPoolInfosUserCanDeposit(user, withOwnedNFTTokenIds)
      .call();
    console.log("getPoolInfosUserCanDeposit:::", _wrappedPoolInfos);
    return _wrappedPoolInfos;
  }

  public async getPoolInfosUserDeposited({
    user,
    withOwnedNFTTokenIds
  }: {
    user: string;
    withOwnedNFTTokenIds: boolean;
  }): Promise<{}> {
    const _wrappedPoolInfos = await this._protocol.NFTMasterChefBatchContract.methods
      .getPoolInfosUserDeposited(user, withOwnedNFTTokenIds)
      .call();
    console.log("getPoolInfosUserDeposited:::", _wrappedPoolInfos);
    return _wrappedPoolInfos;
  }
}
