import { deployed } from "./deployed";
import { NFTMasterChef } from "./abi/NFTMasterChef";
import { NFTUtils } from "./abi/NFTUtils";
import { REC721 } from "./abi/REC721";
import { IWrappedNFT } from "./abi/IWrappedNFT";

export const constants = {
  DEPLOYED: deployed,
  NFTMASTERCHEF_ABI: NFTMasterChef,
  NFTUtils_ABI: NFTUtils,
  REC721_ABI: REC721,
  IWrappedNFT_ABI: IWrappedNFT
};
