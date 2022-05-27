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
exports.DaoPort = void 0;
var protocol_1 = require("./protocol");
var DaoPort = /** @class */ (function () {
    function DaoPort(provider, networkName) {
        this.account = "";
        this._protocol = new protocol_1.Protocol(provider, networkName);
        this._protocol.account = this.account;
    }
    DaoPort.prototype.deposit = function (pid, tokenIds, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._protocol.deposit(pid, tokenIds)];
                    case 1:
                        txHash = _a.sent();
                        handle(txHash, "");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        handle("", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DaoPort.prototype.withdraw = function (pid, tokenIds, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._protocol.withdraw(pid, tokenIds)];
                    case 1:
                        txHash = _a.sent();
                        handle(txHash, "");
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        handle("", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DaoPort.prototype.isApprovedForAll = function (_a) {
        var owner = _a.owner, operator = _a.operator, wnftContract = _a.wnftContract, isApproveNFT = _a.isApproveNFT;
        return __awaiter(this, void 0, void 0, function () {
            var REC721Address, isApproved, WNFTContract, nftAddress, REC721Contract;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        REC721Address = wnftContract;
                        isApproved = false;
                        if (!isApproveNFT) return [3 /*break*/, 2];
                        WNFTContract = this._protocol.setIWrappedNFTAddress(wnftContract);
                        return [4 /*yield*/, WNFTContract.methods.nft().call()];
                    case 1:
                        nftAddress = _b.sent();
                        if (nftAddress) {
                            REC721Address = nftAddress;
                        }
                        _b.label = 2;
                    case 2:
                        REC721Contract = this._protocol.setERC721Addess(REC721Address);
                        return [4 /*yield*/, REC721Contract.methods
                                .isApprovedForAll(owner, operator)
                                .call()];
                    case 3:
                        isApproved = _b.sent();
                        return [2 /*return*/, isApproved];
                }
            });
        });
    };
    DaoPort.prototype.setApprovalForAll = function (_a) {
        var owner = _a.owner, operator = _a.operator, wnftContract = _a.wnftContract, isApproveNFT = _a.isApproveNFT;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, REC721Address, WNFTContract, nftAddress, txnData, REC721Contract, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        REC721Address = wnftContract;
                        if (!isApproveNFT) return [3 /*break*/, 2];
                        WNFTContract = this._protocol.setIWrappedNFTAddress(wnftContract);
                        return [4 /*yield*/, WNFTContract.methods.nft().call()];
                    case 1:
                        nftAddress = _b.sent();
                        if (nftAddress) {
                            REC721Address = nftAddress;
                        }
                        else {
                            throw new Error("Failed to setApprovalForAll transaction: \"".concat("user denied", "...\""));
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        txnData = { from: owner };
                        REC721Contract = this._protocol.setERC721Addess(REC721Address);
                        return [4 /*yield*/, REC721Contract.methods
                                .setApprovalForAll(operator, true)
                                .send(txnData)];
                    case 3:
                        txHash = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _b.sent();
                        throw new Error("Failed to setApprovalForAll transaction: \"".concat(error_3 instanceof Error && error_3.message ? error_3.message : "user denied", "...\""));
                    case 5: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.harvestToken = function (pid, tokenIds, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._protocol.harvestToken(pid, tokenIds)];
                    case 1:
                        txHash = _a.sent();
                        handle(txHash, "");
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        handle("", error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DaoPort.prototype.ownedWNFTTokens = function (_a) {
        var wnftContract = _a.wnftContract, owner = _a.owner, maxTokenId = _a.maxTokenId;
        return __awaiter(this, void 0, void 0, function () {
            var tokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTUtilsContract.methods
                            .ownedWNFTTokens(wnftContract, owner, maxTokenId)
                            .call()];
                    case 1:
                        tokenIds = _b.sent();
                        return [2 /*return*/, tokenIds];
                }
            });
        });
    };
    DaoPort.prototype.ownedTokens = function (_a) {
        var nftContract = _a.nftContract, owner = _a.owner, maxTokenId = _a.maxTokenId;
        return __awaiter(this, void 0, void 0, function () {
            var tokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTUtilsContract.methods
                            .ownedTokens(nftContract, owner, maxTokenId)
                            .call()];
                    case 1:
                        tokenIds = _b.sent();
                        return [2 /*return*/, tokenIds];
                }
            });
        });
    };
    DaoPort.prototype.pending = function (_a, handle) {
        var pid = _a.pid, tokenIds = _a.tokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _b, mining, dividend, result, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                                .pending(pid, tokenIds)
                                .call()];
                    case 1:
                        _b = _c.sent(), mining = _b.mining, dividend = _b.dividend;
                        result = [mining, dividend];
                        handle(null, result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _c.sent();
                        handle(new Error("Failed to pending transaction: \"".concat(error_5 instanceof Error && error_5.message ? error_5.message : "user denied", "...\"")), null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DaoPort.prototype.getNFTMasterChefInfos = function (_a) {
        var nftMasterchef = _a.nftMasterchef, pid = _a.pid, owner = _a.owner, maxTokenId = _a.maxTokenId;
        return __awaiter(this, void 0, void 0, function () {
            var _b, poolInfo, mining, dividend, nftQuantity, wnftQuantity;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._protocol
                            .NFTUtilsContract.methods
                            .getNFTMasterChefInfos(nftMasterchef, pid, owner, maxTokenId)
                            .call()];
                    case 1:
                        _b = _c.sent(), poolInfo = _b.poolInfo, mining = _b.mining, dividend = _b.dividend, nftQuantity = _b.nftQuantity, wnftQuantity = _b.wnftQuantity;
                        console.log("chefInfo---", poolInfo["rewardPerNFTForEachBlock"], mining, dividend, nftQuantity, wnftQuantity);
                        return [2 /*return*/, {
                                poolInfo: poolInfo,
                                mining: mining,
                                dividend: dividend,
                                nftQuantity: nftQuantity,
                                wnftQuantity: wnftQuantity
                            }];
                }
            });
        });
    };
    return DaoPort;
}());
exports.DaoPort = DaoPort;
