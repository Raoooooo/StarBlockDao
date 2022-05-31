"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMasterChef = void 0;
exports.NFTMasterChef = [
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
                name: "addDividend",
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
                name: "nft",
                type: "address"
            },
            {
                indexed: false,
                internalType: "contract IWrappedNFT",
                name: "wnft",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startBlock",
                type: "uint256"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "rewardBlock",
                        type: "uint256"
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
                    }
                ],
                indexed: false,
                internalType: "struct INFTMasterChef.RewardInfo[]",
                name: "rewards",
                type: "tuple[]"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "depositFee",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "contract IERC20",
                name: "dividendToken",
                type: "address"
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
                name: "wnftTokenIds",
                type: "uint256[]"
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
                indexed: false,
                internalType: "contract IHarvestStrategy",
                name: "harvestStrategy",
                type: "address"
            }
        ],
        name: "SetHarvestStrategy",
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
                name: "startBlock",
                type: "uint256"
            }
        ],
        name: "SetStartBlock",
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
                indexed: false,
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardIndex",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardBlock",
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
            }
        ],
        name: "UpdatePoolReward",
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
        name: "WithdrawWithoutHarvest",
        type: "event"
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
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        name: "getPoolCurrentReward",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "rewardBlock",
                        type: "uint256"
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
                    }
                ],
                internalType: "struct INFTMasterChef.RewardInfo",
                name: "_rewardInfo",
                type: "tuple"
            },
            {
                internalType: "uint256",
                name: "_currentRewardIndex",
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
            }
        ],
        name: "getPoolEndBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "_poolEndBlock",
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
                internalType: "address",
                name: "_forUser",
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
                name: "_mining",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_dividend",
                type: "uint256"
            }
        ],
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
        name: "isPoolEnd",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
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
                name: "_mining",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_dividend",
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
            }
        ],
        name: "poolInfos",
        outputs: [
            {
                internalType: "contract IWrappedNFT",
                name: "_wnft",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_startBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_currentRewardIndex",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_currentRewardEndBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_lastRewardBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_accTokenPerShare",
                type: "uint256"
            },
            {
                internalType: "contract IERC20",
                name: "_dividendToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_accDividendPerShare",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_depositFee",
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
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_nftTokenId",
                type: "uint256"
            }
        ],
        name: "poolNFTInfos",
        outputs: [
            {
                internalType: "bool",
                name: "_deposited",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "_rewardDebt",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_dividendDebt",
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
            }
        ],
        name: "poolRewardLength",
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
                name: "_rewardInfoId",
                type: "uint256"
            }
        ],
        name: "poolsRewardInfos",
        outputs: [
            {
                internalType: "uint256",
                name: "_rewardBlock",
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
        name: "withdrawWithoutHarvest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];
