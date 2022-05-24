"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMasterChef = void 0;
exports.NFTMasterChef = [
    {
        inputs: [
            {
                internalType: "contract IWrappedNFTFactory",
                name: "_wnftFactory",
                type: "address"
            },
            {
                internalType: "contract IERC20",
                name: "_token",
                type: "address"
            },
            {
                internalType: "address payable",
                name: "_devAddress",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_addDividend",
                type: "uint256"
            }
        ],
        name: "AddDividendForPool",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract IERC721Metadata",
                name: "nftContract",
                type: "address"
            },
            {
                indexed: false,
                internalType: "contract IWrappedNFT",
                name: "wnftContract",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardForEachBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardPerNFTForEachBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "endBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "depositFee",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardDevRatio",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "rewardVeToken",
                type: "bool"
            },
            {
                indexed: false,
                internalType: "contract IERC20",
                name: "_dividendToken",
                type: "address"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withTokenTransfer",
                type: "bool"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withUpdate",
                type: "bool"
            }
        ],
        name: "AddPoolInfo",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "addTokenPerPool",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "addTokenPerBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withTokenTransfer",
                type: "bool"
            }
        ],
        name: "AddTokenRewardForPool",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "to",
                type: "address"
            }
        ],
        name: "ClosePool",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]"
            }
        ],
        name: "Deposit",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "EmergencyStop",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "wnfTokenIds",
                type: "uint256[]"
            }
        ],
        name: "EmergencyWithdraw",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "mining",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "dividend",
                type: "uint256"
            }
        ],
        name: "Harvest",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "depositFee",
                type: "uint256"
            }
        ],
        name: "SetPoolDepositFee",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "contract IERC20",
                name: "dividendToken",
                type: "address"
            }
        ],
        name: "SetPoolDividendToken",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardForEachBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardPerNFTForEachBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "endBlock",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "withUpdate",
                type: "bool"
            }
        ],
        name: "SetPoolInfo",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract VeToken",
                name: "veToken",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "lockBlockNumber",
                type: "uint256"
            }
        ],
        name: "SetVeTokenAndLockBlockNumber",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address payable",
                name: "devAddress",
                type: "address"
            }
        ],
        name: "UpdateDevAddress",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "wnfTokenIds",
                type: "uint256[]"
            }
        ],
        name: "Withdraw",
        type: "event"
    },
    {
        inputs: [],
        name: "RATIO_BASE",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_addDividend",
                type: "uint256"
            }
        ],
        name: "addDividendForPool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Metadata",
                name: "_nftContract",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_rewardForEachBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_rewardPerNFTForEachBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_startBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_endBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_depositFee",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_rewardDevRatio",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "_rewardVeToken",
                type: "bool"
            },
            {
                internalType: "contract IERC20",
                name: "_dividendToken",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withTokenTransfer",
                type: "bool"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "addPoolInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_addTokenPerPool",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_addTokenPerNFTEachBlock",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "_withTokenTransfer",
                type: "bool"
            }
        ],
        name: "addTokenRewardForPool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address payable",
                name: "_to",
                type: "address"
            }
        ],
        name: "closePool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_tokenIds",
                type: "uint256[]"
            }
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "devAddress",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_to",
                type: "address"
            }
        ],
        name: "emergencyStop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "emergencyWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_from",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_to",
                type: "uint256"
            }
        ],
        name: "getMultiplier",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "harvest",
        outputs: [
            {
                internalType: "uint256",
                name: "mining",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "dividend",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "lockBlockNumber",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_maxTokenId",
                type: "uint256"
            }
        ],
        name: "massUpdatePoolAmounts",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "massUpdatePools",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "pending",
        outputs: [
            {
                internalType: "uint256",
                name: "mining",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "dividend",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "poolInfos",
        outputs: [
            {
                internalType: "contract IWrappedNFT",
                name: "wnftContract",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "rewardForEachBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "rewardPerNFTForEachBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "startBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "endBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "lastRewardBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "accTokenPerShare",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "depositFee",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "rewardDevRatio",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "rewardVeToken",
                type: "bool"
            },
            {
                internalType: "contract IERC20",
                name: "dividendToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "accDividendPerShare",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "poolLength",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "poolNFTInfos",
        outputs: [
            {
                internalType: "bool",
                name: "deposited",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "rewardDebt",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "dividendDebt",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "_token",
                type: "address"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "safeTransferTokenFromThis",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_depositFee",
                type: "uint256"
            }
        ],
        name: "setAllPoolDepositFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_depositFee",
                type: "uint256"
            }
        ],
        name: "setPoolDepositFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "contract IERC20",
                name: "_dividendToken",
                type: "address"
            }
        ],
        name: "setPoolDividendToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_rewardForEachBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_rewardPerNFTForEachBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_startBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_endBlock",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool"
            }
        ],
        name: "setPoolInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract VeToken",
                name: "_veToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_lockBlockNumber",
                type: "uint256"
            }
        ],
        name: "setVeTokenAndLockBlockNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "token",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_devAddress",
                type: "address"
            }
        ],
        name: "updateDevAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        name: "updatePool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_maxTokenId",
                type: "uint256"
            }
        ],
        name: "updatePoolAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "veToken",
        outputs: [
            {
                internalType: "contract VeToken",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "wnftFactory",
        outputs: [
            {
                internalType: "contract IWrappedNFTFactory",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
