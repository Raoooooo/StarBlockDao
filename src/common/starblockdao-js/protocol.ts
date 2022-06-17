import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Network, PartialReadonlyContractAbi } from "./types";
import { constants } from "./protocolConstants";

export class Protocol {
  public account = "";
  public NFTMasterChefContractAddress: string;
  public NFTMasterChefContract: Contract;
  public NFTUtilsContract: Contract;
  public web3: Web3;
  private NFTUtilsAddress: string;
  private NFTUtilsAbi: PartialReadonlyContractAbi;
  public MerkletRootDistributorContractAddress: string;
  public MerkletRootDistributorContract: Contract;
  private _networkName = Network.Main;

  constructor(provider: Web3, chainId: number) {
    this.web3 = provider;

    if (chainId === 1) {
      this._networkName = Network.Main;
    } else if (chainId === 4) {
      this._networkName = Network.Rinkeby;
    }

    this.NFTMasterChefContractAddress = constants.DEPLOYED[this._networkName].NFTMasterChef;
    const NFTMasterChefAbi: PartialReadonlyContractAbi = constants.NFTMASTERCHEF_ABI;

    this.NFTMasterChefContract = new this.web3.eth.Contract(
      NFTMasterChefAbi,
      this.NFTMasterChefContractAddress
    );

    this.NFTUtilsAddress = constants.DEPLOYED[this._networkName].NFTUtils;
    this.NFTUtilsAbi = constants.NFTUtils_ABI;

    this.NFTUtilsContract = new this.web3.eth.Contract(this.NFTUtilsAbi, this.NFTUtilsAddress);

    this.MerkletRootDistributorContractAddress =
      constants.DEPLOYED[this._networkName].MerkletRootDistributor;
    const MerkletRootDistributorAbi: PartialReadonlyContractAbi =
      constants.MerkletRootDistributor_ABI;
    this.MerkletRootDistributorContract = new this.web3.eth.Contract(
      MerkletRootDistributorAbi,
      this.MerkletRootDistributorContractAddress
    );
  }

  public setERC721Addess(address: string): Contract {
    return new this.web3.eth.Contract(constants.REC721_ABI, address);
  }

  public setIWrappedNFTAddress(address: string): Contract {
    return new this.web3.eth.Contract(constants.IWrappedNFT_ABI, address);
  }

  public onlyReadNFTUtilsContract(provider: Web3) {
    this.NFTUtilsContract = new provider.eth.Contract(this.NFTUtilsAbi, this.NFTUtilsAddress);
  }

  public async deposit(pid: number, tokenIds: number[]): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this.account };
      txHash = await this.NFTMasterChefContract.methods.deposit(pid, tokenIds).send(txnData);
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
      txHash = await this.NFTMasterChefContract.methods.withdraw(pid, tokenIds).send(txnData);
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
      txHash = await this.NFTMasterChefContract.methods.harvestToken(pid, tokenIds).send(txnData);
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
