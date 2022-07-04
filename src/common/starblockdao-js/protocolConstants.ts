import { deployed } from "./deployed";
import { NFTMasterChef } from "./abi/NFTMasterChef";
import { NFTUtils } from "./abi/NFTUtils";
import { REC721 } from "./abi/REC721";
import { IWrappedNFT } from "./abi/IWrappedNFT";
import { MerkletRootDistributor } from "./abi/MerkletRootDistributor";
import { NFTMasterChefBatch } from "./abi/NFTMasterChefBatch";
import { StarBlockCollectionAbi } from "./abi/StarBlockCollection";
import StarBlockCollectionByteCode from "./abi/StarBlockCollectionByteCode.json";
import { StarBlockCollectionUtilsAbi } from "./abi/StarBlockCollectionUtils";

export const constants = {
  DEPLOYED: deployed,
  NFTMASTERCHEF_ABI: NFTMasterChef,
  NFTUtils_ABI: NFTUtils,
  REC721_ABI: REC721,
  IWrappedNFT_ABI: IWrappedNFT,
  MerkletRootDistributor_ABI: MerkletRootDistributor,
  NFTMASTERCHEFBATCH_ABI: NFTMasterChefBatch,
  STARBLOCKCOLLECTION_ABI: StarBlockCollectionAbi,
  STARBLOCKCOLLECTION_BYTECODE: "0x" + StarBlockCollectionByteCode.object,
  STARBLOCKCOLLECTIONUTILS_ABI: StarBlockCollectionUtilsAbi
};
