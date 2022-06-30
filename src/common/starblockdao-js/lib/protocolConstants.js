"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
var deployed_1 = require("./deployed");
var NFTMasterChef_1 = require("./abi/NFTMasterChef");
var NFTUtils_1 = require("./abi/NFTUtils");
var REC721_1 = require("./abi/REC721");
var IWrappedNFT_1 = require("./abi/IWrappedNFT");
var MerkletRootDistributor_1 = require("./abi/MerkletRootDistributor");
var NFTMasterChefBatch_1 = require("./abi/NFTMasterChefBatch");
exports.constants = {
    DEPLOYED: deployed_1.deployed,
    NFTMASTERCHEF_ABI: NFTMasterChef_1.NFTMasterChef,
    NFTUtils_ABI: NFTUtils_1.NFTUtils,
    REC721_ABI: REC721_1.REC721,
    IWrappedNFT_ABI: IWrappedNFT_1.IWrappedNFT,
    MerkletRootDistributor_ABI: MerkletRootDistributor_1.MerkletRootDistributor,
    NFTMASTERCHEFBATCH_ABI: NFTMasterChefBatch_1.NFTMasterChefBatch
};
