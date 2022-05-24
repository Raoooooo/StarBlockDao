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
    DaoPort.prototype.harvestToken = function (pid, tokenIds, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, error_3;
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
                        error_3 = _a.sent();
                        handle("", error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DaoPort.prototype.pendingToken = function (pid, tokenIds, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var isPendingToken, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._protocol.pendingToken(pid, tokenIds)];
                    case 1:
                        isPendingToken = _a.sent();
                        handle(isPendingToken, "");
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        handle("", false);
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
    DaoPort.prototype.getNFTMasterChefInfo = function (pid) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, chefInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._protocol.NFTMasterChefContract.methods
                            .poolInfos(pid)
                            .call()];
                    case 1:
                        _a = (_b.sent()).chefInfo, chefInfo = _a === void 0 ? [] : _a;
                        console.log("chefInfo---", chefInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    return DaoPort;
}());
exports.DaoPort = DaoPort;
