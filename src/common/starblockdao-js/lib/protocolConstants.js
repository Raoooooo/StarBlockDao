"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
var deployed_1 = require("./deployed");
var NFTMasterChef_1 = require("./abi/NFTMasterChef");
var NFTUtils_1 = require("./abi/NFTUtils");
exports.constants = {
    DEPLOYED: deployed_1.deployed,
    NFTMASTERCHEF_ABI: NFTMasterChef_1.NFTMasterChef,
    NFTUtils_ABI: NFTUtils_1.NFTUtils
};
