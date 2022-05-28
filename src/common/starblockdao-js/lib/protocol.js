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
exports.Protocol = void 0;
var protocolConstants_1 = require("./protocolConstants");
var Protocol = /** @class */ (function () {
    function Protocol(provider, networkName) {
        this.account = "";
        this.web3 = provider;
        this._networkName = networkName;
        this.NFTMasterChefContractAddress = protocolConstants_1.constants.DEPLOYED[networkName].NFTMasterChef;
        var NFTMasterChefAbi = protocolConstants_1.constants.NFTMASTERCHEF_ABI;
        this.NFTMasterChefContract = new this.web3.eth.Contract(NFTMasterChefAbi, this.NFTMasterChefContractAddress);
        var NFTUtilsAddress = protocolConstants_1.constants.DEPLOYED[networkName].NFTUtils;
        var NFTUtilsAbi = protocolConstants_1.constants.NFTUtils_ABI;
        this.NFTUtilsContract = new this.web3.eth.Contract(NFTUtilsAbi, NFTUtilsAddress);
    }
    Protocol.prototype.setERC721Addess = function (address) {
        return new this.web3.eth.Contract(protocolConstants_1.constants.REC721_ABI, address);
    };
    Protocol.prototype.setIWrappedNFTAddress = function (address) {
        return new this.web3.eth.Contract(protocolConstants_1.constants.IWrappedNFT_ABI, address);
    };
    Protocol.prototype.deposit = function (pid, tokenIds) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        txnData = { from: this.account };
                        return [4 /*yield*/, this.NFTMasterChefContract.methods
                                .deposit(pid, tokenIds)
                                .send(txnData)];
                    case 1:
                        txHash = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error("Failed to deposit transaction: \"".concat(error_1 instanceof Error && error_1.message ? error_1.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    Protocol.prototype.withdraw = function (pid, tokenIds) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txnData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        txnData = { from: this.account };
                        return [4 /*yield*/, this.NFTMasterChefContract.methods
                                .withdraw(pid, tokenIds)
                                .send(txnData)];
                    case 1:
                        txHash = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error("Failed to withdraw transaction: \"".concat(error_2 instanceof Error && error_2.message ? error_2.message : "user denied", "...\""));
                    case 3: return [2 /*return*/, txHash];
                }
            });
        });
    };
    Protocol.prototype.harvestToken = function (pid, tokenIds) {
        return __awaiter(this, void 0, void 0, function () {
            var account, txHash, txnData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account = this.web3.eth.defaultAccount;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        txnData = { from: account };
                        return [4 /*yield*/, this.NFTMasterChefContract.methods
                                .harvestToken(pid, tokenIds)
                                .send(txnData)];
                    case 2:
                        txHash = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error("Failed to harvestToken transaction: \"".concat(error_3 instanceof Error && error_3.message ? error_3.message : "user denied", "...\""));
                    case 4: return [2 /*return*/, txHash];
                }
            });
        });
    };
    Protocol.prototype.pending = function (pid, tokenIds) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, mining, dividend;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.NFTMasterChefContract.methods
                            .pending(pid, tokenIds)
                            .call()];
                    case 1:
                        _a = _b.sent(), mining = _a.mining, dividend = _a.dividend;
                        return [2 /*return*/, { mining: mining, dividend: dividend }];
                }
            });
        });
    };
    return Protocol;
}());
exports.Protocol = Protocol;
