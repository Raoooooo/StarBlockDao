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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
    function DaoPort(provider, chainId) {
        this._protocol = new protocol_1.Protocol(provider, chainId);
    }
    DaoPort.prototype.setAccount = function (account) {
        this._protocol.account = account;
    };
    DaoPort.prototype.setOnlyReadWeb3Provider = function (provider) {
        this._protocol.onlyReadNFTUtilsContract(provider);
    };
    DaoPort.prototype.deposit = function (pid, tokenIds, callCallback, resultCallback, errorCallback) {
        // var pid = _a.pid, tokenIds = _a.tokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                            .deposit(pid, tokenIds)
                            .send(txnData)
                            .on("transactionHash", function (txHash) {
                                callCallback(txHash);
                            })
                            .then(function (res) {
                                resultCallback(res);
                            })
                            .catch(function (error) {
                                errorCallback(new Error("Failed to deposit transaction: \"".concat(error instanceof Error && error.message ? error.message : "user denied", "...\"")));
                            })];
                    // return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                    //     .deposit(pid, tokenIds)
                    //     .send(txnData)];
                    case 1:
                        txHash = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        throw new Error("Failed to deposit transaction: \"".concat(error_1 instanceof Error && error_1.message ? error_1.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.withdraw = function (pid, tokenIds, callCallback, resultCallback, errorCallback) {
        // var pid = _a.pid, tokenIds = _a.tokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // _b.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                            .withdraw(pid, tokenIds)
                            .send(txnData)
                            .on("transactionHash", function (txHash) {
                                callCallback(txHash);
                            })
                            .then(function (res) {
                                resultCallback(res);
                            })
                            .catch(function (error) {
                                errorCallback(new Error("Failed to withdraw transaction: \"".concat(error instanceof Error && error.message ? error.message : "user denied", "...\"")));
                            })];
                    case 1:
                        txHash = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.error(error_2);
                        throw new Error("Failed to withdraw transaction: \"".concat(error_2 instanceof Error && error_2.message ? error_2.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.setApprovalForAll = function (owner, nftContract, wnftContract, isApproveNFT, callCallback, resultCallback, errorCallback) {
        // var owner = _a.owner, nftContract = _a.nftContract, wnftContract = _a.wnftContract, isApproveNFT = _a.isApproveNFT;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, REC721Address, operator, txnData, REC721Contract, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        REC721Address = wnftContract;
                        if (isApproveNFT) {
                            REC721Address = nftContract;
                        }
                        operator = isApproveNFT ? wnftContract : this._protocol.NFTMasterChefContractAddress;
                        _b.label = 1;
                    case 1:
                        // _b.trys.push([1, 3, , 4]);
                        txnData = { from: owner };
                        REC721Contract = this._protocol.setERC721Addess(REC721Address);
                        return [4 /*yield*/, REC721Contract.methods.setApprovalForAll(operator, true).send(txnData)
                            .on("transactionHash", function (txHash) {
                                callCallback(txHash);
                            })
                            .then(function (res) {
                                resultCallback(res);
                            })
                            .catch(function (error) {
                                errorCallback(new Error("Failed to setApprovalForAll transaction: \"".concat(error instanceof Error && error.message ? error.message : "user denied", "...\"")));
                            })];
                    // return [4 /*yield*/, REC721Contract.methods.setApprovalForAll(operator, true).send(txnData)];
                    case 2:
                        txHash = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        throw new Error("Failed to setApprovalForAll transaction: \"".concat(error_3 instanceof Error && error_3.message ? error_3.message : "user denied", "...\""));
                    case 4: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.harvest = function (pid, to, wnftTokenIds, callCallback, resultCallback, errorCallback) {
        // var pid = _a.pid, to = _a.to, wnftTokenIds = _a.wnftTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // _b.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                            .harvest(pid, to, wnftTokenIds)
                            .send(txnData)
                            .on("transactionHash", function (txHash) {
                                callCallback(txHash);
                            })
                            .then(function (res) {
                                resultCallback(res);
                            })
                            .catch(function (error) {
                                errorCallback(new Error("Failed to harvest transaction: \"".concat(error instanceof Error && error.message ? error.message : "user denied", "...\"")));
                            })];
                    // return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                    //     .harvest(pid, to, wnftTokenIds)
                    //     .send(txnData)];
                    case 1:
                        txHash = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error(error_4);
                        throw new Error("Failed to harvest transaction: \"".concat(error_4 instanceof Error && error_4.message ? error_4.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
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
    DaoPort.prototype.ownedNFTTokens = function (_a) {
        var contractAddress = _a.contractAddress, owner = _a.owner, rangeTokenIds = _a.rangeTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var tokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (rangeTokenIds.length != 2) {
                            throw new Error("beyend token range...\"");
                        }
                        return [4 /*yield*/, this._protocol.NFTUtilsContract.methods
                            .ownedNFTTokens(contractAddress, owner, rangeTokenIds[0], rangeTokenIds[1])
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
            var _b, _mining, _dividend, result, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                            .pending(pid, tokenIds)
                            .call()];
                    case 1:
                        _b = _c.sent(), _mining = _b._mining, _dividend = _b._dividend;
                        result = [_mining, _dividend];
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
    DaoPort.prototype.getNFTMasterChefInfos = function (_a) {
        var nftMasterchef = _a.nftMasterchef, pid = _a.pid, owner = _a.owner, rangeTokenIds = _a.rangeTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _poolInfo, _rewardInfo, _userInfo, _currentRewardIndex, _endBlock, _nft, rewardForEachBlock, rewardPerNFTForEachBlock, mining, dividend, nftQuantity, wnftQuantity, isNFTApproved, isWNFTApproved, poolInfo, endBlock, nft;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (rangeTokenIds.length != 2) {
                            throw new Error(" beyend token range...\"");
                        }
                        nftMasterchef = this._protocol.NFTMasterChefContractAddress;
                        return [4 /*yield*/, this._protocol.NFTUtilsContract.methods
                            .getNFTMasterChefInfos(nftMasterchef, pid, owner, rangeTokenIds[0], rangeTokenIds[1])
                            .call()];
                    case 1:
                        _b = _c.sent(), _poolInfo = _b._poolInfo, _rewardInfo = _b._rewardInfo, _userInfo = _b._userInfo, _currentRewardIndex = _b._currentRewardIndex, _endBlock = _b._endBlock, _nft = _b._nft;
                        rewardForEachBlock = _rewardInfo["rewardForEachBlock"];
                        rewardPerNFTForEachBlock = _rewardInfo["rewardPerNFTForEachBlock"];
                        mining = _userInfo["mining"];
                        dividend = _userInfo["dividend"];
                        nftQuantity = _userInfo["nftQuantity"];
                        wnftQuantity = _userInfo["wnftQuantity"];
                        isNFTApproved = _userInfo["isNFTApproved"];
                        isWNFTApproved = _userInfo["isWNFTApproved"];
                        poolInfo = _poolInfo;
                        endBlock = _endBlock;
                        nft = _nft;
                        return [2 /*return*/, {
                            poolInfo: poolInfo,
                            rewardForEachBlock: rewardForEachBlock,
                            rewardPerNFTForEachBlock: rewardPerNFTForEachBlock,
                            endBlock: endBlock,
                            mining: mining,
                            dividend: dividend,
                            nftQuantity: nftQuantity,
                            wnftQuantity: wnftQuantity,
                            isNFTApproved: isNFTApproved,
                            isWNFTApproved: isWNFTApproved,
                            nft: nft
                        }];
                }
            });
        });
    };
    DaoPort.prototype.canClaim = function (_a, handle) {
        var user = _a.user, treeIds = _a.treeIds, amounts = _a.amounts, merkleProofs = _a.merkleProofs;
        return __awaiter(this, void 0, void 0, function () {
            var array, result, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._protocol.MerkletRootDistributorContract.methods
                            .canClaim(user, treeIds, amounts, merkleProofs)
                            .call()];
                    case 1:
                        array = _b.sent();
                        result = [array[0], array[1]];
                        handle(null, result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        handle(new Error("Failed to canClaim transaction: \"".concat(error_6 instanceof Error && error_6.message ? error_6.message : "user denied", "...\"")), null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DaoPort.prototype.updateTradingRewards = function (_a) {
        var treeIds = _a.treeIds, merkleRoots = _a.merkleRoots, maxAmountsPerUser = _a.maxAmountsPerUser, merkleProofsSafeGuards = _a.merkleProofsSafeGuards;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.MerkletRootDistributorContract.methods
                            .updateTradingRewards(treeIds, merkleRoots, maxAmountsPerUser, merkleProofsSafeGuards)
                            .send(txnData)];
                    case 1:
                        txHash = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        console.error(error_7);
                        throw new Error("Failed to updateTradingRewards transaction: \"".concat(error_7 instanceof Error && error_7.message ? error_7.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.claim = function (_a) {
        var treeIds = _a.treeIds, amounts = _a.amounts, merkleProofs = _a.merkleProofs;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.MerkletRootDistributorContract.methods
                            .claim(treeIds, amounts, merkleProofs)
                            .send(txnData)];
                    case 1:
                        txHash = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _b.sent();
                        console.error(error_8);
                        throw new Error("Failed to claim transaction: \"".concat(error_8 instanceof Error && error_8.message ? error_8.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.getTokenPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .getTokenPrice()
                        .call()];
                    case 1:
                        tokenPrice = _a.sent();
                        return [2 /*return*/, tokenPrice];
                }
            });
        });
    };
    DaoPort.prototype.getPoolInfo = function (_a) {
        var pid = _a.pid, user = _a.user, withOwnedNFTTokenIds = _a.withOwnedNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _wrappedPoolInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .getPoolInfo(pid, user, withOwnedNFTTokenIds)
                        .call()];
                    case 1:
                        _wrappedPoolInfo = _b.sent();
                        console.log("getPoolInfo _wrappedPoolInfo:::", _wrappedPoolInfo);
                        return [2 /*return*/, _wrappedPoolInfo];
                }
            });
        });
    };
    DaoPort.prototype.getAllPoolInfos = function (_a) {
        var fromPid = _a.fromPid, toPid = _a.toPid, user = _a.user, withOwnedNFTTokenIds = _a.withOwnedNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _wrappedPoolInfos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .getAllPoolInfos(fromPid, toPid, user, withOwnedNFTTokenIds)
                        .call()];
                    case 1:
                        _wrappedPoolInfos = _b.sent();
                        console.log("getPoolInfo _wrappedPoolInfos:::", _wrappedPoolInfos);
                        return [2 /*return*/, _wrappedPoolInfos];
                }
            });
        });
    };
    DaoPort.prototype.getPoolInfosByNFTorWNFTs = function (_a) {
        var poolNFTorWNFTs = _a.poolNFTorWNFTs, user = _a.user, withOwnedNFTTokenIds = _a.withOwnedNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _wrappedPoolInfos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .getPoolInfosByNFTorWNFTs(poolNFTorWNFTs, user, withOwnedNFTTokenIds)
                        .call()];
                    case 1:
                        _wrappedPoolInfos = _b.sent();
                        console.log("getPoolInfo _wrappedPoolInfos:::", _wrappedPoolInfos);
                        return [2 /*return*/, _wrappedPoolInfos];
                }
            });
        });
    };
    DaoPort.prototype.pendingAll = function (forUser) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, _userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .pendingAll(forUser)
                        .call()];
                    case 1:
                        _userInfo = _a.sent();
                        return [2 /*return*/, _userInfo];
                }
            });
        });
    };
    DaoPort.prototype.harvestAll = function (forUser) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                            .harvestAll(forUser)
                            .send(txnData)];
                    case 1:
                        txHash = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.error(error_9);
                        throw new Error("Failed to harvestAll transaction: \"".concat(error_9 instanceof Error && error_9.message ? error_9.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.pendingByNFTorWNFT = function (_a) {
        var poolNFTorWNFT = _a.poolNFTorWNFT, poolWNFTTokenIds = _a.poolWNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _poolExists, _pid, _mining, _dividend;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .pendingByNFTorWNFT(poolNFTorWNFT, poolWNFTTokenIds)
                        .call()];
                    case 1:
                        _b = _c.sent(), _poolExists = _b._poolExists, _pid = _b._pid, _mining = _b._mining, _dividend = _b._dividend;
                        console.log("pendingByNFTorWNFT:::", _poolExists, _pid, _mining, _dividend);
                        return [2 /*return*/, { _poolExists: _poolExists, _pid: _pid, _mining: _mining, _dividend: _dividend }];
                }
            });
        });
    };
    DaoPort.prototype.pendingAllByWNFTTokenIds = function (_a) {
        var pids = _a.pids, poolWNFTTokenIds = _a.poolWNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _mining, _dividend;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .pendingAllByWNFTTokenIds(pids, poolWNFTTokenIds)
                        .call()];
                    case 1:
                        _b = _c.sent(), _mining = _b._mining, _dividend = _b._dividend;
                        console.log("pendingAllByWNFTTokenIds:::", _mining, _dividend);
                        return [2 /*return*/, { _mining: _mining, _dividend: _dividend }];
                }
            });
        });
    };
    DaoPort.prototype.harvestAllByWNFTTokenIds = function (_a) {
        var forUser = _a.forUser, pids = _a.pids, poolWNFTTokenIds = _a.poolWNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        txnData = { from: this._protocol.account };
                        return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                            .harvestAllByWNFTTokenIds(forUser, pids, poolWNFTTokenIds)
                            .send(txnData)];
                    case 1:
                        txHash = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _b.sent();
                        console.error(error_10);
                        throw new Error("Failed to harvestAllByWNFTTokenIds transaction: \"".concat(error_10 instanceof Error && error_10.message ? error_10.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    DaoPort.prototype.ownedNFTsTokenIdsByPids = function (_a) {
        var pids = _a.pids, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var _ownedTokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .ownedNFTsTokenIdsByPids(pids, user)
                        .call()];
                    case 1:
                        _ownedTokenIds = _b.sent();
                        console.log("ownedNFTsTokenIdsByPids:::", _ownedTokenIds);
                        return [2 /*return*/, _ownedTokenIds];
                }
            });
        });
    };
    DaoPort.prototype.ownedWNFTsTokenIdsByPids = function (_a) {
        var pids = _a.pids, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var _ownedTokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .ownedWNFTsTokenIdsByPids(pids, user)
                        .call()];
                    case 1:
                        _ownedTokenIds = _b.sent();
                        console.log("ownedWNFTsTokenIdsByPids:::", _ownedTokenIds);
                        return [2 /*return*/, _ownedTokenIds];
                }
            });
        });
    };
    DaoPort.prototype.ownedNFTsTokenIdsByNFTs = function (_a) {
        var nfts = _a.nfts, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var _ownedTokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .ownedNFTsTokenIdsByNFTs(nfts, user)
                        .call()];
                    case 1:
                        _ownedTokenIds = _b.sent();
                        console.log("ownedNFTsTokenIdsByNFTs:::", _ownedTokenIds);
                        return [2 /*return*/, _ownedTokenIds];
                }
            });
        });
    };
    DaoPort.prototype.ownedNFTTokenIds = function (_a) {
        var nft = _a.nft, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var _ownedTokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .ownedNFTTokenIds(nft, user)
                        .call()];
                    case 1:
                        _ownedTokenIds = _b.sent();
                        console.log("ownedNFTTokenIds:::", _ownedTokenIds);
                        return [2 /*return*/, _ownedTokenIds];
                }
            });
        });
    };
    DaoPort.prototype.getPoolInfosUserCanDeposit = function (_a) {
        var user = _a.user, withOwnedNFTTokenIds = _a.withOwnedNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _wrappedPoolInfos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .getPoolInfosUserCanDeposit(user, withOwnedNFTTokenIds)
                        .call()];
                    case 1:
                        _wrappedPoolInfos = _b.sent();
                        console.log("getPoolInfosUserCanDeposit:::", _wrappedPoolInfos);
                        return [2 /*return*/, _wrappedPoolInfos];
                }
            });
        });
    };
    DaoPort.prototype.getPoolInfosUserDeposited = function (_a) {
        var user = _a.user, withOwnedNFTTokenIds = _a.withOwnedNFTTokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var _wrappedPoolInfos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefBatchContract.methods
                        .getPoolInfosUserDeposited(user, withOwnedNFTTokenIds)
                        .call()];
                    case 1:
                        _wrappedPoolInfos = _b.sent();
                        console.log("getPoolInfosUserDeposited:::", _wrappedPoolInfos);
                        return [2 /*return*/, _wrappedPoolInfos];
                }
            });
        });
    };
    return DaoPort;
}());
exports.DaoPort = DaoPort;
