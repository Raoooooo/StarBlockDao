"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionPort = void 0;
var protocol_1 = require("./protocol");
var protocolConstants_1 = require("./protocolConstants");
var CollectionPort = /** @class */ (function () {
    function CollectionPort(provider, chainId) {
        this._protocol = new protocol_1.Protocol(provider, chainId);
    }
    CollectionPort.prototype.setAccount = function (account) {
        this._protocol.account = account;
    };
    CollectionPort.prototype.setStarblockCollectionAddress = function (contractAddress) {
        this._protocol.setStarblockCollectionAddress(contractAddress);
    };
    CollectionPort.prototype.getStarBlockByteCodeAbi = function () {
        var byteCode = protocolConstants_1.constants.STARBLOCKCOLLECTION_BYTECODE;
        var abi = protocolConstants_1.constants.STARBLOCKCOLLECTION_ABI;
        return {
            byteCode: byteCode,
            abi: abi
        };
    };
    CollectionPort.prototype.setOnlyReadWeb3Provider = function (provider) {
        this._protocol.onlyReadNFTUtilsContract(provider);
    };
    CollectionPort.prototype.publicSaleConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var publicSaleConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._protocol.StarblockCollectionContract.methods
                            .publicSaleConfig()
                            .call()];
                    case 1:
                        publicSaleConfig = _a.sent();
                        console.log("publicSaleConfig:::", publicSaleConfig);
                        return [2 /*return*/, publicSaleConfig];
                }
            });
        });
    };
    CollectionPort.prototype.getInfo = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _maxSupply, _totalSupply, _userCanMintAmount, _whitelistSaleConfig, _whitelistSaleStatus, _whitelistAmount, _publicSaleConfig, _publicSaleStatus, _inWhitelist, _whitelistSaleuserCanMintAmount, _publicSaleuserCanMintAmount, info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.StarblockCollectionContract.methods.getInfo(user).call()];
                    case 1:
                        _a = _b.sent(), _maxSupply = _a._maxSupply, _totalSupply = _a._totalSupply, _userCanMintAmount = _a._userCanMintAmount, _whitelistSaleConfig = _a._whitelistSaleConfig, _whitelistSaleStatus = _a._whitelistSaleStatus, _whitelistAmount = _a._whitelistAmount, _publicSaleConfig = _a._publicSaleConfig, _publicSaleStatus = _a._publicSaleStatus, _inWhitelist = _a._inWhitelist, _whitelistSaleuserCanMintAmount = _a._whitelistSaleuserCanMintAmount, _publicSaleuserCanMintAmount = _a._publicSaleuserCanMintAmount;
                        info = {
                            _maxSupply: _maxSupply,
                            _totalSupply: _totalSupply,
                            _userCanMintAmount: _userCanMintAmount,
                            _whitelistSaleConfig: _whitelistSaleConfig,
                            _whitelistSaleStatus: _whitelistSaleStatus,
                            _whitelistAmount: _whitelistAmount,
                            _publicSaleConfig: _publicSaleConfig,
                            _publicSaleStatus: _publicSaleStatus,
                            _inWhitelist: _inWhitelist,
                            _whitelistSaleuserCanMintAmount: _whitelistSaleuserCanMintAmount,
                            _publicSaleuserCanMintAmount: _publicSaleuserCanMintAmount
                        };
                        console.log("getInfo:::", info);
                        return [2 /*return*/, info];
                }
            });
        });
    };
    CollectionPort.prototype.userCanMint = function (user, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _whitelistSaleCanMint, _whitelistSaleMessage, _publicSaleCanMint, _publicSaleMessage, info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.StarblockCollectionContract.methods.userCanMint(user, amount).call()];
                    case 1:
                        _a = _b.sent(), _whitelistSaleCanMint = _a._whitelistSaleCanMint, _whitelistSaleMessage = _a._whitelistSaleMessage, _publicSaleCanMint = _a._publicSaleCanMint, _publicSaleMessage = _a._publicSaleMessage;
                        info = {
                            _whitelistSaleCanMint: _whitelistSaleCanMint,
                            _whitelistSaleMessage: _whitelistSaleMessage,
                            _publicSaleCanMint: _publicSaleCanMint,
                            _publicSaleMessage: _publicSaleMessage
                        };
                        console.log("userCanMint:::", info);
                        return [2 /*return*/, info];
                }
            });
        });
    };
    CollectionPort.prototype.setSaleConfig = function (whitelistSaleConfig, publicSaleConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.StarblockCollectionContract.methods
                                .setSaleConfig(whitelistSaleConfig, publicSaleConfig)
                                .send(txnData)];
                    case 1:
                        txHash = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error("Failed to setSaleConfig transaction: \"".concat(error_1 instanceof Error && error_1.message ? error_1.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    CollectionPort.prototype.addWhitelists = function (addresses) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.StarblockCollectionContract.methods
                                .addWhitelists(addresses)
                                .send(txnData)];
                    case 1:
                        txHash = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error("Failed to addWhitelists transaction: \"".concat(error_2 instanceof Error && error_2.message ? error_2.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    CollectionPort.prototype.whitelistMint = function (amount, price) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, value, txnData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        value = price.multipliedBy(amount);
                        txnData = { from: this._protocol.account, value: value };
                        return [4 /*yield*/, this._protocol.StarblockCollectionContract.methods
                                .whitelistMint(amount)
                                .send(txnData)];
                    case 1:
                        txHash = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error("Failed to whitelistMint transaction: \"".concat(error_3 instanceof Error && error_3.message ? error_3.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    CollectionPort.prototype.publicMint = function (amount, price) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, value, txnData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        value = price.multipliedBy(amount);
                        txnData = { from: this._protocol.account, value: value };
                        return [4 /*yield*/, this._protocol.StarblockCollectionContract.methods
                                .publicMint(amount)
                                .send(txnData)];
                    case 1:
                        txHash = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw new Error("Failed to publicMint transaction: \"".concat(error_4 instanceof Error && error_4.message ? error_4.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    CollectionPort.prototype.getCollectionInfo = function (starBlockCollectionAddress, user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _collectionInfo, _userInfo, info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.StarblockCollectionUtilsContract.methods
                            .getCollectionInfo(starBlockCollectionAddress, user)
                            .call()];
                    case 1:
                        _a = _b.sent(), _collectionInfo = _a._collectionInfo, _userInfo = _a._userInfo;
                        info = {
                            _collectionInfo: _collectionInfo,
                            _userInfo: _userInfo
                        };
                        console.log("getCollectionInfo:::", info);
                        return [2 /*return*/, info];
                }
            });
        });
    };
    return CollectionPort;
}());
exports.CollectionPort = CollectionPort;
