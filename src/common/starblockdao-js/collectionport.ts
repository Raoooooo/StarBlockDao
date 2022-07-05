import Web3 from "web3";
import { Protocol } from "./protocol";
import { ContractCallCallback, ContractResultCallback, ContractErrorCallback } from "./types";
import BigNumber from "bignumber.js";
import { constants } from "./protocolConstants";

export class CollectionPort {
  private _protocol: Protocol;
  constructor(provider: Web3, chainId: number) {
    this._protocol = new Protocol(provider, chainId);
  }

  public setAccount(account: string) {
    this._protocol.account = account;
  }

  public setStarblockCollectionAddress(contractAddress: string) {
    this._protocol.setStarblockCollectionAddress(contractAddress);
  }

  public getStarBlockByteCodeAbi(): {} {
    const byteCode = constants.STARBLOCKCOLLECTION_BYTECODE;
    const abi = constants.STARBLOCKCOLLECTION_ABI;
    return {
      byteCode,
      abi
    };
  }

  public setOnlyReadWeb3Provider(provider: Web3) {
    this._protocol.onlyReadNFTUtilsContract(provider);
  }

  public async publicSaleConfig(): Promise<{}> {
    const publicSaleConfig = await this._protocol.StarblockCollectionContract.methods
      .publicSaleConfig()
      .call();
    console.log("publicSaleConfig:::", publicSaleConfig);
    return publicSaleConfig;
  }

  public async getInfo(user: string): Promise<{}> {
    const {
      _maxSupply,
      _totalSupply,
      _userCanMintAmount,
      _whitelistSaleConfig,
      _whitelistSaleStatus,
      _whitelistAmount,
      _publicSaleConfig,
      _publicSaleStatus,
      _inWhitelist,
      _whitelistSaleuserCanMintAmount,
      _publicSaleuserCanMintAmount
    } = await this._protocol.StarblockCollectionContract.methods.getInfo(user).call();
    const info = {
      _maxSupply,
      _totalSupply,
      _userCanMintAmount,
      _whitelistSaleConfig,
      _whitelistSaleStatus,
      _whitelistAmount,
      _publicSaleConfig,
      _publicSaleStatus,
      _inWhitelist,
      _whitelistSaleuserCanMintAmount,
      _publicSaleuserCanMintAmount
    };
    console.log("getInfo:::", info);
    return info;
  }

  public async userCanMint(user: string, amount: number): Promise<{}> {
    const {
      _whitelistSaleCanMint,
      _whitelistSaleMessage,
      _publicSaleCanMint,
      _publicSaleMessage
    } = await this._protocol.StarblockCollectionContract.methods.userCanMint(user, amount).call();
    const info = {
      _whitelistSaleCanMint,
      _whitelistSaleMessage,
      _publicSaleCanMint,
      _publicSaleMessage
    };
    console.log("userCanMint:::", info);
    return info;
  }

  public async updateWhitelistSaleConfig(whitelistSaleConfig: []): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.StarblockCollectionContract.methods
        .updateWhitelistSaleConfig(whitelistSaleConfig)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to updateWhitelistSaleConfig transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async updatePublicSaleConfig(publicSaleConfig: []): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.StarblockCollectionContract.methods
        .updatePublicSaleConfig(publicSaleConfig)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to updatePublicSaleConfig transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async addWhitelists(addresses: string[]): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await this._protocol.StarblockCollectionContract.methods
        .addWhitelists(addresses)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to addWhitelists transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async whitelistMint(
    amount: number,
    price: BigNumber,
    callCallback: ContractCallCallback,
    resultCallback: ContractResultCallback,
    errorCallback: ContractErrorCallback
  ): Promise<void> {
    // let txHash;
    // try {
    const value = price.multipliedBy(amount);
    const txnData = { from: this._protocol.account, value };

    //   txHash = await this._protocol.StarblockCollectionContract.methods
    //     .whitelistMint(amount)
    //     .send(txnData);
    // } catch (error) {
    //   console.error(error);
    //   throw new Error(
    //     `Failed to whitelistMint transaction: "${
    //       error instanceof Error && error.message ? error.message : "user denied"
    //     }..."`
    //   );
    // }
    // return txHash;

    await this._protocol.StarblockCollectionContract.methods
      .whitelistMint(amount)
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
            `Failed to whitelistMint transaction: "${
              error instanceof Error && error.message ? error.message : "user denied"
            }..."`
          )
        );
      });
  }

  public async publicMint(
    amount: number,
    price: BigNumber,
    callCallback: ContractCallCallback,
    resultCallback: ContractResultCallback,
    errorCallback: ContractErrorCallback
  ): Promise<void> {
    // let txHash;
    // try {
    const value = price.multipliedBy(amount);
    const txnData = { from: this._protocol.account, value };
    //   txHash = await this._protocol.StarblockCollectionContract.methods
    //     .publicMint(amount)
    //     .send(txnData);
    // } catch (error) {
    //   console.error(error);
    //   throw new Error(
    //     `Failed to publicMint transaction: "${
    //       error instanceof Error && error.message ? error.message : "user denied"
    //     }..."`
    //   );
    // }
    // return txHash;

    await this._protocol.StarblockCollectionContract.methods
      .publicMint(amount)
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
            `Failed to publicMint transaction: "${
              error instanceof Error && error.message ? error.message : "user denied"
            }..."`
          )
        );
      });
  }

  public async getCollectionInfo(starBlockCollectionAddress: string, user: string): Promise<{}> {
    const {
      _collectionInfo,
      _userInfo
    } = await this._protocol.StarblockCollectionUtilsContract.methods
      .getCollectionInfo(starBlockCollectionAddress, user)
      .call();
    const info = {
      _collectionInfo,
      _userInfo
    };
    console.log("getCollectionInfo:::", info);
    return info;
  }
}
