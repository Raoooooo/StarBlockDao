"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NULL_ADDRESS = exports.constants = void 0;
var deployed_1 = require("./deployed");
var NFTMasterChef_1 = require("./abi/NFTMasterChef");
var NFTUtils_1 = require("./abi/NFTUtils");
var REC721_1 = require("./abi/REC721");
var IWrappedNFT_1 = require("./abi/IWrappedNFT");
var MerkletRootDistributor_1 = require("./abi/MerkletRootDistributor");
var NFTMasterChefBatch_1 = require("./abi/NFTMasterChefBatch");
var StarBlockCollection_1 = require("./abi/StarBlockCollection");
var StarBlockCollectionByteCode_json_1 = __importDefault(require("./abi/StarBlockCollectionByteCode.json"));
var StarBlockCollectionUtils_1 = require("./abi/StarBlockCollectionUtils");
exports.constants = {
    DEPLOYED: deployed_1.deployed,
    NFTMASTERCHEF_ABI: NFTMasterChef_1.NFTMasterChef,
    NFTUtils_ABI: NFTUtils_1.NFTUtils,
    REC721_ABI: REC721_1.REC721,
    IWrappedNFT_ABI: IWrappedNFT_1.IWrappedNFT,
    MerkletRootDistributor_ABI: MerkletRootDistributor_1.MerkletRootDistributor,
    NFTMASTERCHEFBATCH_ABI: NFTMasterChefBatch_1.NFTMasterChefBatch,
    STARBLOCKCOLLECTION_ABI: StarBlockCollection_1.StarBlockCollectionAbi,
    STARBLOCKCOLLECTION_BYTECODE: "0x" + StarBlockCollectionByteCode_json_1.default.object,
    STARBLOCKCOLLECTIONUTILS_ABI: StarBlockCollectionUtils_1.StarBlockCollectionUtilsAbi
};
exports.NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
