"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMasterChefBatch = void 0;
exports.NFTMasterChefBatch = [
    {
        inputs: [
            {
                internalType: "contract IERC721[]",
                name: "_nfts",
                type: "address[]"
            },
            {
                internalType: "uint256[]",
                name: "_maxTokenIds",
                type: "uint256[]"
            }
        ],
        name: "addMaxTokenIds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721[]",
                name: "_nfts",
                type: "address[]"
            },
            {
                internalType: "uint256[]",
                name: "_minTokenIds",
                type: "uint256[]"
            }
        ],
        name: "addMinTokenIds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract INFTMasterChef",
                name: "_nftMasterChef",
                type: "address"
            },
            {
                internalType: "contract ITokenPriceUtil",
                name: "_tokenPriceUtil",
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
                internalType: "contract IERC721[]",
                name: "_nfts",
                type: "address[]"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "_maxTokenIds",
                type: "uint256[]"
            }
        ],
        name: "AddMaxTokenIds",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract IERC721[]",
                name: "_nfts",
                type: "address[]"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "_minTokenIds",
                type: "uint256[]"
            }
        ],
        name: "AddMinTokenIds",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            },
            {
                internalType: "uint256[][]",
                name: "_poolTokenIds",
                type: "uint256[][]"
            }
        ],
        name: "depositAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_forUser",
                type: "address"
            }
        ],
        name: "harvestAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_forUser",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            },
            {
                internalType: "uint256[][]",
                name: "_poolWNFTTokenIds",
                type: "uint256[][]"
            }
        ],
        name: "harvestAllByWNFTTokenIds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
            {
                internalType: "address",
                name: "",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes"
            }
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract ITokenPriceUtil",
                name: "_tokenPriceUtil",
                type: "address"
            }
        ],
        name: "setTokenPriceUtil",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract ITokenPriceUtil",
                name: "_tokenPriceUtil",
                type: "address"
            }
        ],
        name: "SetTokenPriceUtil",
        type: "event"
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
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            },
            {
                internalType: "uint256[][]",
                name: "_poolWNFTTokenIds",
                type: "uint256[][]"
            }
        ],
        name: "withdrawAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_fromPid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_toPid",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withOwnedNFTTokenIds",
                type: "bool"
            }
        ],
        name: "getAllPoolInfos",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "pid",
                        type: "uint256"
                    },
                    {
                        components: [
                            {
                                internalType: "contract IWrappedNFT",
                                name: "wnft",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "startBlock",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardIndex",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardEndBlock",
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
                                internalType: "contract IERC20",
                                name: "dividendToken",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "accDividendPerShare",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "depositFee",
                                type: "uint256"
                            }
                        ],
                        internalType: "struct INFTMasterChef.PoolInfo",
                        name: "poolInfo",
                        type: "tuple"
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
                        internalType: "struct INFTMasterChef.RewardInfo",
                        name: "currentReward",
                        type: "tuple"
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "mining",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "dividend",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "nftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "wnftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "bool",
                                name: "isNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "bool",
                                name: "isWNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedNFTTokenIds",
                                type: "uint256[]"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedWNFTTokenIds",
                                type: "uint256[]"
                            }
                        ],
                        internalType: "struct NFTMasterChefBatch.UserInfo",
                        name: "userInfo",
                        type: "tuple"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardIndex",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "contract IERC721Metadata",
                        name: "nft",
                        type: "address"
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
                        internalType: "struct INFTMasterChef.RewardInfo[]",
                        name: "rewards",
                        type: "tuple[]"
                    },
                    {
                        internalType: "uint256",
                        name: "tokenPrice",
                        type: "uint256"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                name: "_wrappedPoolInfos",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "getMinAndMaxTokenId",
        outputs: [
            {
                internalType: "uint256",
                name: "_minTokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_maxTokenId",
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
        name: "getPoolDepositedNFTs",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256"
                    },
                    {
                        internalType: "address",
                        name: "owner",
                        type: "address"
                    },
                    {
                        internalType: "bool",
                        name: "deposited",
                        type: "bool"
                    },
                    {
                        internalType: "uint256",
                        name: "mining",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "dividend",
                        type: "uint256"
                    },
                    {
                        internalType: "bool",
                        name: "withdrawedInWNFT",
                        type: "bool"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.NFTDepositInfo[]",
                name: "_nftInfos",
                type: "tuple[]"
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
                name: "_user",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withOwnedNFTTokenIds",
                type: "bool"
            }
        ],
        name: "getPoolInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "pid",
                        type: "uint256"
                    },
                    {
                        components: [
                            {
                                internalType: "contract IWrappedNFT",
                                name: "wnft",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "startBlock",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardIndex",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardEndBlock",
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
                                internalType: "contract IERC20",
                                name: "dividendToken",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "accDividendPerShare",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "depositFee",
                                type: "uint256"
                            }
                        ],
                        internalType: "struct INFTMasterChef.PoolInfo",
                        name: "poolInfo",
                        type: "tuple"
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
                        internalType: "struct INFTMasterChef.RewardInfo",
                        name: "currentReward",
                        type: "tuple"
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "mining",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "dividend",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "nftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "wnftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "bool",
                                name: "isNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "bool",
                                name: "isWNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedNFTTokenIds",
                                type: "uint256[]"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedWNFTTokenIds",
                                type: "uint256[]"
                            }
                        ],
                        internalType: "struct NFTMasterChefBatch.UserInfo",
                        name: "userInfo",
                        type: "tuple"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardIndex",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "contract IERC721Metadata",
                        name: "nft",
                        type: "address"
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
                        internalType: "struct INFTMasterChef.RewardInfo[]",
                        name: "rewards",
                        type: "tuple[]"
                    },
                    {
                        internalType: "uint256",
                        name: "tokenPrice",
                        type: "uint256"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.WrappedPoolInfo",
                name: "_wrappedPoolInfo",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Metadata[]",
                name: "_poolNFTorWNFTs",
                type: "address[]"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withOwnedNFTTokenIds",
                type: "bool"
            }
        ],
        name: "getPoolInfosByNFTorWNFTs",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "pid",
                        type: "uint256"
                    },
                    {
                        components: [
                            {
                                internalType: "contract IWrappedNFT",
                                name: "wnft",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "startBlock",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardIndex",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardEndBlock",
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
                                internalType: "contract IERC20",
                                name: "dividendToken",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "accDividendPerShare",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "depositFee",
                                type: "uint256"
                            }
                        ],
                        internalType: "struct INFTMasterChef.PoolInfo",
                        name: "poolInfo",
                        type: "tuple"
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
                        internalType: "struct INFTMasterChef.RewardInfo",
                        name: "currentReward",
                        type: "tuple"
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "mining",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "dividend",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "nftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "wnftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "bool",
                                name: "isNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "bool",
                                name: "isWNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedNFTTokenIds",
                                type: "uint256[]"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedWNFTTokenIds",
                                type: "uint256[]"
                            }
                        ],
                        internalType: "struct NFTMasterChefBatch.UserInfo",
                        name: "userInfo",
                        type: "tuple"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardIndex",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "contract IERC721Metadata",
                        name: "nft",
                        type: "address"
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
                        internalType: "struct INFTMasterChef.RewardInfo[]",
                        name: "rewards",
                        type: "tuple[]"
                    },
                    {
                        internalType: "uint256",
                        name: "tokenPrice",
                        type: "uint256"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                name: "_wrappedPoolInfos",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withOwnedNFTTokenIds",
                type: "bool"
            }
        ],
        name: "getPoolInfosByPids",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "pid",
                        type: "uint256"
                    },
                    {
                        components: [
                            {
                                internalType: "contract IWrappedNFT",
                                name: "wnft",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "startBlock",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardIndex",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "currentRewardEndBlock",
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
                                internalType: "contract IERC20",
                                name: "dividendToken",
                                type: "address"
                            },
                            {
                                internalType: "uint256",
                                name: "accDividendPerShare",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "depositFee",
                                type: "uint256"
                            }
                        ],
                        internalType: "struct INFTMasterChef.PoolInfo",
                        name: "poolInfo",
                        type: "tuple"
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
                        internalType: "struct INFTMasterChef.RewardInfo",
                        name: "currentReward",
                        type: "tuple"
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "mining",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "dividend",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "nftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "wnftQuantity",
                                type: "uint256"
                            },
                            {
                                internalType: "bool",
                                name: "isNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "bool",
                                name: "isWNFTApproved",
                                type: "bool"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedNFTTokenIds",
                                type: "uint256[]"
                            },
                            {
                                internalType: "uint256[]",
                                name: "ownedWNFTTokenIds",
                                type: "uint256[]"
                            }
                        ],
                        internalType: "struct NFTMasterChefBatch.UserInfo",
                        name: "userInfo",
                        type: "tuple"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardIndex",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "contract IERC721Metadata",
                        name: "nft",
                        type: "address"
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
                        internalType: "struct INFTMasterChef.RewardInfo[]",
                        name: "rewards",
                        type: "tuple[]"
                    },
                    {
                        internalType: "uint256",
                        name: "tokenPrice",
                        type: "uint256"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                name: "_wrappedPoolInfos",
                type: "tuple[]"
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
        name: "getPoolRewards",
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
                internalType: "struct INFTMasterChef.RewardInfo[]",
                name: "_rewards",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            }
        ],
        name: "getPoolsDepositedNFTs",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256"
                    },
                    {
                        internalType: "address",
                        name: "owner",
                        type: "address"
                    },
                    {
                        internalType: "bool",
                        name: "deposited",
                        type: "bool"
                    },
                    {
                        internalType: "uint256",
                        name: "mining",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "dividend",
                        type: "uint256"
                    },
                    {
                        internalType: "bool",
                        name: "withdrawedInWNFT",
                        type: "bool"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.NFTDepositInfo[][]",
                name: "_nftInfos",
                type: "tuple[][]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            }
        ],
        name: "getPoolsRewards",
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
                internalType: "struct INFTMasterChef.RewardInfo[][]",
                name: "_rewards",
                type: "tuple[][]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "getTokenPrice",
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
                internalType: "address",
                name: "_user",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_withOwnedNFTTokenIds",
                type: "bool"
            }
        ],
        name: "getUserInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "mining",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "dividend",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "nftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "wnftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "bool",
                        name: "isNFTApproved",
                        type: "bool"
                    },
                    {
                        internalType: "bool",
                        name: "isWNFTApproved",
                        type: "bool"
                    },
                    {
                        internalType: "uint256[]",
                        name: "ownedNFTTokenIds",
                        type: "uint256[]"
                    },
                    {
                        internalType: "uint256[]",
                        name: "ownedWNFTTokenIds",
                        type: "uint256[]"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.UserInfo",
                name: "_userInfo",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "",
                type: "address"
            }
        ],
        name: "maxTokenIds",
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
                internalType: "contract IERC721",
                name: "",
                type: "address"
            }
        ],
        name: "minTokenIds",
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
        inputs: [],
        name: "nftMasterChef",
        outputs: [
            {
                internalType: "contract INFTMasterChef",
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
                internalType: "contract IERC721Metadata",
                name: "_poolNFTorWNFT",
                type: "address"
            }
        ],
        name: "nftPoolExists",
        outputs: [
            {
                internalType: "bool",
                name: "_poolExists",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Metadata",
                name: "_poolNFTorWNFT",
                type: "address"
            }
        ],
        name: "nftPoolId",
        outputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721[]",
                name: "_nfts",
                type: "address[]"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "ownedNFTsTokenIdsByNFTs",
        outputs: [
            {
                internalType: "uint256[][]",
                name: "_ownedTokenIds",
                type: "uint256[][]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "ownedNFTsTokenIdsByPids",
        outputs: [
            {
                internalType: "uint256[][]",
                name: "_ownedTokenIds",
                type: "uint256[][]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "ownedNFTTokenIds",
        outputs: [
            {
                internalType: "uint256[]",
                name: "_ownedTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Enumerable",
                name: "_nftEnumerable",
                type: "address"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "ownedNFTTokenIdsEnumerable",
        outputs: [
            {
                internalType: "uint256[]",
                name: "_ownedTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "ownedNFTTokenIdsNotEnumerable",
        outputs: [
            {
                internalType: "uint256[]",
                name: "_ownedTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256"
            }
        ],
        name: "ownedNFTTokenIdsNotEnumerable2",
        outputs: [
            {
                internalType: "uint256[]",
                name: "_ownedTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "ownedWNFTsTokenIdsByPids",
        outputs: [
            {
                internalType: "uint256[][]",
                name: "_ownedTokenIds",
                type: "uint256[][]"
            }
        ],
        stateMutability: "view",
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
                internalType: "address",
                name: "_forUser",
                type: "address"
            }
        ],
        name: "pendingAll",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "mining",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "dividend",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "nftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "wnftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "bool",
                        name: "isNFTApproved",
                        type: "bool"
                    },
                    {
                        internalType: "bool",
                        name: "isWNFTApproved",
                        type: "bool"
                    },
                    {
                        internalType: "uint256[]",
                        name: "ownedNFTTokenIds",
                        type: "uint256[]"
                    },
                    {
                        internalType: "uint256[]",
                        name: "ownedWNFTTokenIds",
                        type: "uint256[]"
                    }
                ],
                internalType: "struct NFTMasterChefBatch.UserInfo",
                name: "_userInfo",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_pids",
                type: "uint256[]"
            },
            {
                internalType: "uint256[][]",
                name: "_poolWNFTTokenIds",
                type: "uint256[][]"
            }
        ],
        name: "pendingAllByWNFTTokenIds",
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
                internalType: "contract IERC721Metadata",
                name: "_poolNFTorWNFT",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "_poolWNFTTokenIds",
                type: "uint256[]"
            }
        ],
        name: "pendingByNFTorWNFT",
        outputs: [
            {
                internalType: "bool",
                name: "_poolExists",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
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
        name: "poolPending",
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
            },
            {
                internalType: "contract IWrappedNFT",
                name: "_wnft",
                type: "address"
            },
            {
                internalType: "contract IERC721Metadata",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "_wnftTokenIds",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportERC721",
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
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportERC721Enumerable",
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
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportERC721Metadata",
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
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportIWrappedNFT",
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
                internalType: "contract IERC721",
                name: "_nft",
                type: "address"
            }
        ],
        name: "supportIWrappedNFTEnumerable",
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
        inputs: [],
        name: "tokenPriceUtil",
        outputs: [
            {
                internalType: "contract ITokenPriceUtil",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
